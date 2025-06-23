import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule, RouterModule]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  search: string = '';
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  onSearch(event: any) {
    const value = this.search.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(value) ||
      emp.email.toLowerCase().includes(value) ||
      emp.position.toLowerCase().includes(value)
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
  }

  editEmployee(id: number) {
    this.router.navigate(['/employee/edit', id]);
  }

  viewEmployee(id: number) {
    this.router.navigate(['/employee/view', id]);
  }

  setSelectedEmployee(emp: Employee) {
    this.selectedEmployee = emp;
  }

  editSelectedEmployee() {
    if (this.selectedEmployee) {
      this.editEmployee(this.selectedEmployee.id);
    }
  }
  viewSelectedEmployee() {
    if (this.selectedEmployee) {
      this.viewEmployee(this.selectedEmployee.id);
    }
  }
  deleteSelectedEmployee() {
    if (this.selectedEmployee) {
      this.deleteEmployee(this.selectedEmployee.id);
    }
  }
}
