import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../../service/app.service';

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
    this.isMigrating = true;

    const serverTable = this.selectedPrimaryTable[0];
    const rows = this.mappingDataByTable[serverTable] || [];

    if (!rows.length) {
      this.isMigrating = false;
      alert('No mappings found for selected server table.');
      return;
    }

    const mappings = rows.map((m: any) => ({
      server: m.serverColumn,
      client: Array.isArray(m.clientColumns)
        ? m.clientColumns
        : (m.clientColumns ? [m.clientColumns] : []),
      merge: Array.isArray(m.clientColumns) && m.clientColumns.length > 1
    }));

    //const payload = { serverTable, mappings };

    const clientTable = this.selectedClientTable[0];

    if (!clientTable) {
      this.isMigrating = false;
      alert('Client table not selected');
      return;
    }

    const payload = {
      serverTable,
      clientTable,
      mappings
    };

    console.log('insert payload:', payload);

    this.appService.insertData(payload).subscribe({
      next: (result: any) => {
        this.isMigrating = false;
        this.mappingDataByTable[serverTable] = rows.map(r => ({ ...r, mapped: true }));

        const navState = {
          mappingDataByTable: this.mappingDataByTable,
          selectedPrimaryTable: this.selectedPrimaryTable,
          selectedClientTable: this.selectedClientTable,
          primaryDatabaseName: this.primaryDatabaseName || '',
          clientDatabaseName: this.clientDatabaseName || ''
        };
        sessionStorage.setItem('mappingState', JSON.stringify(navState));

        alert(`${result.inserted ?? 'Some'} rows migrated successfully!`);
      },
      error: (err: any) => {
        this.isMigrating = false;
        console.error('insertData error:', err);
        alert('Migration failed: ' + (err.error?.message || err.message));
      }
    });
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
}
