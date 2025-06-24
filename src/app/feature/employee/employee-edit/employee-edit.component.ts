import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepartmentService } from '../../department/department.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, NgSelectModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee | undefined;
  departments: any[] = [];
  projects = [
    { name: 'Alpha' },
    { name: 'Beta' },
    { name: 'Gamma' },
    { name: 'Delta' },
    { name: 'Omega' }
  ];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(id).subscribe(emp => this.employee = emp);
  }

  save() {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employee/list']);
      });
    }
  }
}
