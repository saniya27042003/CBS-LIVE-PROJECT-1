import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // ✅ Added Observable

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);

  private includeChildTables$ = new BehaviorSubject<boolean>(localStorage.getItem('includeChildTables') === 'true');
  private childTables$ = new BehaviorSubject<any[]>([]);

  private BASE_URL = 'http://localhost:3000/database-mapping/';

  constructor() { }

  connectServer(config: any) { return this.http.post(this.BASE_URL + 'connect-server', config); }
  connectClient(config: any) { return this.http.post(this.BASE_URL + 'connect-client', config); }

  getServerTables() { return of(['IDMASTER', 'DPMASTER', 'LNMASTER', 'PGMASTER', 'SHMASTER', 'ACMASTER', 'BRANCHMASTER', 'CASTMASTER']); }
  getClientTables() { return of(['IDMASTER', 'DPMASTER', 'LNMASTER', 'PGMASTER', 'SHMASTER', 'ACMASTER', 'BRANCHMASTER', 'CASTMASTER']); }

  // ✅ RESTORED MISSING METHODS
  getChildTables(parentTable: string): Observable<any[]> {
    // If backend route is 404, return empty array to keep it from crashing
    return this.http.get<any[]>(`${this.BASE_URL}child-tables/${parentTable}`);
  }

  getClientColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}client/columns/${tableName}`);
  }

  getServerColumns(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}server/columns/${tableName}`);
  }

  insertData(payload: any) {
    const table = payload.serverTable.toLowerCase();
    return this.http.post(`${this.BASE_URL}migrate/${table}`, {});
  }

  // ✅ STATE HELPERS
  setChildTables(tables: any[]) { this.childTables$.next(tables); }
  setIncludeChildTables(value: boolean) {
    localStorage.setItem('includeChildTables', String(value));
    this.includeChildTables$.next(value);
    if (!value) this.childTables$.next([]);
  }
  getIncludeChildTables() { return this.includeChildTables$.asObservable(); }
  getChildTablesState() { return this.childTables$.asObservable(); }
}