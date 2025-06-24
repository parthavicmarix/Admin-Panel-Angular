import { Routes } from '@angular/router';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { TaskListComponent } from './feature/task/task-list/task-list.component';
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
            loadComponent: () => import('./feature/employee/employee-create-edit/employee-create-edit.component').then(m => m.EmployeeCreateEditComponent)
      },
      {
            path: 'employee/edit/:id',
            loadComponent: () => import('./feature/employee/employee-create-edit/employee-create-edit.component').then(m => m.EmployeeCreateEditComponent)
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
                        loadComponent: () => import('./feature/task/task-create-edit/task-create-edit.component').then(m => m.TaskCreateEditComponent)
                  },
                  {
                        path: 'edit/:id',
                        loadComponent: () => import('./feature/task/task-create-edit/task-create-edit.component').then(m => m.TaskCreateEditComponent)
                  },
                  {
                        path: 'view/:id',
                        component: TaskViewComponent
                  }
            ]
      },
      {
            path: 'department',
            loadChildren: () => import('./feature/department/department.module').then(m => m.DepartmentModule)
      },
      {
            path: 'project',
            loadChildren: () => import('./feature/project/project.module').then(m => m.ProjectModule)
      }

];
