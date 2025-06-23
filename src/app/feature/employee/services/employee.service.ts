import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  project: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', department: 'Mobile', project: 'Alpha' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', position: 'Designer', department: 'Design', project: 'Beta' }
  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployee(id: number): Observable<Employee | undefined> {
    return of(this.employees.find(emp => emp.id === id));
  }

  addEmployee(employee: Employee): Observable<void> {
    this.employees.push({ ...employee, id: Date.now() });
    return of(void 0);
  }

  updateEmployee(employee: Employee): Observable<void> {
    const idx = this.employees.findIndex(e => e.id === employee.id);
    if (idx > -1) this.employees[idx] = employee;
    return of(void 0);
  }

  deleteEmployee(id: number): Observable<void> {
    this.employees = this.employees.filter(e => e.id !== id);
    return of(void 0);
  }
}
