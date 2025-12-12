import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DbStateService {

  primaryForm: any = null;
  clientForm: any = null;

  selectedDatabase: string = '';
  databaseList: string[] = [];

  primaryClassMap: any = {};
  clientClassMap: any = {};

  clear() {
    this.primaryForm = null;
    this.clientForm = null;
    this.selectedDatabase = '';
    this.databaseList = [];
    this.primaryClassMap = {};
    this.clientClassMap = {};
  }
}
