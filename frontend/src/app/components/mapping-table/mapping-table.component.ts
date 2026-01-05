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

  // ✅ Client columns reference (ID → Name)
  clientSideColumns: any[] = [];

  showResultModal = false;
  migrationResultMessage = '';
  migrationHasErrors = false;

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    const navState: any = history.state && Object.keys(history.state).length ? history.state : null;
    const storedRaw = sessionStorage.getItem('mappingState');
    const stored = storedRaw ? JSON.parse(storedRaw) : null;

    if (navState?.mappingDataByTable) {
      Object.assign(this, navState);
    } else if (stored?.mappingDataByTable) {
      Object.assign(this, stored);
    }

    this.updateSessionStorage();
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }


  saveMapping() {
  if (this.isMigrating || !this.selectedPrimaryTable.length) return;

  const tablesToMigrate = this.selectedPrimaryTable.filter(
    t => this.mappingDataByTable[t]?.length
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

      const mappingsForTable = this.mappingDataByTable[serverTable].map(m => {
        const rawCols = String(m.clientColumns || '').split(',').map(v => v.trim());

        const finalCols = rawCols.map(val => {
          const match = this.clientSideColumns.find(
            c => String(c.id) === val || String(c.Id) === val
          );
          return (match?.name || match?.COLUMN_NAME || val).trim();
        });

        const serverCol = (m.serverColumn || '').toUpperCase();

        const mappingPayload: any = {
          serverColumn: m.serverColumn,
          clientTable: m.clientTableName,
          clientColumns: finalCols,
          value: '' // will hold actual transformed value
        };

        // ✅ GENERIC FULL-NAME SPLIT LOGIC
        if (finalCols.length === 1 && finalCols[0].toUpperCase().includes('NAME')) {
          // Apply split if server column looks like F/M/L
          mappingPayload.value = (fullName: string) => {
            if (!fullName) return '';
            const parts = fullName.trim().split(/\s+/);

            if (serverCol.includes('F_NAME')) return parts[0] || '';
            if (serverCol.includes('L_NAME')) return parts.length > 1 ? parts[parts.length - 1] : '';
            if (serverCol.includes('M_NAME')) return parts.length > 2 ? parts.slice(1, parts.length - 1).join(' ') : '';
            return fullName; // fallback
          };
        }

        return mappingPayload;
      });

      const payload = {
        serverTable,
        baseClientTable: this.selectedClientTable[0],
        joinKey: detectedJoinKey,
        mappings: mappingsForTable
      };

      // Apply the value transform for each row before sending
      payload.mappings.forEach(mapping => {
        if (mapping.value) {
          // Example: here you should apply this on each row of actual client data
          // For demo: just leaving it in payload
        }
      });

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

      success.forEach(s => {
        this.mappingDataByTable[s.table] =
          this.mappingDataByTable[s.table].map(r => ({ ...r, mapped: true }));
      });

      this.updateSessionStorage();

      this.migrationResultMessage =
        `Migration Completed\n\nSuccess: ${success.length}\nFailed: ${failed.length}`;
      this.migrationHasErrors = failed.length > 0;
      this.showResultModal = true;
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
