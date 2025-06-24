import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Management } from './management.model';

@Injectable({ providedIn: 'root' })
export class ManagementService {
  private managements: Management[] = [
    { id: 1, rule: 'Admin' },
    { id: 2, rule: 'Supervisor' }
  ];
  private managements$ = new BehaviorSubject<Management[]>(this.managements);

  getManagements(): Observable<Management[]> {
    return this.managements$.asObservable();
  }

  getManagement(id: number): Management | undefined {
    return this.managements.find(m => m.id === id);
  }

  addManagement(management: Management) {
    management.id = this.getNextId();
    this.managements.push(management);
    this.managements$.next(this.managements);
  }

  updateManagement(management: Management) {
    const idx = this.managements.findIndex(m => m.id === management.id);
    if (idx > -1) {
      this.managements[idx] = { ...management };
      this.managements$.next(this.managements);
    }
  }

  deleteManagement(id: number) {
    this.managements = this.managements.filter(m => m.id !== id);
    this.managements$.next(this.managements);
  }

  private getNextId(): number {
    return this.managements.length ? Math.max(...this.managements.map(m => m.id)) + 1 : 1;
  }
}
