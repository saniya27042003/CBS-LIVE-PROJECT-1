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
  selectedClientTable: string[] = [];
  primaryDatabaseName = '';
  clientDatabaseName = '';
  isMigrating = false;

  // ✅ ADDED: Variable to store the client columns list (ID -> Name reference)
  clientSideColumns: any[] = []; 

  // Modal State
  showResultModal = false;
  migrationResultMessage = '';
  migrationHasErrors = false;

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    const navState: any = (history.state && Object.keys(history.state).length) ? history.state : null;
    const storedRaw = sessionStorage.getItem('mappingState');
    const stored = storedRaw ? (() => { try { return JSON.parse(storedRaw); } catch (e) { console.warn('Invalid mappingState JSON', e); return null; } })() : null;

    if (navState && (navState.mappingDataByTable || navState.selectedPrimaryTable)) {
      this.mappingDataByTable = navState.mappingDataByTable || {};
      this.selectedPrimaryTable = navState.selectedPrimaryTable || [];
      this.selectedClientTable = Array.isArray(navState.selectedClientTable) ? navState.selectedClientTable : [navState.selectedClientTable];
      this.primaryDatabaseName = navState.primaryDatabaseName || '';
      this.clientDatabaseName = navState.clientDatabaseName || '';
      
      // ✅ ADDED: Load client columns reference if passed from previous screen
      this.clientSideColumns = navState.clientSideColumns || []; 

    } else if (stored && stored.mappingDataByTable) {
      this.mappingDataByTable = stored.mappingDataByTable || {};
      this.selectedPrimaryTable = stored.selectedPrimaryTable || [];
      this.selectedClientTable = stored.selectedClientTable || [];
      this.primaryDatabaseName = stored.primaryDatabaseName || '';
      this.clientDatabaseName = stored.clientDatabaseName || '';
      
      // ✅ ADDED: Load from session
      this.clientSideColumns = stored.clientSideColumns || []; 
    } else {
      this.mappingDataByTable = {};
      this.selectedPrimaryTable = [];
      this.selectedClientTable = [];
    }

    // Defensive prune
    if (this.mappingDataByTable && this.selectedPrimaryTable && this.selectedPrimaryTable.length) {
      const keep = new Set(this.selectedPrimaryTable);
      Object.keys({ ...this.mappingDataByTable }).forEach(k => {
        if (!keep.has(k)) delete this.mappingDataByTable[k];
      });
    }

    this.updateSessionStorage();
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  saveMapping() {
    if (this.isMigrating || !this.selectedPrimaryTable.length) return;

    const tablesToMigrate = this.selectedPrimaryTable.filter(table => 
      this.mappingDataByTable[table] && this.mappingDataByTable[table].length > 0
    );

    if (tablesToMigrate.length === 0) {
      alert('No mappings found to save.');
      return;
    }

    this.isMigrating = true;

    from(tablesToMigrate).pipe(
      concatMap(serverTable => {
        const rows = this.mappingDataByTable[serverTable];

        const payload = {
          serverTable: serverTable,
          baseClientTable: this.selectedClientTable[0], 
          mappings: rows.map((m: any) => {
            
            // ✅ ADDED: Logic to convert IDs "5,6,7" to Names ["First", "Middle", "Last"]
            let finalCols: string[] = [];

            // 1. Get the raw input (e.g. "5,6,7")
            const rawInput = m.clientColumns;

            if (rawInput) {
              // 2. Split by comma to get individual items
              const inputs = String(rawInput).split(',').map(s => s.trim());
              
              // 3. Try to find Names for these IDs
              const resolvedNames: string[] = [];
              
              inputs.forEach(inputItem => {
                // Check if 'clientSideColumns' has this ID
                const match = this.clientSideColumns.find((col: any) => String(col.id) === inputItem || String(col.Id) === inputItem);
                
                if (match) {
                  // Found ID -> Use Name (e.g. "First_name")
                  resolvedNames.push(match.name || match.Name || match.COLUMN_NAME); 
                } else {
                  // ID not found? Assume it's already a Name (fallback)
                  resolvedNames.push(inputItem);
                }
              });

              finalCols = resolvedNames;
            }

            return {
              serverColumn: m.serverColumn,
              clientTable: m.clientTableName,
              clientColumns: finalCols // Sending Array of Strings to backend
            };
          })
        };

        console.log(`Migrating table: ${serverTable}`, payload);

        return this.appService.insertData(payload).pipe(
          map(result => ({ table: serverTable, success: true, result })),
          catchError(err => of({ table: serverTable, success: false, error: err }))
        );
      }),
      toArray()
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

  updateSessionStorage() {
    const mappingState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || '',
      clientSideColumns: this.clientSideColumns || [] // ✅ Persist client columns
    };
    sessionStorage.setItem('mappingState', JSON.stringify(mappingState));
  }

  goBack() {
    const navState = {
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName || '',
      clientDatabaseName: this.clientDatabaseName || '',
      clientSideColumns: this.clientSideColumns || [] // ✅ Pass back client columns
    };

    if (Object.keys(this.mappingDataByTable).length) {
      sessionStorage.setItem('mappingState', JSON.stringify(navState));
    } else {
      sessionStorage.removeItem('mappingState');
    }

    this.router.navigate(['/table'], { state: navState });
  }

  closeModal() {
    this.showResultModal = false;
  }
}