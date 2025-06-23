import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { first } from 'rxjs';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgSelectModule, RouterModule, RouterLink]
})
export class EmployeeCreateComponent {
  employee: Partial<Employee> = {};
  departments = [
    { name: 'PHP' },
    { name: 'Js' },
    { name: 'Dotnet' },
    { name: 'Design' },
    { name: 'Mobile' }
  ];
  projects = [
    { name: 'Alpha' },
    { name: 'Beta' },
    { name: 'Gamma' },
    { name: 'Delta' },
    { name: 'Omega' }
  ];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  save() {
    if (this.employee.name && this.employee.email && this.employee.position) {
      console.log('Saving employee:', this.employee);
      this.employeeService.addEmployee(this.employee as Employee)
        .pipe(first())
        .subscribe({
          next: () => {
            console.log('Employee saved, navigating to list');
            this.router.navigate(['/employee/list']);
          },
          error: (err) => {
            console.error('Error saving employee:', err);
          }
        });
    }
  }
}
