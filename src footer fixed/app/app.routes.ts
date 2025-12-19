import { Routes } from '@angular/router';
import { DatabaseComponent } from './components/database/database.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TablesComponent } from './components/tables/tables.component';
import { MappingTableComponent } from './components/mapping-table/mapping-table.component';




export const routes: Routes = [

  // ✅ Login Route
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // ✅ Main Layout Routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'database', component: DatabaseComponent },
      { path: 'setting', component: SettingsComponent },
      { path: 'table', component: TablesComponent },

      // ✅ mapping-table is also inside the layout
      { path: 'mapping-table', component: MappingTableComponent }
    ]
  }
];
