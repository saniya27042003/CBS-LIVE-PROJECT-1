import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { DbStateService } from '../../service/db-state.service';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item =>
      (item?.label ?? item?.name ?? item?.id ?? '')
        .toString()
        .toLowerCase()
        .includes(searchText)
    );
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

  // ✅ SEARCH
  primaryTableSearch: string = '';
  clientTableSearch: string = '';

  // ✅ DROPDOWN STATE
  isPrimaryDropdownOpen = false;
  isClientDropdownOpen = false;

  // ✅ DATABASE NAMES
  primaryDatabaseName: string = '';
  clientDatabaseName: string = '';

  // ✅ TABLE LISTS
  dropdownItemsPrimary: any[] = [];
  dropdownItemsClient: any[] = [];

  // ✅ SELECTED TABLES
  selectedPrimaryTable: string[] = [];
  selectedClientTable: string[] = [];

  // ✅ ACTIVE TABLE
  activePrimaryTable: string | null = null;
  activeClientTable: string | null = null;

  // ✅ ROW DATA
  primaryTableData: any[] = [];
  clientTableDataMap: { [tableName: string]: any[] } = {};

  // ✅ FINAL MAPPING
  mappingDataByTable: Record<string, any[]> = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private dbState: DbStateService
  ) {}

  // ================= INIT =================

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const storage = this.loadStateFromStorage();

    this.primaryDatabaseName = storage.primaryDatabaseName || params['primary'] || '';
    this.clientDatabaseName = storage.clientDatabaseName || params['client'] || '';

    this.selectedPrimaryTable = storage.selectedPrimaryTable || [];
    this.selectedClientTable = storage.selectedClientTable || [];

    this.activePrimaryTable =
      storage.activePrimaryTable || (this.selectedPrimaryTable[0] || null);

    this.activeClientTable =
      storage.activeClientTable || (this.selectedClientTable[0] || null);

    if (this.primaryDatabaseName) this.getPrimaryTables();
    if (this.clientDatabaseName) this.getClientTables();

    this.restorePrimaryColumns();
    this.restoreClientColumns();

    this.saveStateToStorage();
  }

  // ================= STORAGE =================

  private saveStateToStorage() {
    sessionStorage.setItem(
      'tablesComponentState',
      JSON.stringify({
        primaryDatabaseName: this.primaryDatabaseName,
        clientDatabaseName: this.clientDatabaseName,
        selectedPrimaryTable: this.selectedPrimaryTable,
        selectedClientTable: this.selectedClientTable,
        activePrimaryTable: this.activePrimaryTable,
        activeClientTable: this.activeClientTable
      })
    );
  }

  private loadStateFromStorage() {
    const raw = sessionStorage.getItem('tablesComponentState');
    return raw ? JSON.parse(raw) : {};
  }

  // ================= NAVIGATION =================

  goToDatabase() {
    sessionStorage.clear();
    this.router.navigate(['/database']);
  }

  // ================= PRIMARY TABLES =================

  getPrimaryTables() {
    this.appService.getServerTables().subscribe((res: any) => {
      this.dropdownItemsPrimary = res || [];
    });
  }

  onSelectPrimaryTable(tableName: string) {
    if (!this.selectedPrimaryTable.includes(tableName)) {
      this.selectedPrimaryTable.push(tableName);
      this.activePrimaryTable = tableName;

      this.appService.getServerColumns(tableName).subscribe((res: any) => {
        const tableData = res.map((r: any) => ({
          id: r,
          source: tableName
        }));
        this.primaryTableData.push(...tableData);
      });

      this.saveStateToStorage();
    }
  }

  removePrimaryTable(table: string) {
    this.selectedPrimaryTable = this.selectedPrimaryTable.filter(t => t !== table);
    this.activePrimaryTable = this.selectedPrimaryTable[0] || null;
    this.saveStateToStorage();
  }

  getRowsForTable(tableName: string | null) {
    if (!tableName) return [];
    return this.primaryTableData.filter(r => r.source === tableName);
  }

  // ================= CLIENT TABLES =================

  getClientTables() {
    this.appService.getClientTables().subscribe((res: any) => {
      this.dropdownItemsClient = res || [];
    });
  }

  onSelectClientTable(tableName: string) {
    if (!this.selectedClientTable.includes(tableName)) {
      this.selectedClientTable.push(tableName);
      this.activeClientTable = tableName;

      this.appService.getClientColumns(tableName).subscribe((res: any) => {
        this.clientTableDataMap[tableName] = res.map((r: any) =>
          typeof r === 'object' ? r : { id: r }
        );
      });

      this.saveStateToStorage();
    }
  }

  removeClientTable(table: string) {
    this.selectedClientTable = this.selectedClientTable.filter(t => t !== table);
    this.activeClientTable = this.selectedClientTable[0] || null;
    delete this.clientTableDataMap[table];
    this.saveStateToStorage();
  }

  getClientRowsForTable(tableName: string | null) {
    if (!tableName) return [];
    return this.clientTableDataMap[tableName] || [];
  }

  // ================= MAPPING =================

  onMappingChange(row: any) {
    if (this.activeClientTable) {
      row.mappedTable = this.activeClientTable;
    }
  }

  onOkClick() {
    this.mappingDataByTable = {};

    this.selectedPrimaryTable.forEach((tableName: string) => {
      this.mappingDataByTable[tableName] = [];

      const relatedPrimaryData =
        this.primaryTableData.filter(row => row.source === tableName);

      relatedPrimaryData.forEach((primaryRow: any) => {

        const enteredClientId: string = primaryRow.position;
        const targetClientTable: string =
          primaryRow.mappedTable || this.activeClientTable;

        if (!enteredClientId || !targetClientTable) return;

        const indexes: number[] = enteredClientId
          .toString()
          .split(' ')
          .map((v: string): number => parseInt(v.trim(), 10))
          .filter((v: number): boolean => !isNaN(v));

        const clientCols = indexes
          .map((i: number) => this.getClientRowsForTable(targetClientTable)[i - 1])
          .filter((c: any) => !!c);

        this.mappingDataByTable[tableName].push({
          serverColumn: primaryRow.id,
          clientColumns: clientCols.map((c: any) => c.id || c.name),
          merge: clientCols.length > 1,
          clientTableName: targetClientTable,
          clientId: enteredClientId,
          clientName: clientCols.map((c: any) => c.name || c.id).join(' ')
        });
      });
    });

    this.router.navigate(['/mapping-table'], {
      state: {
        mappingDataByTable: this.mappingDataByTable,
        selectedPrimaryTable: this.selectedPrimaryTable,
        selectedClientTable: this.selectedClientTable[0] || null
      }
    });
  }

  // ================= RESTORE =================

  private restorePrimaryColumns() {
    this.selectedPrimaryTable.forEach(table => {
      this.appService.getServerColumns(table).subscribe((res: any) => {
        const tableData = res.map((r: any) => ({
          id: r,
          source: table
        }));
        this.primaryTableData.push(...tableData);
      });
    });
  }

  private restoreClientColumns() {
    this.selectedClientTable.forEach(table => {
      this.appService.getClientColumns(table).subscribe((res: any) => {
        this.clientTableDataMap[table] = res.map((r: any) =>
          typeof r === 'object' ? r : { id: r }
        );
      });
    });
  }

  // ================= DROPDOWN =================

  closePrimaryDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelector('details.dropdown');
    dropdown?.removeAttribute('open');
  }

  closeClientDropdown(event: Event) {
    event.stopPropagation();
    const dropdown =
      document.querySelectorAll('details.dropdown')[1] as HTMLElement;
    dropdown?.removeAttribute('open');
  }
}
