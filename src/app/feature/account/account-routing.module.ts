import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list.component';
import { AccountCreateEditComponent } from './account-create-edit.component';
import { AccountViewComponent } from './account-view.component';

const routes: Routes = [
  { path: '', component: AccountListComponent },
  { path: 'create', component: AccountCreateEditComponent },
  { path: 'edit/:id', component: AccountCreateEditComponent },
  { path: 'view/:id', component: AccountViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
