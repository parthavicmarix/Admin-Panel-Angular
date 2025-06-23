import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-list',
 imports: [MatFormFieldModule, MatInputModule, MatMenuModule,
    FormsModule, ReactiveFormsModule, RouterLink,
    NgbPaginationModule, NgbModule, MatMenuModule, MatIconModule, CommonModule],
    templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  search:any;
  onSearch(ev:any){

  }
}
