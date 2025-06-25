import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private accounts: Account[] = [
    { id: 1, name: 'Main Account', type: 'Savings', amount: 1000, department: 'PHP' },
    { id: 2, name: 'Savings', type: 'Current', amount: 500, department: 'Js' }
  ];
  private accounts$ = new BehaviorSubject<Account[]>(this.accounts);

  getAccounts(): Observable<Account[]> {
    return this.accounts$.asObservable();
  }

  getAccount(id: number): Account | undefined {
    return this.accounts.find(a => a.id === id);
  }

  addAccount(account: Account) {
    account.id = this.getNextId();
    this.accounts.push(account);
    this.accounts$.next(this.accounts);
  }

  updateAccount(account: Account) {
    const idx = this.accounts.findIndex(a => a.id === account.id);
    if (idx > -1) {
      this.accounts[idx] = { ...account };
      this.accounts$.next(this.accounts);
    }
  }

  deleteAccount(id: number) {
    this.accounts = this.accounts.filter(a => a.id !== id);
    this.accounts$.next(this.accounts);
  }

  private getNextId(): number {
    return this.accounts.length ? Math.max(...this.accounts.map(a => a.id)) + 1 : 1;
  }
}
