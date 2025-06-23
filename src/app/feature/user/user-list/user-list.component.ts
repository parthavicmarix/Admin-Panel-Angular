import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  imports: [MatFormFieldModule, MatInputModule, MatMenuModule,
    FormsModule, ReactiveFormsModule, RouterLink,
    NgbPaginationModule, NgbModule, MatMenuModule, MatIconModule, CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  search!: string;
  currentPage = 1;

  constructor() { }

  ngOnInit(): void { }

  onSearch(ev: any) { }

  onReset() { }

  onPageChange(event: number) {
    this.page = event;
    this.currentPage = this.page;
  }
}
