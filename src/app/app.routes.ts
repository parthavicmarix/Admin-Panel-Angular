import { Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
            path: 'login',
            loadComponent: () => import('./feature/auth/login/login.component').then(m => m.LoginComponent)
      },
      { path: 'dashboard', component: DashboardComponent },
      {
            path: 'user-list',
            loadComponent: () => import('./feature/user/user-list/user-list.component').then(m => m.UserListComponent)
      },
      {
            path: 'user-create',
            loadComponent: () => import('./feature/user/user-create/user-create.component').then(m => m.UserCreateComponent)
      },
      {
            path: 'role-list',
            loadComponent: () => import('./feature/role/role-list/role-list.component').then(m => m.RoleListComponent)
      },
      {
            path: 'role-create',
            loadComponent: () => import('./feature/role/role-create/role-create.component').then(m => m.RoleCreateComponent)
      },

];
