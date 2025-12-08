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
  imports: [CommonModule, FormsModule, FilterPipe]
})
export class TablesComponent implements OnInit {

  // ✅ PRIMARY DB
  dropdownItemsPrimary: any[] = [];
  selectedPrimaryTable: string[] = [];
  primaryTableData: any[] = [];
  primaryDatabaseName: string = '';
  primaryTableSearch: string = '';
  mappingDataByTable: Record<string, any[]> = {};

  // ✅ ACTIVE TABLES
  activePrimaryTable: string | null = null;
  activeClientTable: string | null = null;

  // ✅ CLIENT DB
  dropdownItemsClient: any[] = [];
  selectedClientTable: string[] = [];
  clientTableDataMap: { [tableName: string]: any[] } = {};
  clientDatabaseName: string = '';   // ✅ DB NAME FROM INPUT
  clientTableSearch: string = '';

  // ✅ DROPDOWN STATE
  isPrimaryDropdownOpen = false;
  isClientDropdownOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const storage = this.loadStateFromStorage();

    // ✅ PRIMARY DB (query > storage)
    this.primaryDatabaseName =
      params['primary'] || storage.primaryDatabaseName || '';

    // ✅ ✅ ✅ CLIENT DB FROM INPUT (query > storage)
    this.clientDatabaseName =
      params['client'] || storage.clientDatabaseName || '';

    // ✅ Restore tables
    this.selectedPrimaryTable = storage.selectedPrimaryTable || [];
    this.selectedClientTable = storage.selectedClientTable || [];

    // ✅ Restore active tables
    this.activePrimaryTable =
      storage.activePrimaryTable || (this.selectedPrimaryTable[0] ?? null);

    this.activeClientTable =
      storage.activeClientTable || (this.selectedClientTable[0] ?? null);

    // ✅ Load table lists
    this.getPrimaryTables();
    if (this.clientDatabaseName) this.getClientTables();

    // ✅ Reload Primary Columns
    this.primaryTableData = [];
    this.selectedPrimaryTable.forEach(table => {
      this.appService.getServerColumns(table).subscribe((res: any) => {
        const tableData = Array.isArray(res)
          ? res.map(r => ({ id: r, source: table }))
          : [];
        this.primaryTableData = [...this.primaryTableData, ...tableData];
      });
    });

    // ✅ Reload Client Columns ONLY if DB is configured
    this.clientTableDataMap = {};
    if (this.clientDatabaseName) {
      this.selectedClientTable.forEach(table => {
        this.appService.getClientColumns(table).subscribe((res: any) => {
          const rows = Array.isArray(res)
            ? res.map(r => (typeof r === 'object' ? r : { id: r }))
            : [];
          this.clientTableDataMap[table] = rows;
        });
      });
    } else {
      // ✅ CLEAR CLIENT UI IF NO CLIENT DB
      this.dropdownItemsClient = [];
      this.selectedClientTable = [];
      this.clientTableDataMap = {};
      this.activeClientTable = null;
      this.clientTableSearch = '';
      this.isClientDropdownOpen = false;
    }

    this.saveStateToStorage();
  }

  // ================= STORAGE =================

  private saveStateToStorage() {
    const state = {
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      activePrimaryTable: this.activePrimaryTable,
      activeClientTable: this.activeClientTable
    };
    sessionStorage.setItem('tablesComponentState', JSON.stringify(state));
  }

  private loadStateFromStorage() {
    const raw = sessionStorage.getItem('tablesComponentState');
    return raw ? JSON.parse(raw) : {};
  }

  // ================= NAVIGATION =================

  goToDatabase() {
    this.router.navigate(['/database']);
  }

  // ================= PRIMARY SIDE =================

  getPrimaryTables() {
  this.appService.getServerTables().subscribe((res: any) => {
    this.dropdownItemsPrimary = res || [];
  });
}


  onSelectPrimaryTable(tableName: string) {
    if (!this.selectedPrimaryTable.includes(tableName)) {
      this.selectedPrimaryTable.push(tableName);
    }

    this.activePrimaryTable = tableName;

    this.appService.getServerColumns(tableName).subscribe((res: any) => {
      const tableData = Array.isArray(res)
        ? res.map(r => ({ id: r, source: tableName }))
        : [];
      this.primaryTableData = [...this.primaryTableData, ...tableData];
    });

    this.saveStateToStorage();
  }

  getRowsForTable(tableName: string | null) {
    if (!tableName) return [];
    return this.primaryTableData.filter(r => r.source === tableName);
  }

  removePrimaryTable(table: string) {
    this.selectedPrimaryTable =
      this.selectedPrimaryTable.filter(t => t !== table);

    if (this.activePrimaryTable === table) {
      this.activePrimaryTable = this.selectedPrimaryTable[0] ?? null;
    }

    this.saveStateToStorage();
  }

  // ================= CLIENT SIDE =================

  getClientTables() {
    if (!this.clientDatabaseName) {
      this.dropdownItemsClient = [];
      return;
    }

    this.appService.getClientTables().subscribe((res: any) => {
      this.dropdownItemsClient = res || [];
    });
  }

  onSelectClientTable(tableName: string) {
    if (!this.clientDatabaseName) return;

    if (this.selectedClientTable.includes(tableName)) {
      this.selectedClientTable =
        this.selectedClientTable.filter(t => t !== tableName);
    } else {
      this.selectedClientTable.push(tableName);
      this.activeClientTable = tableName;

      if (!this.clientTableDataMap[tableName]) {
        this.appService.getClientColumns(tableName).subscribe((res: any) => {
          const rows = Array.isArray(res)
            ? res.map(r => (typeof r === 'object' ? r : { id: r }))
            : [];
          this.clientTableDataMap[tableName] = rows;
        });
      }
    }

    this.saveStateToStorage();
  }

  getClientRowsForTable(tableName: string | null): any[] {
    if (!tableName) return [];
    return this.clientTableDataMap[tableName] || [];
  }

  removeClientTable(table: string) {
    this.selectedClientTable =
      this.selectedClientTable.filter(t => t !== table);
    this.saveStateToStorage();
  }

  // ================= MAPPING =================

  onOkClick() {
    this.mappingDataByTable = {};

    this.selectedPrimaryTable.forEach(tableName => {
      this.mappingDataByTable[tableName] = [];

      const relatedPrimaryData =
        this.primaryTableData.filter(row => row.source === tableName);

      relatedPrimaryData.forEach(primaryRow => {
        const enteredClientId = (primaryRow as any).position;
        let clientMatch;

        if (enteredClientId && this.activeClientTable) {
          clientMatch = this.getClientRowsForTable(this.activeClientTable)
            .find((_, i) => i + 1 == enteredClientId);
        }

        this.mappingDataByTable[tableName].push({
          rowId: primaryRow.id,
          clientId: enteredClientId || '-',
          clientName: clientMatch
            ? (clientMatch.name || clientMatch.id || 'Unknown')
            : (enteredClientId ? 'Not Found' : 'No Mapping')
        });
      });
    });

    this.router.navigate(['/mapping-table'], {
      state: {
        mappingDataByTable: this.mappingDataByTable,
        selectedPrimaryTable: this.selectedPrimaryTable
      }
    });
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  // ================= DROPDOWNS =================

  closePrimaryDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelector('details.dropdown');
    dropdown?.removeAttribute('open');
    this.isPrimaryDropdownOpen = false;
  }

  closeClientDropdown(event: Event) {
    event.stopPropagation();
    const dropdown =
      document.querySelectorAll('details.dropdown')[1] as HTMLElement;
    dropdown?.removeAttribute('open');
    this.isClientDropdownOpen = false;
  }
}
