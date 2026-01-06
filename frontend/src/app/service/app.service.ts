import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);

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

  // getServerColumns(tableName: string) {
  //   return this.http.post<string[]>(this.BASE_URL + 'server/columns', {
  //     tableName,
  //   });
  // }
getServerColumns(tableName: string) {
  return this.http.post<string[]>(
    this.BASE_URL + 'server/columns',
    { tableName }
  );
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
getChildTables(parentTable: string) {
  return this.http.get<any[]>(
    this.BASE_URL + 'child-tables/' + parentTable
  );
}


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
