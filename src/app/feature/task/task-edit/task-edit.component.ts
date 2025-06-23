import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { EmployeeService, Employee } from '../../employee/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, NgSelectModule]
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;
  departments = [
    { name: 'PHP' }, { name: 'Js' }, { name: 'Dotnet' }, { name: 'Design' }, { name: 'Mobile' }
  ];
  projects = [
    { name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }, { name: 'Delta' }, { name: 'Omega' }
  ];
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id).subscribe(task => {
      this.task = task;
      this.filterEmployees();
    });
    this.employeeService.getEmployees().subscribe(emps => {
      this.employees = emps;
      this.filterEmployees();
    });
  }

  onDepartmentChange() {
    this.filterEmployees();
  }

  onProjectChange() {
    this.filterEmployees();
  }

  filterEmployees() {
    if (!this.task) return;
    this.filteredEmployees = this.employees.filter(e =>
      (!this.task?.department || e.department === this.task.department) &&
      (!this.task?.project || e.project === this.task.project)
    );
  }

  onSubmit() {
    if (this.task) {
      this.taskService.updateTask(this.task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
