import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private departments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' }
  ];
  private departments$ = new BehaviorSubject<Department[]>(this.departments);

  getDepartments(): Observable<Department[]> {
    return this.departments$.asObservable();
  }

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(dep => dep.id === id);
  }

  addDepartment(department: Department) {
    department.id = this.getNextId();
    this.departments.push(department);
    this.departments$.next(this.departments);
  }

  updateDepartment(department: Department) {
    const idx = this.departments.findIndex(dep => dep.id === department.id);
    if (idx > -1) {
      this.departments[idx] = department;
      this.departments$.next(this.departments);
    }
  }

  deleteDepartment(id: number) {
    this.departments = this.departments.filter(dep => dep.id !== id);
    this.departments$.next(this.departments);
  }

  private getNextId(): number {
    return this.departments.length ? Math.max(...this.departments.map(d => d.id)) + 1 : 1;
  }
}
