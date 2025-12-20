import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../../service/app.service';
import { from, of } from 'rxjs';
import { concatMap, map, catchError, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-mapping-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css']
})
export class MappingTableComponent implements OnInit {
  mappingDataByTable: Record<string, any[]> = {};
  selectedPrimaryTable: string[] = [];
  // Keep client selection as array so Tables can restore it
  selectedClientTable: string[] = [];
  primaryDatabaseName = '';
  clientDatabaseName = '';
  isMigrating = false;

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    // Prefer history.state then sessionStorage (mappingState)
    const navState: any = (history.state && Object.keys(history.state).length) ? history.state : null;
    const storedRaw = sessionStorage.getItem('mappingState');
    const stored = storedRaw ? (() => { try { return JSON.parse(storedRaw); } catch (e) { console.warn('Invalid mappingState JSON', e); return null; } })() : null;

    if (navState && (navState.mappingDataByTable || navState.selectedPrimaryTable || navState.selectedClientTable)) {
      this.mappingDataByTable = navState.mappingDataByTable || {};
      this.selectedPrimaryTable = navState.selectedPrimaryTable || [];
      // selectedClientTable may be array or string — normalize to array
      if (navState.selectedClientTable) {
        this.selectedClientTable = Array.isArray(navState.selectedClientTable) ? navState.selectedClientTable : [navState.selectedClientTable];
      } else {
        this.selectedClientTable = [];
      }
      this.primaryDatabaseName = navState.primaryDatabaseName || '';
      this.clientDatabaseName = navState.clientDatabaseName || '';
      console.log('MappingTable: loaded from history.state', { selectedPrimaryTable: this.selectedPrimaryTable, selectedClientTable: this.selectedClientTable });
    } else if (stored && stored.mappingDataByTable) {
      this.mappingDataByTable = stored.mappingDataByTable || {};
      this.selectedPrimaryTable = stored.selectedPrimaryTable || [];
      this.selectedClientTable = stored.selectedClientTable || [];
      this.primaryDatabaseName = stored.primaryDatabaseName || '';
      this.clientDatabaseName = stored.clientDatabaseName || '';
      console.log('MappingTable: loaded from sessionStorage mappingState', { selectedPrimaryTable: this.selectedPrimaryTable, selectedClientTable: this.selectedClientTable });
    } else {
      this.mappingDataByTable = {};
      this.selectedPrimaryTable = [];
      this.selectedClientTable = [];
    }

    // Defensive prune so deselected primary tables don't reappear
    if (this.mappingDataByTable && this.selectedPrimaryTable && this.selectedPrimaryTable.length) {
      const keep = new Set(this.selectedPrimaryTable);
      Object.keys({ ...this.mappingDataByTable }).forEach(k => {
        if (!keep.has(k)) delete this.mappingDataByTable[k];
      });
    }

    // Persist mapping state (include selectedClientTable so Tables can restore client tags)
    const mappingState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || ''
    };

    if (Object.keys(this.mappingDataByTable).length) {
      sessionStorage.setItem('mappingState', JSON.stringify(mappingState));
    } else {
      sessionStorage.removeItem('mappingState');
    }

    console.log('MappingTable init', { mappingKeys: Object.keys(this.mappingDataByTable), selectedClientTable: this.selectedClientTable });
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  saveMapping() {
    if (this.isMigrating || !this.selectedPrimaryTable.length) return;

    // 1. Filter: Only migrate tables that actually have mapping data
    const tablesToMigrate = this.selectedPrimaryTable.filter(table =>
      this.mappingDataByTable[table] && this.mappingDataByTable[table].length > 0
    );

    if (tablesToMigrate.length === 0) {
      alert('No mappings found to save.');
      return;
    }

    this.isMigrating = true;

    // 2. Loop: Process each table sequentially using RxJS 'from' and 'concatMap'
    from(tablesToMigrate).pipe(
      concatMap(serverTable => {
        const rows = this.mappingDataByTable[serverTable];

        // Prepare payload for THIS specific table
        const payload = {
          serverTable: serverTable,
          // We use the first client table as a fallback base, but your rows contain specific table info
          baseClientTable: this.selectedClientTable[0],
          mappings: rows.map((m: any) => ({
            serverColumn: m.serverColumn,
            clientTable: m.clientTableName, // Ensure we send the correct source table
            clientColumns: Array.isArray(m.clientColumns) ? m.clientColumns : [m.clientColumns]
          }))
        };

        console.log(`Migrating table: ${serverTable}...`);

        // Send request and catch errors locally so one failure doesn't stop the loop
        return this.appService.insertData(payload).pipe(
          map(result => ({ table: serverTable, success: true, result })),
          catchError(err => of({ table: serverTable, success: false, error: err }))
        );
      }),
      toArray() // Wait for ALL tables to finish
    ).subscribe({
      next: (results) => {
        this.isMigrating = false;

        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);

        successful.forEach(item => {
          if (this.mappingDataByTable[item.table]) {
            this.mappingDataByTable[item.table] =
              this.mappingDataByTable[item.table].map(r => ({ ...r, mapped: true }));
          }
        });

        this.updateSessionStorage();

        let msg = `Migration Completed!\n\nSuccessful Tables: ${successful.length}\nFailed Tables: ${failed.length}`;
        if (failed.length > 0) {
          msg += `\n\nFailed: ${failed.map(f => f.table).join(', ')}`;
        }

        this.migrationResultMessage = msg;
        this.migrationHasErrors = failed.length > 0;
        this.showResultModal = true;
      },

      error: (err) => {
        this.isMigrating = false;
        console.error('Critical Migration Error:', err);
        alert('A critical error stopped the migration process.');
      }
    });
  }

  // Helper to keep code clean
  updateSessionStorage() {
    const mappingState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || ''
    };
    sessionStorage.setItem('mappingState', JSON.stringify(mappingState));
  }


  goBack() {
    // persist mapping + selectedPrimaryTable + selectedClientTable + DB names,
    // so Tables page can restore client tags and client columns on Back
    const navState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || ''
    };

    if (Object.keys(this.mappingDataByTable).length) {
      sessionStorage.setItem('mappingState', JSON.stringify(navState));
    } else {
      sessionStorage.removeItem('mappingState');
    }

    // navigate back to Tables and include navState so Tables receives history.state
    this.router.navigate(['/table'], { state: navState });
  }
  showResultModal = false;
  migrationResultMessage = '';
  migrationHasErrors = false;

}