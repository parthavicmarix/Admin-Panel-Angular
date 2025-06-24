import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectCreateEditComponent } from './project-create-edit/project-create-edit.component';
import { ProjectViewComponent } from './project-view/project-view.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: 'list', component: ProjectListComponent },
  { path: 'create', component: ProjectCreateEditComponent },
  { path: 'edit/:id', component: ProjectCreateEditComponent },
  { path: 'view/:id', component: ProjectViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
