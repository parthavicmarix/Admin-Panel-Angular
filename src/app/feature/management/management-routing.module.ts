import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementListComponent } from './management-list.component';
import { ManagementCreateEditComponent } from './management-create-edit.component';
import { ManagementViewComponent } from './management-view.component';

const routes: Routes = [
  { path: '', component: ManagementListComponent },
  { path: 'create', component: ManagementCreateEditComponent },
  { path: 'edit/:id', component: ManagementCreateEditComponent },
  { path: 'view/:id', component: ManagementViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
