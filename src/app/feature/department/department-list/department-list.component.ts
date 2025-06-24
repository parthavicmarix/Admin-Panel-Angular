import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatMenuModule]
})
export class DepartmentListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  search: string = '';
  selectedDepartment: Department | null = null;

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;
      this.filteredDepartments = deps;
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/department/edit', id]);
  }

  onDelete(id: number) {
    this.departmentService.deleteDepartment(id);
    this.onSearch();
  }

  onView(id: number) {
    this.router.navigate(['/department/view', id]);
  }

  onCreate() {
    this.router.navigate(['/department/create']);
  }

  onSearch(event?: any) {
    const value = this.search.trim().toLowerCase();
    this.filteredDepartments = this.departments.filter(dep =>
      dep.name.toLowerCase().includes(value)
    );
  }

  setSelectedDepartment(dep: Department) {
    this.selectedDepartment = dep;
  }

  editSelectedDepartment() {
    if (this.selectedDepartment) {
      this.onEdit(this.selectedDepartment.id);
    }
  }

  viewSelectedDepartment() {
    if (this.selectedDepartment) {
      this.onView(this.selectedDepartment.id);
    }
  }

  deleteSelectedDepartment() {
    if (this.selectedDepartment) {
      this.onDelete(this.selectedDepartment.id);
      this.selectedDepartment = null;
    }
  }
}
