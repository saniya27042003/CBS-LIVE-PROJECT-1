import { Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TablesComponent } from './components/tables/tables.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'database',
        component: DatabaseComponent,
      },
      {
        path: 'setting',
        component: SettingsComponent,
      },
      {
        path: 'table',
        component: TablesComponent,
      },
    ],
  },

  { path: '', redirectTo: '/database', pathMatch: 'full' },
  { path: 'database', component: DatabaseComponent },
  // { path: 'tables', component: TablesComponent },

  { path: 'layout', component: LayoutComponent },
];
