import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  department: string;
  project: string;
  assignedEmployeeId: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = [
    // Example task
    { id: 1, title: 'Design Homepage', description: 'Create homepage design', department: 'Design', project: 'Beta', assignedEmployeeId: 2 }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTask(id: number): Observable<Task | undefined> {
    return of(this.tasks.find(task => task.id === id));
  }

  addTask(task: Task): Observable<void> {
    this.tasks.push({ ...task, id: Date.now() });
    return of(void 0);
  }

  updateTask(task: Task): Observable<void> {
    const idx = this.tasks.findIndex(t => t.id === task.id);
    if (idx > -1) this.tasks[idx] = task;
    return of(void 0);
  }

  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(void 0);
  }

  getTasksByEmployee(employeeId: number): Observable<Task[]> {
    return of(this.tasks.filter(t => t.assignedEmployeeId === employeeId));
  }

  getTasksByProject(projectName: string): Observable<Task[]> {
    return of(this.tasks.filter(t => t.project === projectName));
  }
}
