import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';

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

  // PRIMARY DB
  dropdownItemsPrimary: any[] = [];
  selectedPrimaryTable: string[] = [];
  primaryTableData: any[] = [];
  primaryDatabaseName: string = '';
  primaryTableSearch: string = '';
  mappingDataByTable: Record<string, any[]> = {};

  // --- CHANGED: Use Backing Fields for Active Tables ---
  private _activePrimaryTable: string | null = null;
  private _activeClientTable: string | null = null;

  // --- GETTERS & SETTERS (The Magic Fix) ---
  // When HTML says "activePrimaryTable = table", this SETTER runs and auto-saves.
  get activePrimaryTable(): string | null {
    return this._activePrimaryTable;
  }
  set activePrimaryTable(value: string | null) {
    this._activePrimaryTable = value;
    this.saveTablesComponentState(); // <--- This saves the state instantly when clicked
  }

  get activeClientTable(): string | null {
    return this._activeClientTable;
  }
  set activeClientTable(value: string | null) {
    this._activeClientTable = value;
    // Only save/load if we have a valid table (prevents issues during clearing)
    if (value) { 
        this.ensureClientColumnsLoaded(value);
    }
    this.saveTablesComponentState(); // <--- This saves the state instantly when clicked
  }
  // ---------------------------------------------

  // CLIENT DB
  dropdownItemsClient: any[] = [];
  selectedClientTable: string[] = [];
  clientTableDataMap: { [tableName: string]: any[] } = {};
  clientDatabaseName: string = '';
  clientTableSearch: string = '';

  // DROPDOWN STATE
  isPrimaryDropdownOpen = false;
  isClientDropdownOpen = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  // ---------------- STORAGE helpers ----------------

<<<<<<< HEAD
  private saveTablesComponentState() {
    // We use the backing fields (_) to avoid recursion, though getters are safe here too.
=======
    // ✅ SECURITY CHECK: 
    // If storage is empty (meaning user logged out or fresh start), 
    // we strictly reset all table selections to prevent ghost data.
    const hasValidSession = Object.keys(storage).length > 0;

    if (hasValidSession) {
      // --- RESTORE STATE (User is logged in and returning) ---
      this.primaryDatabaseName = storage.primaryDatabaseName || params['primary'] || '';
      this.clientDatabaseName = storage.clientDatabaseName || params['client'] || '';

      this.selectedPrimaryTable = storage.selectedPrimaryTable || [];
      this.selectedClientTable = storage.selectedClientTable || [];

      // Ensure active table is valid or null
      this.activePrimaryTable = storage.activePrimaryTable || (this.selectedPrimaryTable[0] ?? null);
      this.activeClientTable = storage.activeClientTable || (this.selectedClientTable[0] ?? null);

    } else {
      // --- FRESH START / LOGGED OUT (Reset everything) ---
      // We accept the DB name from URL (if just navigated), but we WIPE table selections.
      this.primaryDatabaseName = params['primary'] || '';
      this.clientDatabaseName = params['client'] || '';

      this.selectedPrimaryTable = [];
      this.selectedClientTable = [];
      this.activePrimaryTable = null;
      this.activeClientTable = null;

      // Clear mapping data just in case
      this.mappingDataByTable = {};
      this.clientTableDataMap = {};
    }

    // ✅ 1. Load Primary Tables List (Only if DB name exists)
    if (this.primaryDatabaseName) {
      this.getPrimaryTables();
    }

    // ✅ 2. Load Client Tables List (Only if DB name exists)
    if (this.clientDatabaseName) {
      this.getClientTables();
    } else {
      // Clean up UI if no client DB
      this.dropdownItemsClient = [];
      this.selectedClientTable = [];
      this.activeClientTable = null;
    }

    // ✅ 3. Reload Columns for Pre-Selected Tables (if any exist)
    this.primaryTableData = [];
    this.selectedPrimaryTable.forEach(table => {
      this.appService.getServerColumns(table).subscribe((res: any) => {
        const tableData = Array.isArray(res)
          ? res.map(r => ({ id: r, source: table }))
          : [];
        this.primaryTableData = [...this.primaryTableData, ...tableData];
      });
    });

    // ✅ 4. Reload Client Columns (if any exist)
    if (this.clientDatabaseName) {
      this.selectedClientTable.forEach(table => {
        this.appService.getClientColumns(table).subscribe((res: any) => {
          const rows = Array.isArray(res)
            ? res.map(r => (typeof r === 'object' ? r : { id: r }))
            : [];
          this.clientTableDataMap[table] = rows;
        });
      });
    }

    // Save the sanitized state immediately
    this.saveStateToStorage();
  }

  // ================= STORAGE =================

  private saveStateToStorage() {
>>>>>>> 5da471a9075635f89b12045bfc4057aaea0a377d
    const state = {
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      activePrimaryTable: this._activePrimaryTable, 
      activeClientTable: this._activeClientTable
    };
    sessionStorage.setItem('tablesComponentState', JSON.stringify(state));
  }

  private loadTablesComponentState(): any {
    const raw = sessionStorage.getItem('tablesComponentState');
    return raw ? JSON.parse(raw) : null;
  }

  private saveMappingState() {
    const mappingState = {
      mappingDataByTable: this.mappingDataByTable || {},
      selectedPrimaryTable: this.selectedPrimaryTable || [],
      selectedClientTable: this.selectedClientTable || [],
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || ''
    };

    if (Object.keys(this.mappingDataByTable || {}).length > 0 || 
        this.selectedPrimaryTable.length > 0 || 
        this.selectedClientTable.length > 0) {
      sessionStorage.setItem('mappingState', JSON.stringify(mappingState));
    } else {
      sessionStorage.removeItem('mappingState');
    }
  }

  // ---------------- lifecycle ----------------

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    const navState: any = (history.state && Object.keys(history.state).length > 1) ? history.state : null;
    const storedMappingRaw = sessionStorage.getItem('mappingState');
    const storedMapping = storedMappingRaw ? JSON.parse(storedMappingRaw) : null;
    const compState = this.loadTablesComponentState(); 

    const hasCompState = !!compState;

    // 1. RESTORE LISTS & DATA
    if (navState && (navState.mappingDataByTable || navState.selectedPrimaryTable || navState.selectedClientTable)) {
      // From Navigation (Back button)
      this.mappingDataByTable = navState.mappingDataByTable || {};
      this.selectedPrimaryTable = hasCompState ? (compState.selectedPrimaryTable || []) : (navState.selectedPrimaryTable || []);
      const navClient = navState.selectedClientTable ? (Array.isArray(navState.selectedClientTable) ? navState.selectedClientTable : [navState.selectedClientTable]) : [];
      this.selectedClientTable = hasCompState ? (compState.selectedClientTable || []) : navClient;
      this.primaryDatabaseName = navState.primaryDatabaseName || compState?.primaryDatabaseName || params['primary'] || '';
      this.clientDatabaseName = navState.clientDatabaseName || compState?.clientDatabaseName || params['client'] || '';

    } else if (hasCompState) {
      // From Refresh (Saved State)
      this.primaryDatabaseName = compState.primaryDatabaseName || params['primary'] || '';
      this.clientDatabaseName = compState.clientDatabaseName || params['client'] || '';
      this.selectedPrimaryTable = compState.selectedPrimaryTable || [];
      this.selectedClientTable = compState.selectedClientTable || [];

      if (storedMapping && storedMapping.mappingDataByTable) {
        this.mappingDataByTable = storedMapping.mappingDataByTable;
        this.pruneMappingToSelected();
      } else {
        this.mappingDataByTable = {};
      }

    } else if (storedMapping) {
      // Fallback
      this.mappingDataByTable = storedMapping.mappingDataByTable || {};
      this.selectedPrimaryTable = storedMapping.selectedPrimaryTable || [];
      this.selectedClientTable = storedMapping.selectedClientTable || [];
      this.primaryDatabaseName = storedMapping.primaryDatabaseName || params['primary'] || '';
      this.clientDatabaseName = storedMapping.clientDatabaseName || params['client'] || '';
    } else {
      // Fresh Start
      this.primaryDatabaseName = params['primary'] || '';
      this.clientDatabaseName = params['client'] || '';
      this.selectedPrimaryTable = [];
      this.selectedClientTable = [];
      this.mappingDataByTable = {};
    }

    // 2. RESTORE ACTIVE TABS
    // We update the backing field directly here to avoid triggering 'save' unnecessarily 
    // during init, though triggering it wouldn't hurt.
    
    // Fix Primary
    const savedActivePrimary = compState?.activePrimaryTable;
    if (savedActivePrimary && this.selectedPrimaryTable.includes(savedActivePrimary)) {
        this._activePrimaryTable = savedActivePrimary;
    } else {
        this._activePrimaryTable = this.selectedPrimaryTable.length > 0 ? this.selectedPrimaryTable[0] : null;
    }

    // Fix Client
    const savedActiveClient = compState?.activeClientTable;
    if (savedActiveClient && this.selectedClientTable.includes(savedActiveClient)) {
        this._activeClientTable = savedActiveClient;
    } else {
        this._activeClientTable = this.selectedClientTable.length > 0 ? this.selectedClientTable[0] : null;
    }

    // 3. LOAD DATA
    if (this.primaryDatabaseName) this.getPrimaryTables();
    if (this.clientDatabaseName) this.getClientTables();

    // Ensure columns are loaded for whatever client table is active
    this.selectedClientTable.forEach(tbl => {
      this.ensureClientColumnsLoaded(tbl);
    });

    this.reconstructPrimaryTableData();

    // Initial Save
    this.saveTablesComponentState();
  }

  // ---------------- prune helper ----------------
  private pruneMappingToSelected() {
    if (!this.mappingDataByTable) return;
    const keepPrimary = new Set(this.selectedPrimaryTable);
    Object.keys(this.mappingDataByTable).forEach(k => {
      if (!keepPrimary.has(k)) delete this.mappingDataByTable[k];
    });
    const selectedClientSet = new Set(this.selectedClientTable || []);
    Object.keys(this.mappingDataByTable).forEach(primary => {
      const arr = (this.mappingDataByTable[primary] || []).filter((m: any) => {
        if (!m.clientTableName) return true; 
        return selectedClientSet.has(m.clientTableName);
      });
      if (arr.length) this.mappingDataByTable[primary] = arr;
      else this.mappingDataByTable[primary] = []; 
    });
  }

  // ---------------- navigation ----------------
  goToDatabase() {
    // 1. Clear the UI state
    sessionStorage.removeItem('tablesComponentState');
    
    // 2. Clear the mapping backup (CRITICAL STEP)
    sessionStorage.removeItem('mappingState');

    // 3. Clear local storage if you are using it (optional based on your previous code)
    localStorage.removeItem('tablesComponentState'); 

    // 4. Navigate
    this.router.navigate(['/database']);
  }

  // ---------------- primary side ----------------
  getPrimaryTables() {
    this.appService.getServerTables().subscribe((res: any) => {
      this.dropdownItemsPrimary = res || [];
    });
  }

  onSelectPrimaryTable(tableName: string) {
    if (!this.selectedPrimaryTable.includes(tableName)) {
      this.selectedPrimaryTable.push(tableName);
      this.appService.getServerColumns(tableName).subscribe((res: any) => {
        const tableData = Array.isArray(res) ? res.map(r => ({ id: r, source: tableName })) : [];
        this.primaryTableData = [...this.primaryTableData, ...tableData];
      });
    }
    // Assignment triggers setter -> triggers save
    this.activePrimaryTable = tableName; 
  }

  getRowsForTable(tableName: string | null) {
    if (!tableName) return [];
    return this.primaryTableData.filter(r => r.source === tableName);
  }

  removePrimaryTable(table: string) {
    this.selectedPrimaryTable = this.selectedPrimaryTable.filter(t => t !== table);
    
    // If we are removing the active table, switch to another one
    if (this.activePrimaryTable === table) {
      this.activePrimaryTable = this.selectedPrimaryTable[0] ?? null;
    } else {
      // Even if we didn't change active, we changed selection, so save.
      this.saveTablesComponentState();
    }

    this.primaryTableData = this.primaryTableData.filter(r => r.source !== table);
    if (this.mappingDataByTable && this.mappingDataByTable[table]) {
      delete this.mappingDataByTable[table];
    }
    
    this.saveMappingState();
  }

  // ---------------- client side ----------------
  getClientTables() {
    if (!this.clientDatabaseName) {
      this.dropdownItemsClient = [];
      return;
    }
    this.appService.getClientTables().subscribe((res: any) => {
      this.dropdownItemsClient = res || [];
    });
  }

  ensureClientColumnsLoaded(tableName: string) {
    if (!this.clientTableDataMap[tableName]) {
      this.appService.getClientColumns(tableName).subscribe((res: any) => {
        const rows = Array.isArray(res) ? res.map(r => (typeof r === 'object' ? r : { id: r, name: r })) : [];
        this.clientTableDataMap[tableName] = rows;
      });
    }
  }

  onSelectClientTable(tableName: string) {
    if (!this.clientDatabaseName) return;

    if (this.selectedClientTable.includes(tableName)) {
      this.removeClientTable(tableName); 
      return;
    }

    this.selectedClientTable.push(tableName);
    // Assignment triggers setter -> triggers save
    this.activeClientTable = tableName;
  }

  getClientRowsForTable(tableName: string | null): any[] {
    if (!tableName) return [];
    return this.clientTableDataMap[tableName] || [];
  }

  removeClientTable(table: string) {
    this.selectedClientTable = this.selectedClientTable.filter(t => t !== table);

    if (this.activeClientTable === table) {
      this.activeClientTable = this.selectedClientTable[0] ?? null;
    } else {
      this.saveTablesComponentState();
    }

    if (this.clientTableDataMap[table]) delete this.clientTableDataMap[table];
    
    if (this.mappingDataByTable) {
      Object.keys(this.mappingDataByTable).forEach(primary => {
        const mappings = this.mappingDataByTable[primary];
        if (mappings) {
            const filtered = mappings.filter((m: any) => m.clientTableName !== table);
            this.mappingDataByTable[primary] = filtered;
        }
      });
    }
    this.saveMappingState();
  }

  // ---------------- reconstruction helper ----------------
  reconstructPrimaryTableData() {
    this.primaryTableData = [];
    this.selectedPrimaryTable.forEach(table => {
      const mappedRows = this.mappingDataByTable[table];
      if (Array.isArray(mappedRows) && mappedRows.length) {
        const reconstructed = mappedRows.map((m: any) => ({
          id: m.serverColumn,
          source: table,
          position: m.clientId ? String(m.clientId) : '',
          mappedTable: m.clientTableName || null,
          mapped: !!m.mapped
        }));
        this.primaryTableData = [...this.primaryTableData, ...reconstructed];
      } else {
        this.appService.getServerColumns(table).subscribe((res: any) => {
          const tableData = Array.isArray(res) ? res.map(r => ({ id: r, source: table })) : [];
          const existingIds = new Set(this.primaryTableData.filter(p => p.source === table).map(p => p.id));
          const newRows = tableData.filter(d => !existingIds.has(d.id));
          this.primaryTableData = [...this.primaryTableData, ...newRows];
        });
      }
    });
  }

  // ---------------- mapping logic ----------------
  onMappingChange(row: any) {
    if (this.activeClientTable) row.mappedTable = this.activeClientTable;
  }

  onOkClick() {
    this.mappingDataByTable = {};
    this.selectedPrimaryTable.forEach(tableName => {
      this.mappingDataByTable[tableName] = [];
      const relatedPrimaryData = this.primaryTableData.filter(row => row.source === tableName);
      
      relatedPrimaryData.forEach(primaryRow => {
        const enteredClientId = (primaryRow as any).position;
        const targetClientTable = (primaryRow as any).mappedTable || this.activeClientTable;
        if (!enteredClientId || !targetClientTable) return;

        const clientRows = this.getClientRowsForTable(targetClientTable);
        let clientMatch;

<<<<<<< HEAD
        if (enteredClientId.includes(' ')) {
           const indexes = enteredClientId.split(' ').map((v: string) => parseInt(v.trim())).filter((v: number) => !isNaN(v));
           const mergeCols = indexes.map((i: number) => clientRows[i - 1]).filter((col: any) => !!col);
           if (mergeCols.length) {
             this.mappingDataByTable[tableName].push({
               serverColumn: primaryRow.id,
               clientColumns: mergeCols.map((c: any) => c.id || c.name),
               merge: true,
               clientTableName: targetClientTable,
               clientId: enteredClientId,
               clientName: mergeCols.map((c: any) => c.name || c.id).join(' ')
             });
           }
        } else {
          clientMatch = clientRows.find((_, i) => i + 1 == enteredClientId);
          if (clientMatch) {
            this.mappingDataByTable[tableName].push({
               serverColumn: primaryRow.id,
               clientColumns: [clientMatch.id || clientMatch.name || ''],
               merge: false,
               clientTableName: targetClientTable,
               clientId: enteredClientId,
               clientName: clientMatch.name || clientMatch.id || 'Unknown'
            });
          }
=======
        // ✅ FIX: Use targetClientTable instead of this.activeClientTable
        if (enteredClientId && targetClientTable) {
          clientMatch = this.getClientRowsForTable(targetClientTable)
            .find((_, i) => i + 1 == enteredClientId);
        }


        // ⭐ PATCH — Detect multi-column mapping like "5 6 7"
        if (primaryRow.position && primaryRow.position.includes(' ')) {

          const indexes = primaryRow.position
            .split(' ')
            .map((v: string) => parseInt(v.trim()))   // typed
            .filter((v: number) => !isNaN(v));        // typed

          primaryRow.mergeColumns = indexes
            .map((i: number) => this.getClientRowsForTable(targetClientTable)[i - 1])
            .filter((col: any) => !!col);             // ⭐ filter out undefined
        }



        // ⭐ SINGLE COLUMN MATCH (only when not multi-merge)
        let finalClientMatch = clientMatch;

        // ⭐ Skip pushing invalid indexes
        if (!primaryRow.mergeColumns && !finalClientMatch) {
          console.warn(
            `⚠ Invalid mapping index "${enteredClientId}" for table "${targetClientTable}". Skipping row.`
          );
          return;   // ❗ prevents backend NULL error
        }

        // Only push if we actually have a mapping entered
        // Now push final mapping
        if (enteredClientId) {
          this.mappingDataByTable[tableName].push({
            serverColumn: primaryRow.id,

            // ⭐ MultiColumns OR Single Column as array
            clientColumns: primaryRow.mergeColumns
              ? primaryRow.mergeColumns.map((c: any) => c.id || c.name)
              : [finalClientMatch.id || finalClientMatch.name],

            merge: primaryRow.mergeColumns ? true : false,

            clientTableName: targetClientTable,
            clientId: enteredClientId,
            clientName: primaryRow.mergeColumns
              ? primaryRow.mergeColumns.map((c: any) => c.name || c.id).join(' ')
              : (finalClientMatch.name || finalClientMatch.id || 'Unknown')
          });
>>>>>>> 5da471a9075635f89b12045bfc4057aaea0a377d
        }
      });
    });

    this.saveTablesComponentState();
    const navState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName
    };
    sessionStorage.setItem('mappingState', JSON.stringify(navState));
    this.router.navigate(['/mapping-table'], { state: navState });
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  closePrimaryDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelector('details.dropdown');
    dropdown?.removeAttribute('open');
    this.isPrimaryDropdownOpen = false;
  }

  closeClientDropdown(event: Event) {
    event.stopPropagation();
    const dropdown = document.querySelectorAll('details.dropdown')[1] as HTMLElement;
    dropdown?.removeAttribute('open');
    this.isClientDropdownOpen = false;
  }
}