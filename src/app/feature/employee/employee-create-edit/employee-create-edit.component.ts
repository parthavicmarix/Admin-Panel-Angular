import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../../department/department.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-employee-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, NgSelectModule],
  templateUrl: './employee-create-edit.component.html',
  styleUrls: ['./employee-create-edit.component.scss']
})
export class EmployeeCreateEditComponent implements OnInit {
  employee: Partial<Employee> = {};
  departments: any[] = [];
  projects = [
    { name: 'Alpha' },
    { name: 'Beta' },
    { name: 'Gamma' },
    { name: 'Delta' },
    { name: 'Omega' }
  ];
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    public router: Router // changed from private to public
  ) {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.employeeService.getEmployee(Number(id)).subscribe(emp => {
        if (emp) this.employee = { ...emp };
      });
    }
  }

  save() {
    if (this.employee.name && this.employee.email && this.employee.position) {
      if (this.editMode && this.employee.id) {
        this.employeeService.updateEmployee(this.employee as Employee).subscribe(() => {
          this.router.navigate(['/employee/list']);
        });
      } else {
        this.employeeService.addEmployee(this.employee as Employee).subscribe(() => {
          this.router.navigate(['/employee/list']);
        });
      }
    }
  }
}
