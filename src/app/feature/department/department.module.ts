import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepartmentRoutingModule } from './department-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentCreateEditComponent } from './department-create-edit/department-create-edit.component';
import { DepartmentViewComponent } from './department-view/department-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DepartmentRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    DepartmentListComponent,
    DepartmentCreateEditComponent,
    DepartmentViewComponent
  ]
})
export class DepartmentModule { }
