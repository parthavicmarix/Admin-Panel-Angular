import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateEditComponent } from './department-create-edit/department-create-edit.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent },
  { path: 'create', component: DepartmentCreateEditComponent },
  { path: 'edit/:id', component: DepartmentCreateEditComponent },
  { path: 'view/:id', component: DepartmentViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
