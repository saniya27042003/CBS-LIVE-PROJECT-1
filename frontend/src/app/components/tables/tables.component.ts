import { Component, OnInit, output, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter(item => {
      const value = typeof item === 'string' ? item : item.label ?? (item.name ?? item.id ?? '');
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
  // Primary database tables
  dropdownItemsPrimary: any[] = [];
  selectedPrimaryTable: string[] = [];
  primaryTableData: any[] = [];
  primaryDatabaseName: string = '';
  primaryTableSearch: string = '';
  groupedPrimaryTables: { [key: string]: any[] } = {};
  // mappingDataByTable: { [tableName: string]: any[] } = {};
  mappingDataByTable: Record<string, any[]> = {};




  // Client database tables
  // dropdownItemsClient: any[] = [];
  // selectedClientTable: string = '';
  // clientTableData: any[] = [];
  // clientDatabaseName: string = '';
  // clientTableSearch: string = '';
  // mappingData: any[] = [];
  dropdownItemsClient: any[] = [];
  selectedClientTable: string[] = [];
  clientTableData: any[] = [];
  clientTableDataMap: { [tableName: string]: any[] } = {};
  clientDatabaseName: string = '';
  clientTableSearch: string = '';
  mappingData: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['primary']) {
        this.primaryDatabaseName = params['primary'];
      }
      if (params['client']) {
        this.clientDatabaseName = params['client'];
      }
    });
  }

  goToDatabase() {
    this.router.navigate(['/database']);
  }

  // getAllTableNames() {
  //   this.appService.getAllTableNames().subscribe((res: any) => {
  //     console.log(res);
  //     this.dropdownItemsPrimary = res || [];
  //     this.dropdownItemsClient = res || [];
  //   });
  // }

  // ✅ For PRIMARY dropdown
getPrimaryTables() {
  this.appService.getPrimaryTableNames().subscribe((res: any) => {
    this.dropdownItemsPrimary = res || [];
  });
}

// ✅ For CLIENT dropdown
getClientTables() {
  this.appService.getClientTableNames().subscribe((res: any) => {
    this.dropdownItemsClient = res || [];
  });
}


  // onSelectPrimaryTable(tableName: string) {
  //   if (!this.selectedPrimaryTable.includes(tableName)) {
  //     this.selectedPrimaryTable.push(tableName);
  //   }

  //   this.appService.getAllColumnsNames(tableName).subscribe((res: any) => {
  //     const tableData = Array.isArray(res)
  //       ? res.map(r => (typeof r === 'object' ? r : { id: r, source: tableName }))
  //       : [];


  //     this.primaryTableData = [...this.primaryTableData, ...tableData];
  //   });
  // }

onSelectPrimaryTable(tableName: string) {
  if (!this.selectedPrimaryTable.includes(tableName)) {
    this.selectedPrimaryTable.push(tableName);
  }

  this.appService.getPrimaryColumns(tableName).subscribe((res: any) => {
    const tableData = Array.isArray(res)
      ? res.map(r => ({ id: r, source: tableName }))
      : [];

    this.primaryTableData = [...this.primaryTableData, ...tableData];
  });
}


  getRowsForTable(tableName: string) {
    return this.primaryTableData.filter(r => r.source === tableName);
  }




//  onSelectClientTable(tableName: string) {
//   this.selectedClientTable = tableName;

//   this.appService.getClientColumns(tableName).subscribe((res: any) => {
//     this.clientTableData = Array.isArray(res)
//       ? res.map(r => ({ id: r }))
//       : [];
//   });
// }
  
  onSelectClientTable(tableName: string) {
    if (this.selectedClientTable.includes(tableName)) {
      // If yes, remove it from the array
      this.selectedClientTable = this.selectedClientTable.filter(t => t !== tableName);
    } else {
      // If no, add it to the array
      this.selectedClientTable.push(tableName);
      
      // Fetch data only if we don't have it yet
      if (!this.clientTableDataMap[tableName]) {
       this.appService.getClientColumns(tableName).subscribe((res: any) => {
          const rows = Array.isArray(res) 
            ? res.map(r => (typeof r === 'object' ? r : { id: r })) 
            : [];
            
          // Store data in the map
          this.clientTableDataMap[tableName] = rows; 
        });
      }
    }
  }
  getClientRowsForTable(tableName: string): any[] {
    return this.clientTableDataMap[tableName] || [];
  }

  // onOkClick() {
  //   debugger
  //   this.mappingData = [];
  //   this.primaryTableData.forEach(primaryRow => {
  //     const enteredClientId = primaryRow.position;
  //     if (enteredClientId !== undefined && enteredClientId !== null && enteredClientId !== '') {
  //       // const clientMatch = this.clientTableData.find(client => client.id == enteredClientId);
  //       //  const clientMatch = this.clientTableData.find(client => client.id == enteredClientId);
  //       let clientMatch
  //       for (let i = 0; i < this.clientTableData.length; i++) {
  //         if (i + 1 == enteredClientId) {
  //           clientMatch = this.clientTableData[i];
  //         }
  //       }
  //       if (clientMatch) {
  //         this.mappingData.push({
  //           id: enteredClientId,
  //           name: clientMatch.name || clientMatch.id || 'Unknown'
  //         });
  //       } else {
  //         this.mappingData.push({
  //           id: enteredClientId,
  //           name: 'Not Found'
  //         });
  //       }
  //     }
  //   });
  //   console.log('mappingData:', this.mappingData);
  // }


  // onOkClick() {
  //   debugger;
  //   this.mappingDataByTable = {};

  //   this.selectedPrimaryTable.forEach((tableName) => {
  //     const relatedPrimaryData = this.primaryTableData.filter(row => row.source === tableName);
  //     const tableMappings: any[] = [];

  //     relatedPrimaryData.forEach(primaryRow => {
  //       const enteredClientId = primaryRow.position;

  //       if (enteredClientId !== undefined && enteredClientId !== null && enteredClientId !== '') {
  //         let clientMatch;
  //         for (let i = 0; i < this.clientTableData.length; i++) {
  //           if (i + 1 == enteredClientId) {
  //             clientMatch = this.clientTableData[i];
  //           }
  //         }

  //         if (clientMatch) {
  //           tableMappings.push({
  //             id: enteredClientId,
  //             name: clientMatch.name || clientMatch.id || 'Unknown'
  //           });
  //         } else {
  //           tableMappings.push({
  //             id: enteredClientId,
  //             name: 'Not Found'
  //           });
  //         }
  //       }
  //     });

  //     this.mappingDataByTable[tableName] = tableMappings;
  //   });

  //   console.log('Mapping data by table:', this.mappingDataByTable);
  // }
  getMappingRows(tableName: string): any[] {
    // Always return a valid array, never undefined
    return this.mappingDataByTable[tableName] ?? [];
  }

  onOkClick() {
    this.mappingDataByTable = {};

    this.selectedPrimaryTable.forEach((tableName) => {
      this.mappingDataByTable[tableName] = [];

      const relatedPrimaryData = this.primaryTableData.filter(row => row.source === tableName);
      const tableMappings: any[] = [];

      relatedPrimaryData.forEach(primaryRow => {
        const enteredClientId = primaryRow.position;
        let clientMatch;

        if (enteredClientId) {
          clientMatch = this.clientTableData.find((_, i) => i + 1 == enteredClientId);
        }

        tableMappings.push({
          rowId: primaryRow.id,
          clientId: enteredClientId || '-',
          clientName: clientMatch
            ? (clientMatch.name || clientMatch.id || 'Unknown')
            : (enteredClientId ? 'Not Found' : 'No Mapping'),
        });
      });

      this.mappingDataByTable[tableName] = tableMappings;
    });
  }

  removePrimaryTable(table: string) {
  this.selectedPrimaryTable =
    this.selectedPrimaryTable.filter(t => t !== table);
}

removeClientTable(table: string) {
  this.selectedClientTable =
    this.selectedClientTable.filter(t => t !== table);
}

isPrimaryDropdownOpen = false;

closePrimaryDropdown(event: Event) {
  event.stopPropagation(); // prevents reopening
  const dropdown = document.querySelector('details.dropdown');
  dropdown?.removeAttribute('open');
  this.isPrimaryDropdownOpen = false;
}
isClientDropdownOpen = false;

closeClientDropdown(event: Event) {
  event.stopPropagation(); // prevents dropdown reopening
  const dropdown = document.querySelectorAll('details.dropdown')[1] as HTMLElement;
  dropdown?.removeAttribute('open');
  this.isClientDropdownOpen = false;
}

}

// findEven() {
//   let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]
//   let evenNUM = [];

// for (let i = 0; i < arr.length; i++) {

//   if (arr[i] % 2 == 0) {
//     evenNUM.push(arr[i])
//   }
// }
// console.log(evenNUM);


// -----1----//

// for (let i = arr.length; i--;) {
//   if (arr[i] - 0) {
//     evenNUM.push(arr[i])
//   }
// }


// for (let i = arr.length - 1; i >= 5; i--) {
//   // console.log(arr[i]);
// }

// for (let item of arr.reverse()) {
//   console.log(item);

// }

//---3---//
// for (let i = 10; i - 1 < arr.length; i--) {
//   console.log(arr[i])
// }
// output: 10987654321

// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] % 2 === 0, 1) {
//     evenNUM.push(arr[i])
//   }
// }
// console.log(evenNUM)
// }

