import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../../service/app.service';
import { from, of } from 'rxjs';
import { concatMap, map, catchError, toArray } from 'rxjs/operators';
import { MappingSettingsService } from '../../service/mapping-settings.service';
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
  childTablesByParent: Record<string, any[]> = {};
  includeChildren = false;



  // ✅ Client columns reference (ID → Name)
  clientSideColumns: any[] = [];

  showResultModal = false;
  migrationResultMessage = '';
  migrationHasErrors = false;

  constructor(
    private router: Router,
    private appService: AppService,
    private mappingSettings: MappingSettingsService // ✅

  ) {}




  ngOnInit(): void {

    this.mappingSettings.includeChildren$
      .subscribe(value => {
        this.includeChildren = value;
      });
    const navState: any = history.state && Object.keys(history.state).length ? history.state : null;
    const storedRaw = sessionStorage.getItem('mappingState');
    const stored = storedRaw ? JSON.parse(storedRaw) : null;

    if (navState?.mappingDataByTable) {
      Object.assign(this, navState);
    } else if (stored?.mappingDataByTable) {
      Object.assign(this, stored);
    }

     if (navState?.childTablesByParent) {
  this.childTablesByParent = navState.childTablesByParent;
}

    this.updateSessionStorage();
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  private sortTablesByRelations(tables: string[]): string[] {
  const ordered: string[] = [];
  const visited = new Set<string>();

  const visit = (table: string) => {
    if (visited.has(table)) return;
    visited.add(table);

    // Find parents of this table
    Object.entries(this.childTablesByParent).forEach(([parent, children]) => {
      const isChild = children?.some(c => c.child_table === table);
      if (isChild) {
        visit(parent);
      }
    });

    ordered.push(table);
  };

  tables.forEach(visit);
  return [...new Set(ordered)];
}


  // ✅ GENERIC NAME SPLIT DETECTION (Add these methods to your component)

// Detect if mapping needs splitting (works for any full-name column)
isNameSplitMapping(clientCol: string, serverCol: string): boolean {
  const clientUpper = clientCol.toUpperCase();
  const serverUpper = serverCol.toUpperCase();

  // Generic full-name patterns
  const fullNamePatterns = ['NAME', 'AC_NAME', 'FULL_NAME', 'COMPLETE_NAME'];
  const splitNamePatterns = ['F_NAME', 'FIRST_NAME', 'M_NAME', 'MIDDLE_NAME', 'L_NAME', 'LAST_NAME'];

  return fullNamePatterns.some(pattern => clientUpper.includes(pattern)) &&
         splitNamePatterns.some(pattern => serverUpper.includes(pattern));
}

// Get split type for any name column (FIRST/MIDDLE/LAST)
getSplitType(serverCol: string): string {
  const upper = serverCol.toUpperCase();
  if (upper.includes('F_NAME') || upper.includes('FIRST_NAME')) return 'FIRST';
  if (upper.includes('L_NAME') || upper.includes('LAST_NAME')) return 'LAST';
  if (upper.includes('M_NAME') || upper.includes('MIDDLE_NAME')) return 'MIDDLE';
  return 'FULL';
}

// ✅ ENHANCED saveMapping() - Replace your existing saveMapping method completely

saveMapping() {
  if (this.isMigrating || !this.selectedPrimaryTable.length) return;

  const tablesToMigrate = this.sortTablesByRelations(
  this.selectedPrimaryTable.filter(
    t => this.mappingDataByTable[t]?.length
  )
);

  if (!tablesToMigrate.length) {
    alert('No mappings found');
    return;
  }

  this.isMigrating = true;

  const potentialJoinKeys = ['id', 'cityid', 'uuid', 'no', 'sr_no', 'row_id'];
  let detectedJoinKey = '';

  const foundKey = this.clientSideColumns.find(c =>
    potentialJoinKeys.includes((c.name || c.COLUMN_NAME || '').toLowerCase())
  );
  if (foundKey) detectedJoinKey = foundKey.name || foundKey.COLUMN_NAME;

  from(tablesToMigrate).pipe(
   concatMap(serverTable => {

  // 🔐 ENFORCE: same serverColumn + same serverTable = ONE mapping
const rawMappings = this.mappingDataByTable[serverTable] ?? [];

  const uniqueMap = new Map<string, any>();

  for (const m of rawMappings) {
    const key =
      serverTable.toLowerCase() +
      '|' +
      (m.serverColumn || '').toLowerCase();

    // keep FIRST mapping only
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, m);
    }
  }

  const dedupedMappings = Array.from(uniqueMap.values());

  // ✅ GENERIC MAPPING WITH AUTO-SPLIT DETECTION
  const mappingsForTable = dedupedMappings.map(m => {

        const rawCols = String(m.clientColumns || '').split(',').map(v => v.trim());
        const finalCols = rawCols.map(val => {
          const match = this.clientSideColumns.find(
            c => String(c.id) === val || String(c.Id) === val
          );
          return (match?.name || match?.COLUMN_NAME || val).trim();
        });

        const serverCol = (m.serverColumn || '').toUpperCase();
        const clientCol = finalCols[0]?.toUpperCase() || '';

        const mappingPayload: any = {
          serverColumn: m.serverColumn,
          clientTable: m.clientTableName,
          clientColumns: finalCols,
          joinKey: detectedJoinKey,
          splitRule: null
        };

        // ✅ AUTO-DETECT ANY NAME SPLITTING
        if (this.isNameSplitMapping(clientCol, serverCol)) {
          mappingPayload.splitRule = {
            clientColumn: finalCols[0],
            serverColumn: m.serverColumn,
            splitType: this.getSplitType(m.serverColumn),
            isAutoDetected: true
          };
        } else {
          mappingPayload.isDirectMapping = true;
        }

        return mappingPayload;
      });


    const payload = {
      serverTable,
      baseClientTable: this.selectedClientTable[0],
      joinKey: detectedJoinKey,
      bankCode: this.primaryDatabaseName, // or actual bankCode
      branchCode: this.clientDatabaseName, // or actual branchCode
      includeChildren: this.includeChildren, // ✅ ADD THIS
      mappings: mappingsForTable
    };


      return this.appService.insertData(payload).pipe(
        map(res => ({ table: serverTable, success: true, res })),
        catchError(err => of({ table: serverTable, success: false, err }))
      );
    }),
    toArray()
  ).subscribe({
    next: results => {
      this.isMigrating = false;

      const success = results.filter(r => r.success);
      const failed = results.filter(r => !r.success);

      // Mark successful mappings
      success.forEach(s => {
        this.mappingDataByTable[s.table] = this.mappingDataByTable[s.table]
          .map(r => ({ ...r, mapped: true }));
      });

      this.updateSessionStorage();

      this.migrationResultMessage = `Migration Completed\n\n✅ Success: ${success.length}\n❌ Failed: ${failed.length}`;
      this.migrationHasErrors = failed.length > 0;
      this.showResultModal = true;
      // 🔥 ADD THIS HERE — EXACTLY HERE
   if (this.includeChildren) {
  this.mappingSettings.setIncludeChildren(false);
  setTimeout(() => {
    this.mappingSettings.setIncludeChildren(true);
  }, 0);
}
    },

    error: () => {
      this.isMigrating = false;
      alert('Critical migration error');
    }
  });
}


  updateSessionStorage() {
    sessionStorage.setItem('mappingState', JSON.stringify({
      mappingDataByTable: this.mappingDataByTable,
      selectedPrimaryTable: this.selectedPrimaryTable,
      selectedClientTable: this.selectedClientTable,
      primaryDatabaseName: this.primaryDatabaseName,
      clientDatabaseName: this.clientDatabaseName,
      clientSideColumns: this.clientSideColumns
    }));
  }

  goBack() {
    this.router.navigate(['/table'], {
      state: JSON.parse(sessionStorage.getItem('mappingState') || '{}')
    });
  }

  closeModal() {
    this.showResultModal = false;
  }
}
