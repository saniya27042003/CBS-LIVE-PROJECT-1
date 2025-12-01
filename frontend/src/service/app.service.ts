import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '../envinonment/env';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  http = inject(HttpClient);
  // e.g. 'http://localhost:3000/database-mapping/'
  BASE_URL = env.apiBaseUrl;

  constructor() { }

  // CONNECT: used from database.component.ts
  connectClient(config: any) {
    return this.http.post(this.BASE_URL + 'connect-client', config);
  }

  // TABLE NAMES

  getAllTableNames() {
    return this.http.get(this.BASE_URL + 'getAllTableName');
  }

  getPrimaryTableNames() {
    return this.http.get<string[]>(this.BASE_URL + 'primary-tables');
  }

  getClientTableNames() {
    return this.http.get<string[]>(this.BASE_URL + 'client-tables');
  }

  // PRIMARY COLUMNS (same as old service)

  getAllColumnsNames(tableName: string) {
    return this.http.post<string[]>(
      this.BASE_URL + 'getAllColumnsNames',
      { tableName },
    );
  }

  getPrimaryColumns(tableName: string) {
    // if you want a dedicated primary endpoint later, change here;
    // for now this just reuses getAllColumnsNames (primary side)
    return this.getAllColumnsNames(tableName);
  }

  // CLIENT COLUMNS – FIXED to use existing Nest route

  getClientColumns(tableName: string) {
    return this.http.post<string[]>(
      this.BASE_URL + 'client/getAllColumnsNames',
      { tableName },
    );
  }

  // TABLE STRUCTURE

  getTableStructure(tableName: string) {
    return this.http.post<{ columns: string[]; rows: any[] }>(
      this.BASE_URL + 'getTableStructure',
      { tableName },
    );
  }
}
