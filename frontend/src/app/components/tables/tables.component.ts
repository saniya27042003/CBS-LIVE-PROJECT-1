import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { AutoMapperUtil } from "../../utils/automapper.utils";
import { ChangeDetectorRef } from '@angular/core';

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
    private appService: AppService,
    private cdr: ChangeDetectorRef   // ✅ ADD

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


  clientDatabaseType: 'oracle' | 'sql' | 'mongo' | '' = '';


 // In tables.component.ts

applyAutoMapping() {


  const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;
    const isAdmin = user?.role === 'admin';
    const isAutoMapEnabled = localStorage.getItem('adminAutoMapEnabled') === 'true';

    if (!isAdmin || !isAutoMapEnabled) return;
    if (this.selectedClientTable.length === 0) return;


  // 1. If no client tables are selected, exit
  if (this.selectedClientTable.length === 0) return;

  // 2. Loop through every row in the Primary Table list
  this.primaryTableData.forEach(row => {

    // Skip if already mapped manually
    if (row.position && row.position !== '') return;

    // --- STRICT RULE: TABLE NAMES MUST MATCH ---
    // Find a selected client table that matches the current row's server table name
    // row.source = The Server Table Name (e.g., 'citymaster')
    const matchingClientTable = this.selectedClientTable.find(
      ct => ct.toLowerCase() === row.source.toLowerCase()
    );

    // If NO client table has the same name, DO NOT map anything for this row.
    if (!matchingClientTable) return;

    // --- IF TABLE NAME MATCHES, CHECK COLUMNS ---
    const clientRows = this.getClientRowsForTable(matchingClientTable);

    // If columns for that table haven't loaded yet, skip for now
    if (!clientRows || clientRows.length === 0) return;

    // Try to find the matching column inside that specific table
const dbType = this.getClientDbType();
if (AutoMapperUtil.normalize(row.id) === 'id') {
  if (dbType === 'mongo') {
    row.position = '2';
    row.mappedTable = matchingClientTable;
    return; // ✅ only Mongo exits
  }

  if (dbType === 'oracle') {
    return; // ✅ Oracle skips id
  }

  // ✅ SQL databases → continue to normal mapping
}



const match = AutoMapperUtil.getAutoMapPosition(row.id, clientRows);

if (match) {
  row.position = match;
  row.mappedTable = matchingClientTable;
}

    // if (match) {
    //   row.position = match;
    //   row.mappedTable = matchingClientTable; // Explicitly link to the matching table
    // }
  });
}



//=======================================================================
// clear table
//=======================================================================
closeAllPrimaryTables() {
  this.selectedPrimaryTable = [];
  this.primaryTableData = [];
  this.childTablesByParent = {};
  this.selectedChildTables = {};
  this.autoSelectedChildTables = [];
  this.activePrimaryTable = null;

  this.saveMappingState();
  this.saveTablesComponentState();
}

closeAllClientTables() {
  this.selectedClientTable = [];
  this.clientTableDataMap = {};
  this.activeClientTable = null;

  this.saveMappingState();
  this.saveTablesComponentState();
}


// ================= CHILD TABLES (FK) =================
childTablesByParent: Record<string, any[]> = {};
autoSelectedChildTables: string[] = [];
// Track checkbox selection for child tables
selectedChildTables: Record<string, boolean> = {};


onChildTableToggle(childTable: string, checked: boolean) {
  this.selectedChildTables[childTable] = checked;

  if (checked) {
    // ➕ Add child table
    if (!this.selectedPrimaryTable.includes(childTable)) {
      this.selectedPrimaryTable.push(childTable);
      this.loadPrimaryTableColumns(childTable); // ✅ REQUIRED

    }
  } else {
    // ➖ Remove child table
    this.selectedPrimaryTable = this.selectedPrimaryTable.filter(
      t => t !== childTable
    );
  }
}
fetchChildTables(parentTable: string) {
  if (this.childTablesByParent[parentTable]) return;

  this.appService.getChildTables(parentTable).subscribe({
    next: (rows) => {
      this.childTablesByParent[parentTable] = rows || [];

      const childTableNames = [...new Set(
        rows.map(r => r.child_table)
      )];

      childTableNames.forEach(ct => {
        if (!this.selectedPrimaryTable.includes(ct)) {
          this.selectedPrimaryTable.push(ct);
          this.loadPrimaryTableColumns(ct);
          this.autoSelectClientTableIfExists(ct);
        }
      });

      this.reconstructPrimaryTableData();
      this.applyAutoMapping();
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Failed to load child tables for', parentTable, err);
    }
  });
}



private loadPrimaryTableColumns(table: string) {
  // Prevent duplicate loading
  if (this.mappingDataByTable[table]?.length) return;

  const activeClientRows =
    this.selectedClientTable.length > 0
      ? this.getClientRowsForTable(this.selectedClientTable[0])
      : [];

  this.appService.getServerColumns(table).subscribe(cols => {
    this.mappingDataByTable[table] = (cols || []).map(c => {
  let position = '';
  const dbType = this.getClientDbType();

  if (AutoMapperUtil.normalize(c) === 'id') {
    if (dbType === 'mongo') position = '2';
    else if (dbType === 'oracle') position = '';
    else position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
  } else {
    position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
  }

  return {
    id: c,
    source: table,
    position,
    mappedTable: null,
  };
});

  });
}

  private saveMappingState() {
    sessionStorage.setItem('mappingState', JSON.stringify({
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName,
      clientDatabaseType: this.clientDatabaseType,
    }));
  }


  private isOracleClient(): boolean {
  return this.clientDatabaseType === 'oracle';
}


  /* ================= INIT ================= */

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const compState = this.loadTablesComponentState();
    const stored = JSON.parse(sessionStorage.getItem('mappingState') || 'null');
    this.clientDatabaseType =
  compState?.clientDatabaseType ||
  stored?.clientDatabaseType ||
  params['clientType'] || '';
  console.log('clientType from params =', params['clientType']);
  console.log('resolved clientDatabaseType =', this.clientDatabaseType);


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

    // ✅ RESTORE CHILD TABLES
if (this.isOracleClient()) {
  this.selectedPrimaryTable.forEach(pt => {
    this.fetchChildTables(pt);
  });
}
  }

  /* ================= PRIMARY ================= */

  getPrimaryTables() {
    this.appService.getServerTables().subscribe(res => {
      this.dropdownItemsPrimary = res || [];
    });
  }

 // In tables.component.ts

onSelectPrimaryTable(table: string) {
  if (!this.selectedPrimaryTable.includes(table)) {
    this.selectedPrimaryTable.push(table);
    this.loadPrimaryTableColumns(table); // ✅ ADD THIS


    // ✅ NEW: fetch child tables automatically
if (this.isOracleClient()) {
  this.fetchChildTables(table);
}
    const activeClientRows = this.selectedClientTable.length > 0
      ? this.getClientRowsForTable(this.selectedClientTable[0])
      : [];

    this.appService.getServerColumns(table).subscribe(cols => {
      this.primaryTableData.push(
  ...(cols || []).map(c => {
    let position = '';
    const dbType = this.getClientDbType();

    if (AutoMapperUtil.normalize(c) === 'id') {
      if (dbType === 'mongo') position = '2';
      else if (dbType === 'oracle') position = '';
      else position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
    } else {
      position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
    }

    return {
      id: c,
      source: table,
      position,
      mappedTable: null
    };
  })
);

      this.applyAutoMapping();


    // ✅ AUTO-SELECT CLIENT TABLE
    this.autoSelectClientTableIfExists(table);
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

private autoSelectClientTableIfExists(serverTable: string) {
  // Find matching client table (case-insensitive)
  const matchingClientTable = this.dropdownItemsClient.find(
    ct => ct.toLowerCase() === serverTable.toLowerCase()
  );

  if (!matchingClientTable) return;

  // If already selected, just activate it
  if (!this.selectedClientTable.includes(matchingClientTable)) {
    this.selectedClientTable.push(matchingClientTable);
  }

  this.activeClientTable = matchingClientTable;

  // Ensure columns are loaded
  this.ensureClientColumnsLoaded(matchingClientTable);
}


  getClientTables() {
  this.appService.getClientTables().subscribe(res => {
    this.dropdownItemsClient = res || [];

    // ✅ Auto-select client tables for already selected primary tables
    this.selectedPrimaryTable.forEach(pt =>
      this.autoSelectClientTableIfExists(pt)
    );
  });
}


ensureClientColumnsLoaded(tableName: string) {
  if (this.clientTableDataMap[tableName]) {
      this.applyAutoMapping(); // <-- ADD THIS
      return;
  }

  this.appService.getClientColumns(tableName).subscribe(res => {
    this.clientTableDataMap[tableName] = (res || []).map((r: any) => ({
      id: typeof r === 'string' ? r : r?.id ?? r?.name,
      name: typeof r === 'string' ? r : r?.name ?? r?.id,
      tableName
    }));

    this.applyAutoMapping(); // <-- ADD THIS (Triggers map update when data arrives)
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

  // ✅ UPDATED: Fetches ALL columns first, then fills in saved values.
// In tables.component.ts

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
          // If we have a saved mapping, use it. Otherwise leave empty.
          // applyAutoMapping() will handle the empty ones in a moment.
          position: existingMap ? existingMap.clientId : '',
          mappedTable: existingMap ? existingMap.clientTableName : null
        };
      });

      this.primaryTableData.push(...rows);

      // ✅ AUTO-SELECT CLIENT TABLE IF EXISTS
this.autoSelectClientTableIfExists(table);

      this.applyAutoMapping(); // <-- ADD THIS (Triggers map update after rows are built)
    });
  });
}

  /* ================= MAPPING ================= */

  onMappingChange(row: any) {
    if (this.activeClientTable) row.mappedTable = this.activeClientTable;
  }

  /* ================= MAPPING (Updated) ================= */

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
      const matchedIdsWithParts: string[] = [];
      const matchedNames: string[] = [];

      inputParts.forEach(part => {
        // Check for dash syntax: "2-1" (Column 2, Part 1)
        const [colIdentifier, partIdx] = part.split('-');

        // Find the column by ID or by Index
        let foundCol = clientRows.find(c => String(c.id) === colIdentifier);
        if (!foundCol) {
          const idx = Number(colIdentifier);
          if (!isNaN(idx) && idx > 0 && clientRows[idx - 1]) {
            foundCol = clientRows[idx - 1];
          }
        }

        if (foundCol) {
          // Encode as "ID:PART" so backend can decode it
          // If no dash was used, we send "ID" or "ID:0"
          const suffix = partIdx ? `:${partIdx}` : '';
          matchedIdsWithParts.push(`${foundCol.id}${suffix}`);

          const nameLabel = partIdx ? `${foundCol.name}[Part ${partIdx}]` : foundCol.name;
          matchedNames.push(nameLabel);
        }
      });

      if (matchedIdsWithParts.length > 0) {
        this.mappingDataByTable[serverTable].push({
          serverColumn: r.id,
          clientTableName: clientTable,
          clientColumns: matchedIdsWithParts.join(','), // Send encoded string to backend
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
      clientSideColumns: allClientColumns,
      childTablesByParent: this.childTablesByParent   // ✅ NEW
    }
  });
}




private getClientDbType(): 'mongo' | 'oracle' | 'sql' {
  const allClientCols = Object.values(this.clientTableDataMap).flat();

  // ✅ MongoDB detection (raw column name)
  const hasMongoId = allClientCols.some(c => {
    const raw = String(c.name || c.id);
    return raw === '_id';
  });

  if (hasMongoId) return 'mongo';

  const name = (this.clientDatabaseName || '').toLowerCase();
  if (name.includes('oracle')) return 'oracle';

  return 'sql'; // mysql, mariadb, mssql, postgres
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
