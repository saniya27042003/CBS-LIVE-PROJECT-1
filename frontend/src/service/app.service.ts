import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  http = inject(HttpClient)
  BASE_URL = 'http://localhost:3000/database-mapping/'

  getPrimaryTableNames() {
    return this.http.get(this.BASE_URL + 'primary/tables');
  }

  getPrimaryColumns(tableName: string) {
    return this.http.get(this.BASE_URL + 'primary/columns/' + tableName);
  }

  getClientTableNames() {
    return this.http.get(this.BASE_URL + 'client/tables');
  }

  getClientColumns(tableName: string) {
    return this.http.get(this.BASE_URL + 'client/columns/' + tableName);
  }
}
