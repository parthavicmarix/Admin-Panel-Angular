import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return localStorage.getItem('loggedin') === 'true';
  }

  login() {
    localStorage.setItem('loggedin', 'true');
    this.loggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('loggedin');
    this.loggedInSubject.next(false);
  }
}
