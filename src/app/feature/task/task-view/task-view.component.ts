import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { EmployeeService, Employee } from '../../employee/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class TaskViewComponent implements OnInit {
  task: Task | undefined;
  employees: Employee[] = [];
  sourceModule: 'task' | 'project' = 'task';

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      if (params['source'] === 'project') {
        this.sourceModule = 'project';
      }
    });
    this.taskService.getTask(id).subscribe(task => this.task = task);
    this.employeeService.getEmployees().subscribe(emps => this.employees = emps);
  }

  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? emp.name : '-';
  }

  goBack() {
    if (this.sourceModule === 'project') {
      this.router.navigate(['/project/list']);
    } else {
      this.router.navigate(['/tasks']);
    }
  }
}
