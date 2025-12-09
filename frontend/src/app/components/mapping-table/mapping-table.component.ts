import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../service/app.service';

@Component({
  selector: 'app-mapping-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css']
})
export class MappingTableComponent implements OnInit {
  mappingDataByTable: Record<string, any[]> = {};
  selectedPrimaryTable: string[] = [];   // PG target table(s)
  selectedClientTable = '';              // MSSQL source table
  isMigrating = false;

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    const navState: any = history.state;
    console.log('mapping-table navState:', navState);

    if (navState?.mappingDataByTable) {
      this.mappingDataByTable = navState.mappingDataByTable;
      this.selectedPrimaryTable = navState.selectedPrimaryTable || [];
      this.selectedClientTable = navState.selectedClientTable || '';
    }
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }
  // MappingTableComponent

  saveMapping() {
    console.log('saveMapping clicked');
    console.log('selectedPrimaryTable:', this.selectedPrimaryTable);
    console.log('selectedClientTable:', this.selectedClientTable);

    if (this.isMigrating || !this.selectedPrimaryTable.length || !this.selectedClientTable) {
      console.log('blocked in guard');
      return;
    }

    this.isMigrating = true;

    const serverTable = this.selectedPrimaryTable[0];   // e.g. 'comp_customers'
    const clientTable = this.selectedClientTable;       // e.g. 'CUSTOMERS'

    console.log('serverTable for mapping:', serverTable);
    console.log('mappingDataByTable:', this.mappingDataByTable);

    const rows = this.mappingDataByTable[serverTable];
    if (!rows || !rows.length) {
      console.error('No mapping rows found for serverTable =', serverTable);
      this.isMigrating = false;
      alert('No mappings found for selected server table.');
      return;
    }

    const mappings = rows.map((m: any) => ({
      server: m.serverColumn,      // you must have set this in onOkClick
      client: m.clientColumn,      // you must have set this in onOkClick
      merge: m.merge || false
    }));

    const payload = { serverTable, clientTable, mappings };
    console.log('insertData payload:', payload);

    this.appService.insertData(payload).subscribe({
      next: (result: any) => {
        this.isMigrating = false;
        if (result.success) {
          alert(`${result.inserted} rows migrated successfully!`);
        }
      },
      error: (err: any) => {
        this.isMigrating = false;
        console.error('insertData error:', err);
        alert('Migration failed: ' + (err.error?.message || err.message));
      }
    });
  }



  goBack() {
    this.router.navigate(['./table']);
  }
}
