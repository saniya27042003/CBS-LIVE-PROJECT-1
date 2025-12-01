import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const value =
        typeof item === 'string'
          ? item
          : item.label ?? (item.name ?? item.id ?? '');
      return value?.toString().toLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: 'app-tables',
  standalone: true,
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  imports: [CommonModule, FormsModule, FilterPipe],
})
export class TablesComponent implements OnInit {
  // ===== PRIMARY SIDE =====
  dropdownItemsPrimary: string[] = [];
  selectedPrimaryTable: string[] = [];
  primaryDatabaseName = '';
  primaryTableSearch = '';

  // table -> column "rows" (each row = one column)
  primaryTableRowsByName: Record<string, any[]> = {};
  activePrimaryTable: string | null = null;

  // mapping per primary table
  mappingDataByTable: Record<string, any[]> = {};

  // ===== CLIENT SIDE =====
  dropdownItemsClient: string[] = [];
  selectedClientTable: string[] = [];
  clientDatabaseName = '';
  clientTableSearch = '';
  actualClientDbName = '';

  clientTableRowsByName: Record<string, any[]> = {};
  activeClientTable: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['primary']) this.primaryDatabaseName = params['primary'];      // "PostgreSQL"
      if (params['clientType']) this.clientDatabaseName = params['clientType']; // "Postgres"
      if (params['client']) this.actualClientDbName = params['client'];         // db name
    });
  }

  goToDatabase() {
    this.router.navigate(['/database']);
  }

  // ===== LOAD TABLE NAMES =====

  getPrimaryTables() {
    this.appService.getPrimaryTableNames().subscribe((res: string[]) => {
      this.dropdownItemsPrimary = res || [];
    });
  }

  getClientTables() {
    this.appService.getClientTableNames().subscribe((res: string[]) => {
      this.dropdownItemsClient = res || [];
    });
  }

  // ===== PRIMARY: LOAD COLUMNS & TOGGLE =====

  onSelectPrimaryTable(tableName: string) {
    if (!this.selectedPrimaryTable.includes(tableName)) {
      this.selectedPrimaryTable.push(tableName);
    }

    // make selected table active
    this.activePrimaryTable = tableName;

    this.appService.getAllColumnsNames(tableName).subscribe((res: any) => {
      const rows = Array.isArray(res)
        ? res.map((col: any, idx: number) => ({
          // keep id as numeric position if you want, but name holds the column
          id: idx + 1,
          name: typeof col === 'string' ? col : col?.column_name,
          source: tableName,
          position: '',
        }))
        : [];

      this.primaryTableRowsByName[tableName] = rows;
    });

  }

  setActivePrimaryTable(tableName: string) {
    this.activePrimaryTable = tableName;
  }

  get activePrimaryRows(): any[] {
    return this.activePrimaryTable
      ? this.primaryTableRowsByName[this.activePrimaryTable] || []
      : [];
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  // ===== CLIENT: LOAD COLUMNS & TOGGLE =====

  onSelectClientTable(tableName: string) {
    if (!this.selectedClientTable.includes(tableName)) {
      this.selectedClientTable.push(tableName);
    }

    // make selected client table active
    this.activeClientTable = tableName;

    this.appService.getClientColumns(tableName).subscribe((res: any) => {
      const rows = Array.isArray(res)
        ? res.map((colName: any, idx: number) => ({
          id: idx + 1,
          name: typeof colName === 'string' ? colName : colName?.column_name,
        }))
        : [];

      this.clientTableRowsByName[tableName] = rows;
    });
  }

  setActiveClientTable(tableName: string) {
    this.activeClientTable = tableName;
  }

  get activeClientRows(): any[] {
    return this.activeClientTable
      ? this.clientTableRowsByName[this.activeClientTable] || []
      : [];
  }

  // ===== MAPPING (same idea as old) =====

  onOkClick() {
    this.mappingDataByTable = {};

    this.selectedPrimaryTable.forEach(tableName => {
      const primaryRows = this.primaryTableRowsByName[tableName] || [];
      const mappings: any[] = [];

      primaryRows.forEach(primaryRow => {
        const enteredClientIndex = primaryRow.position;
        let clientMatch: any = null;

        if (enteredClientIndex && this.activeClientTable) {
          const clientRows =
            this.clientTableRowsByName[this.activeClientTable] || [];
          clientMatch = clientRows.find((_, i) => i + 1 == enteredClientIndex);
        }

        mappings.push({
          serverColumn: primaryRow.name,
          clientColumn: clientMatch ? clientMatch.name || clientMatch.id : '-',
          clientDisplayName: clientMatch
            ? clientMatch.name || clientMatch.id || 'Unknown'
            : enteredClientIndex
              ? 'Not Found'
              : 'No Mapping',
        });
      });

      this.mappingDataByTable[tableName] = mappings;
    });
  }

  // ===== UI HELPERS =====

  removePrimaryTable(table: string) {
    this.selectedPrimaryTable =
      this.selectedPrimaryTable.filter(t => t !== table);
    if (this.activePrimaryTable === table) {
      this.activePrimaryTable = this.selectedPrimaryTable[0] || null;
    }
  }

  removeClientTable(table: string) {
    this.selectedClientTable =
      this.selectedClientTable.filter(t => t !== table);
    if (this.activeClientTable === table) {
      this.activeClientTable = this.selectedClientTable[0] || null;
    }
  }

  isPrimaryDropdownOpen = false;

  closePrimaryDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelector('details.dropdown');
    dropdown?.removeAttribute('open');
    this.isPrimaryDropdownOpen = false;
  }

  isClientDropdownOpen = false;

  closeClientDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelectorAll(
      'details.dropdown',
    )[1] as HTMLElement;
    dropdown?.removeAttribute('open');
    this.isClientDropdownOpen = false;
  }
}
