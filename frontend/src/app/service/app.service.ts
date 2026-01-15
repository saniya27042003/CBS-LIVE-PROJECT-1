import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);

  // ✅ CHILD TABLE TOGGLE STATE
private includeChildTables$ = new BehaviorSubject<boolean>(
  localStorage.getItem('includeChildTables') === 'true'
);

// ✅ CHILD TABLE DATA STATE
private childTables$ = new BehaviorSubject<any[]>([]);


  // ✅ MUST END WITH /
  // private BASE_URL = env.apiBaseUrl;
  //  Example: http://localhost:3000/database-mapping/
private BASE_URL = 'http://localhost:3000/database-mapping/';
  constructor() {}

  // =====================================
  // ✅ SERVER (PRIMARY DB - POSTGRES)
  // =====================================

  connectServer(config: any) {
    return this.http.post(this.BASE_URL + 'connect-server', config);
  }

  getServerTables() {
    return this.http.get<string[]>(this.BASE_URL + 'server/tables');
  }
  getServerColumns(tableName: string) {
  return this.http.post<string[]>(
    this.BASE_URL + 'server/columns',
    { tableName }
  );
}


  // ✅ FETCH CHILD TABLES (POSTGRES FK)
getChildTables(parentTable: string) {
  return this.http.get<any[]>(
    this.BASE_URL + 'child-tables/' + parentTable
  );
}

// ✅ UPDATE CHILD TABLE STATE
setChildTables(tables: any[]) {
  this.childTables$.next(tables);
}



// ✅ CHILD TABLE TOGGLE STATE

  setIncludeChildTables(value: boolean) {
      localStorage.setItem('includeChildTables', String(value)); // ✅ SAVE

  this.includeChildTables$.next(value);

  // 🔥 CRITICAL FIX
  if (!value) {
    this.childTables$.next([]); // CLEAR child tables immediately
  }
}

getIncludeChildTables() {
  return this.includeChildTables$.asObservable();
}

getChildTablesState() {
  return this.childTables$.asObservable();
}


  // =====================================
  // ✅ CLIENT (PG / MSSQL / MYSQL)
  // =====================================

  connectClient(config: any) {
    return this.http.post(this.BASE_URL + 'connect-client', config);
  }

  getClientTables() {
    return this.http.get<string[]>(this.BASE_URL + 'client/tables');
  }

  getClientColumns(tableName: string) {
    return this.http.post<string[]>(this.BASE_URL + 'client/columns', {
      tableName,
    });
  }

  getClientTableStructure(tableName: string) {
    return this.http.post<{ columns: string[]; rows: any[] }>(
      this.BASE_URL + 'client/table-structure',
      { tableName },
    );
  }

  // =====================================
  // ✅ DATA MIGRATION
  // =====================================
// =====================================
// ✅ SINGLE TABLE MIGRATION
// =====================================
insertData(payload: {
  serverTable: string;
  baseClientTable: string;
  mappings: {
    serverColumn: string;
    clientTable: string;
    clientColumns: string[];
  }[];
}) {
  return this.http.post(this.BASE_URL + 'insert-data', payload);
}


// =====================================
// ✅ FETCH CHILD TABLES (POSTGRES FK)
// =====================================
// getChildTables(parentTable: string) {
//   return this.http.get<any[]>(
//     this.BASE_URL + 'child-tables/' + parentTable
//   );
// }


// =====================================
// ✅ MULTIPLE TABLE MIGRATION
// =====================================
migrateMultipleTables(payload: {
  tables: string[];
  mappingsPerTable: {
    [table: string]: {
      serverTable: string;
      clientTable: string;
      mappings: any[];
    };
  };
  relations: any[];
}) {
  return this.http.post(
    this.BASE_URL + 'migrate-multiple',
    payload
  );
}


}
