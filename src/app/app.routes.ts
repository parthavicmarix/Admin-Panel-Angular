import { Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { TaskListComponent } from './feature/task/task-list/task-list.component';
import { TaskCreateComponent } from './feature/task/task-create/task-create.component';
import { TaskEditComponent } from './feature/task/task-edit/task-edit.component';
import { TaskViewComponent } from './feature/task/task-view/task-view.component';

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
      {
            path: 'employee/list',
            loadComponent: () => import('./feature/employee/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
      },
      {
            path: 'employee/create',
            loadComponent: () => import('./feature/employee/employee-create/employee-create.component').then(m => m.EmployeeCreateComponent)
      },
      {
            path: 'employee/edit/:id',
            loadComponent: () => import('./feature/employee/employee-edit/employee-edit.component').then(m => m.EmployeeEditComponent)
      },
      {
            path: 'employee/view/:id',
            loadComponent: () => import('./feature/employee/employee-view/employee-view.component').then(m => m.EmployeeViewComponent)
      },
      {
            path: 'tasks',
            children: [
                  {
                        path: '',
                        component: TaskListComponent
                  },
                  {
                        path: 'create',
                        component: TaskCreateComponent
                  },
                  {
                        path: 'edit/:id',
                        component: TaskEditComponent
                  },
                  {
                        path: 'view/:id',
                        component: TaskViewComponent
                  }
            ]
      },

];
