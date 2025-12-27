import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items || [];
    const t = searchText.toLowerCase();
    return items.filter(i =>
      (typeof i === 'string'
        ? i
        : i?.label ?? i?.name ?? i?.id ?? ''
      ).toString().toLowerCase().includes(t)
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

  /* ================= PRIMARY ================= */
  dropdownItemsPrimary: string[] = [];
  selectedPrimaryTable: string[] = [];
  primaryTableData: any[] = [];
  primaryDatabaseName = '';
  primaryTableSearch = '';

  /* ================= CLIENT ================= */
  dropdownItemsClient: string[] = [];
  selectedClientTable: string[] = [];
  clientTableDataMap: Record<string, any[]> = {};
  clientDatabaseName = '';
  clientTableSearch = '';

  /* ================= MAPPING ================= */
  mappingDataByTable: Record<string, any[]> = {};

  /* ================= ACTIVE TABS ================= */
  private _activePrimaryTable: string | null = null;
  private _activeClientTable: string | null = null;

  get activePrimaryTable() { return this._activePrimaryTable; }
  set activePrimaryTable(v: string | null) {
    this._activePrimaryTable = v;
    this.saveTablesComponentState();
  }

  get activeClientTable() { return this._activeClientTable; }
  set activeClientTable(v: string | null) {
    this._activeClientTable = v;
    if (v) this.ensureClientColumnsLoaded(v);
    this.saveTablesComponentState();
  }

  /* ================= UI ================= */
  isPrimaryDropdownOpen = false;
  isClientDropdownOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) {}

  /* ================= STATE ================= */

  private saveTablesComponentState() {
    sessionStorage.setItem('tablesComponentState', JSON.stringify({
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      activePrimaryTable: this._activePrimaryTable,
      activeClientTable: this._activeClientTable
    }));
  }

  private loadTablesComponentState(): any {
    const raw = sessionStorage.getItem('tablesComponentState');
    return raw ? JSON.parse(raw) : null;
  }

  private saveMappingState() {
    sessionStorage.setItem('mappingState', JSON.stringify({
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName
    }));
  }

  /* ================= INIT ================= */

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const compState = this.loadTablesComponentState();
    const stored = JSON.parse(sessionStorage.getItem('mappingState') || 'null');

    this.primaryDatabaseName =
      compState?.primaryDatabaseName || stored?.primaryDatabaseName || params['primary'] || '';
    this.clientDatabaseName =
      compState?.clientDatabaseName || stored?.clientDatabaseName || params['client'] || '';

    this.selectedPrimaryTable =
      compState?.selectedPrimaryTable || stored?.selectedPrimaryTable || [];
    this.selectedClientTable =
      compState?.selectedClientTable || stored?.selectedClientTable || [];

    this.mappingDataByTable = stored?.mappingDataByTable || {};

    this._activePrimaryTable =
      compState?.activePrimaryTable || this.selectedPrimaryTable[0] || null;
    this._activeClientTable =
      compState?.activeClientTable || this.selectedClientTable[0] || null;

    if (this.primaryDatabaseName) this.getPrimaryTables();
    if (this.clientDatabaseName) this.getClientTables();

    this.selectedClientTable.forEach(t => this.ensureClientColumnsLoaded(t));
    this.reconstructPrimaryTableData();
  }

  /* ================= PRIMARY ================= */

  getPrimaryTables() {
    this.appService.getServerTables().subscribe(res => {
      this.dropdownItemsPrimary = res || [];
    });
  }

  onSelectPrimaryTable(table: string) {
    if (!this.selectedPrimaryTable.includes(table)) {
      this.selectedPrimaryTable.push(table);
      this.appService.getServerColumns(table).subscribe(cols => {
        this.primaryTableData.push(
          ...(cols || []).map(c => ({
            id: c,
            source: table,
            position: '',
            mappedTable: null
          }))
        );
      });
    }
    this.activePrimaryTable = table;
  }

  getRowsForTable(table: string | null) {
    return table ? this.primaryTableData.filter(r => r.source === table) : [];
  }

  removePrimaryTable(table: string) {
    this.selectedPrimaryTable = this.selectedPrimaryTable.filter(t => t !== table);
    this.primaryTableData = this.primaryTableData.filter(r => r.source !== table);
    delete this.mappingDataByTable[table];

    if (this.activePrimaryTable === table) {
      this.activePrimaryTable = this.selectedPrimaryTable[0] ?? null;
    }
    this.saveMappingState();
  }

  /* ================= CLIENT ================= */

  getClientTables() {
    this.appService.getClientTables().subscribe(res => {
      this.dropdownItemsClient = res || [];
    });
  }

  ensureClientColumnsLoaded(tableName: string) {
    if (this.clientTableDataMap[tableName]) return;

    this.appService.getClientColumns(tableName).subscribe(res => {
      this.clientTableDataMap[tableName] = (res || []).map((r: any) => ({
        id: typeof r === 'string' ? r : r?.id ?? r?.name,
        name: typeof r === 'string' ? r : r?.name ?? r?.id,
        tableName
      }));
    });
  }

  getClientRowsForTable(table: string | null) {
    return table ? this.clientTableDataMap[table] || [] : [];
  }

  onSelectClientTable(table: string) {
    if (this.selectedClientTable.includes(table)) {
      this.removeClientTable(table);
      return;
    }
    this.selectedClientTable.push(table);
    this.activeClientTable = table;
  }

  removeClientTable(table: string) {
    this.selectedClientTable = this.selectedClientTable.filter(t => t !== table);
    delete this.clientTableDataMap[table];

    if (this.activeClientTable === table) {
      this.activeClientTable = this.selectedClientTable[0] ?? null;
    }
    this.saveMappingState();
  }

  /* ================= REBUILD (RESTORE INPUTS) ================= */

  reconstructPrimaryTableData() {
    this.primaryTableData = [];

    this.selectedPrimaryTable.forEach(table => {
      const mapped = this.mappingDataByTable[table] || [];

      this.appService.getServerColumns(table).subscribe(cols => {
        const rows = (cols || []).map(c => {
          const existingMap = mapped.find((m: any) => m.serverColumn === c);
          return {
            id: c,
            source: table,
            position: existingMap ? existingMap.clientId : '',
            mappedTable: existingMap ? existingMap.clientTableName : null
          };
        });
        this.primaryTableData.push(...rows);
      });
    });
  }

  /* ================= MAPPING ================= */

  onMappingChange(row: any) {
    if (this.activeClientTable) row.mappedTable = this.activeClientTable;
  }

  onOkClick() {
    this.mappingDataByTable = {};

    this.selectedPrimaryTable.forEach(serverTable => {
      this.mappingDataByTable[serverTable] = [];

      const rows = this.primaryTableData.filter(r => r.source === serverTable);

      rows.forEach(r => {
        const rawPos = r.position ? String(r.position).trim() : '';
        if (!rawPos) return;

        const clientTable = r.mappedTable || this.activeClientTable;
        if (!clientTable) return;

        const clientRows = this.getClientRowsForTable(clientTable);
        if (!clientRows || clientRows.length === 0) return;

        const inputParts = rawPos.split(',').map(s => s.trim());
        const matchedIds: string[] = [];
        const matchedNames: string[] = [];

        inputParts.forEach(part => {
          const foundById = clientRows.find(c => String(c.id) === part);
          
          if (foundById) {
            matchedIds.push(foundById.id);
            matchedNames.push(foundById.name);
          } else {
            const idx = Number(part);
            if (!isNaN(idx) && idx > 0 && clientRows[idx - 1]) {
              matchedIds.push(clientRows[idx - 1].id);
              matchedNames.push(clientRows[idx - 1].name);
            }
          }
        });

        if (matchedIds.length > 0) {
          this.mappingDataByTable[serverTable].push({
            serverColumn: r.id,
            clientTableName: clientTable,
            // ✅ FIX: Send ARRAY instead of joined string to match backend expectation
            clientColumns: matchedIds, 
            clientId: rawPos,
            clientName: matchedNames.join(', ')
          });
        }
      });
    });

    this.saveMappingState();

    const allClientColumns = Object.values(this.clientTableDataMap).flat();

    this.router.navigate(['/mapping-table'], { 
      state: { 
        mappingDataByTable: this.mappingDataByTable,
        selectedPrimaryTable: this.selectedPrimaryTable,
        selectedClientTable: this.selectedClientTable,
        primaryDatabaseName: this.primaryDatabaseName,
        clientDatabaseName: this.clientDatabaseName,
        clientSideColumns: allClientColumns
      }
    });
  }

  /* ================= UI HELPERS ================= */

  closePrimaryDropdown(event: Event) {
    event.stopPropagation();
    document.querySelector('details.dropdown')?.removeAttribute('open');
    this.isPrimaryDropdownOpen = false;
  }

  closeClientDropdown(event: Event) {
    event.stopPropagation();
    document.querySelectorAll('details.dropdown')[1]?.removeAttribute('open');
    this.isClientDropdownOpen = false;
  }

  goToDatabase() {
    sessionStorage.removeItem('tablesComponentState');
    sessionStorage.removeItem('mappingState');
    this.router.navigate(['/database']);
  }
}