import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { EmployeeService, Employee } from '../../employee/services/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatMenuModule]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  employees: Employee[] = [];

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.employeeService.getEmployees().subscribe(emps => this.employees = emps);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? emp.name : '-';
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
}
