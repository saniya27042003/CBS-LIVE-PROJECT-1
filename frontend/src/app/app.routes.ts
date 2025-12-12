import { Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TablesComponent } from './components/tables/tables.component';
import { MappingTableComponent } from './components/mapping-table/mapping-table.component';

export const routes: Routes = [

  // LOGIN OUTSIDE THE LAYOUT
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // EVERYTHING ELSE INSIDE LAYOUT
  {
    path: '',
    component: LayoutComponent,  // layout wraps these pages ONLY
    children: [
      { path: 'database', component: DatabaseComponent },
      { path: 'table', component: TablesComponent },
      { path: 'setting', component: SettingsComponent },
      { path: 'mapping-table', component: MappingTableComponent }
    ]
  }
];
