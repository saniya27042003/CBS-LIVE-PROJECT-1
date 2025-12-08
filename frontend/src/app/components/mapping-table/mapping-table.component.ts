import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navState: any = history.state;
    console.log('mapping-table navState:', navState);

    if (navState?.mappingDataByTable) {
      this.mappingDataByTable = navState.mappingDataByTable;
      this.selectedPrimaryTable = navState.selectedPrimaryTable || [];
    } else {
      // If opened directly or on refresh – optional: go back
      // this.router.navigate(['/table']);
    }
  }

  getMappingRows(tableName: string): any[] {
    return this.mappingDataByTable[tableName] ?? [];
  }

  goBack() {
    this.router.navigate(['./table']);
  }
}
