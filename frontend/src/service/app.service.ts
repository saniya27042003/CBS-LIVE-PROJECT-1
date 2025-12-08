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

  getServerColumns(tableName: string) {
    return this.http.post<string[]>(this.BASE_URL + 'server/columns', {
      tableName,
    });
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

  insertData(mappingPayload: any) {
    return this.http.post(this.BASE_URL + 'insert-data', mappingPayload);
  }
}
