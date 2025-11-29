import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../envinonment/env';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  http = inject(HttpClient);
  BASE_URL = env.apiBaseUrl;  // 'http://localhost:3000/database-mapping/'

  constructor() { }

  // CONNECT: used from database.component.ts
  connectClient(config: any) {
    // backend controller: @Post('connect')
    return this.http.post(this.BASE_URL + 'connect-client', config);
  }

  // existing endpoints (BASE_URL already includes 'database-mapping/')
  getAllTableNames() {
    return this.http.get(this.BASE_URL + 'getAllTableName');
  }

  getAllColumnsNames(tableName: string) {
    return this.http.post(this.BASE_URL + 'getAllColumnsNames', { tableName });
  }

  getPrimaryTableNames() {
    return this.http.get<string[]>(this.BASE_URL + 'primary-tables');
  }

  getClientTableNames() {
    return this.http.get<string[]>(this.BASE_URL + 'client-tables');
  }

  // add these two because tables.component.ts uses them
  getPrimaryColumns(tableName: string) {
    return this.http.get(this.BASE_URL + 'primary/columns/' + tableName);
  }

  getClientColumns(tableName: string) {
    return this.http.get(this.BASE_URL + 'client/columns/' + tableName);
  }

  getTableStructure(tableName: string) {
    return this.http.post<{ columns: string[]; rows: any[] }>(
      this.BASE_URL + 'getTableStructure',
      { tableName }
    );
  }
}
