import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { EmployeeService, Employee } from '../../employee/services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepartmentService } from '../../department/department.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, NgSelectModule]
})
export class TaskCreateComponent implements OnInit {
  task: Partial<Task> = {};
  departments: any[] = [];
  projects = [
    { name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }, { name: 'Delta' }, { name: 'Omega' }
  ];
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentService.getDepartments().subscribe(deps => {
      this.departments = deps;
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(emps => {
      this.employees = emps;
      this.filteredEmployees = emps;
    });
  }

  onDepartmentChange() {
    this.filterEmployees();
  }

  onProjectChange() {
    this.filterEmployees();
  }

  filterEmployees() {
    this.filteredEmployees = this.employees.filter(e =>
      (!this.task.department || e.department === this.task.department) &&
      (!this.task.project || e.project === this.task.project)
    );
  }

  onSubmit() {
    if (this.task.title && this.task.description && this.task.department && this.task.project && this.task.assignedEmployeeId) {
      this.taskService.addTask(this.task as Task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
