import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { AutoMapperUtil } from "../../utils/automapper.utils";
import { Subject, takeUntil } from 'rxjs';


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

    private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}


  // ✅ Track ONLY the user-selected parent table
  explicitParentTable: string | null = null;

  /* ================= PRIMARY ================= */
  dropdownItemsPrimary: string[] = [];
  selectedPrimaryTable: string[] = [];
  primaryTableData: any[] = [];
  primaryDatabaseName = '';
  primaryTableSearch = '';
  includeChildTables = false;


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
   // private cdr: ChangeDetectorRef   // ✅ ADD

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
  this.enforceUniqueClientMapping(
    row.source,
    match,
    row
  );

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
    if (!this.selectedPrimaryTable.includes(childTable)) {
      this.selectedPrimaryTable.push(childTable);
      this.loadPrimaryTableColumns(childTable);
    }
  } else {
    this.selectedPrimaryTable =
      this.selectedPrimaryTable.filter(t => t !== childTable);

    this.primaryTableData =
      this.primaryTableData.filter(r => r.source !== childTable);

    delete this.mappingDataByTable[childTable];

    if (this.activePrimaryTable === childTable) {
      this.activePrimaryTable = this.explicitParentTable;
    }
  }
}


fetchChildTables(parentTable: string) {
  if (!this.includeChildTables) return;
  if (!this.isOracleClient()) return;
  if (this.childTablesByParent[parentTable]) return;

  this.appService.getChildTables(parentTable).subscribe(rows => {
    this.childTablesByParent[parentTable] = rows || [];

    const children = [...new Set(rows.map(r => r.child_table))];
    children.forEach(ct => {
      if (!this.selectedPrimaryTable.includes(ct)) {
        this.selectedPrimaryTable.push(ct);
        this.loadPrimaryTableColumns(ct);
      }
    });

    this.reconstructPrimaryTableData();
    this.applyAutoMapping();
  });
}

private loadPrimaryTableColumns(table: string) {
  // 🔒 Prevent duplicate loading
  if (this.primaryTableData.some(r => r.source === table)) return;

  const activeClientRows =
    this.selectedClientTable.length > 0
      ? this.getClientRowsForTable(this.selectedClientTable[0])
      : [];

  this.appService.getServerColumns(table).subscribe(cols => {
    const rows = (cols || []).map(c => {
      let position = '';
      const dbType = this.getClientDbType();

      // ✅ ID handling
      if (AutoMapperUtil.normalize(c) === 'id') {
        if (dbType === 'mongo') {
          position = '2';           // Mongo _id
        } else if (dbType === 'oracle') {
          position = '';            // Oracle skips id
        } else {
          position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
        }
      } else {
        position = AutoMapperUtil.getAutoMapPosition(c, activeClientRows);
      }

      return {
        id: c,
        source: table,
        position,
        mappedTable: null
      };
    });

    // ✅ Single place where rows are added
    this.primaryTableData.push(...rows);

    // ✅ Auto-map remaining empty columns
    this.applyAutoMapping();

    // ✅ Auto-select matching client table
    this.autoSelectClientTableIfExists(table);
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

     // 👇 SUBSCRIBE TO PROFILE TOGGLE
  this.appService.getIncludeChildTables()
  .pipe(takeUntil(this.destroy$))

  .subscribe(value => {
    this.includeChildTables = value;


     if (value && this.explicitParentTable && this.isOracleClient()) {
    this.fetchChildTables(this.explicitParentTable);
  }
    // 🔥 When checkbox is turned OFF
   // 🔥 Checkbox turned OFF → clean child tables
   if (!value) {
  const parent = this.explicitParentTable;

  // ✅ Keep ONLY parent table on PRIMARY side
  this.selectedPrimaryTable = parent ? [parent] : [];

  // ✅ Remove CHILD table rows from PRIMARY table data
  this.primaryTableData = this.primaryTableData.filter(
    row => row.source === parent
  );

   // ✅ REMOVE child table mappings
  Object.keys(this.mappingDataByTable).forEach(table => {
    if (table !== parent) {
      delete this.mappingDataByTable[table];
    }
  });

  // ✅ Clear child-only state
  this.childTablesByParent = {};
  this.selectedChildTables = {};
  this.autoSelectedChildTables = [];
 // this.explicitParentTable = null;

}


  });
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
// if (this.isOracleClient()) {
//   this.selectedPrimaryTable.forEach(pt => {
//     this.fetchChildTables(pt);
//   });
// }
  }

  private removeAllChildTables() {
  const parent = this.explicitParentTable;

  this.selectedPrimaryTable = parent ? [parent] : [];
  this.primaryTableData = this.primaryTableData.filter(
    row => row.source === parent
  );

  Object.keys(this.mappingDataByTable).forEach(t => {
    if (t !== parent) delete this.mappingDataByTable[t];
  });

  this.childTablesByParent = {};
  this.selectedChildTables = {};
  this.autoSelectedChildTables = [];
}


  /* ================= PRIMARY ================= */

  getPrimaryTables() {
    this.appService.getServerTables().subscribe(res => {
      this.dropdownItemsPrimary = res || [];
    });
  }

 onSelectPrimaryTable(table: string) {
  const isNewSelection = !this.selectedPrimaryTable.includes(table);

  if (isNewSelection) {
    this.selectedPrimaryTable.push(table);
    this.explicitParentTable = table;

    this.loadPrimaryTableColumns(table);

    if (this.isOracleClient() && this.includeChildTables) {
      this.fetchChildTables(table);
    }
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
  if (!row.position || !this.activeClientTable) return;

  const pos = String(row.position).trim();

  const conflict = this.primaryTableData.find(r =>
    r !== row &&
    r.source === row.source &&
    r.mappedTable === this.activeClientTable &&
    String(r.position) === pos
  );

  if (conflict) {
    alert(
      `Client column "${pos}" is already mapped to "${conflict.id}".`
    );
    row.position = '';
    row.mappedTable = null;
    return;
  }

  this.enforceUniqueClientMapping(row.source, pos, row);
  row.mappedTable = this.activeClientTable;
}



  // 🔒 Enforce: server column can be mapped only once
//   const duplicates = this.primaryTableData.filter(r =>
//     r !== row &&
//     r.source === row.source &&
//     r.id === row.id &&
//     r.position &&
//     row.position
//   );

//   if (duplicates.length > 0) {
//     // ❌ rollback the change
//     row.position = '';
//     row.mappedTable = null;

//     alert(`Column "${row.id}" is already mapped. A server column can be mapped only once.`);
//     return;
//   }

//   row.mappedTable = this.activeClientTable;
// }


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


  // 🔒 FINAL VALIDATION: no duplicate server columns per table
for (const table of this.selectedPrimaryTable) {
  const mappings = this.mappingDataByTable[table] || [];

  const seen = new Set<string>();
  for (const m of mappings) {
    const col = m.serverColumn.toLowerCase();
    if (seen.has(col)) {
      alert(
        `Invalid mapping in table "${table}". Column "${m.serverColumn}" is mapped more than once.`
      );
      return; // ❌ STOP submission
    }
    seen.add(col);
  }
}


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

private enforceUniqueClientMapping(
  serverTable: string,
  clientColumnId: string,
  currentRow: any
) {
  this.primaryTableData.forEach(r => {
    if (
      r !== currentRow &&
      r.source === serverTable &&
      r.mappedTable === currentRow.mappedTable && // ✅ IMPORTANT
      String(r.position) === String(clientColumnId)
    ) {
      r.position = '';
      r.mappedTable = null;
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
