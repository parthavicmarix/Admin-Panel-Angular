import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, RouterLink } from '@angular/router';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-role-create',
imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgSelectModule,
    RouterModule, RouterLink, NgbPaginationModule, NgbModule, MatMenuModule, MatIconModule, CommonModule
  ],  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss'
})
export class RoleCreateComponent {
 modules = [
    'Dashboard',
    'User',
    'Role',
    'CMS',
    'Profile',
    'Email Template',
    'Email Service',
  ];
  onSave() {

  }
  
}
