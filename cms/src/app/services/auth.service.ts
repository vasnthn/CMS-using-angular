import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8080/api';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userRole: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserRole = localStorage.getItem('userRole');
      if (storedUserRole) {
        this.userRole = storedUserRole;
        this.loggedIn.next(true);
      } else {
        this.loggedIn.next(false);
        this.userRole = null;
      }
    }
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get role(): string | null {
    return this.userRole;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password }).pipe(
      map(response => {
        if (response.message === 'Login successful!') {
          this.loggedIn.next(true);
          this.userRole = response.user.role;
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('userRole', this.userRole!); // Ensure storage only in browser
          }
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error logging in:', error);
        this.loggedIn.next(false);
        this.userRole = null;
        return of(false);
      })
    );
  }

  register(user: any): Observable<any> {
    if (!user.role) {
      user.role = 'USER'; // Set default role if not provided
    }
    return this.http.post<any>(`${this.API_URL}/register`, user).pipe(
      tap(response => console.log('Register response from server:', response)),
      catchError(error => {
        console.error('Error registering user:', error);
        return of(null);
      })
    );
  }
  

  logout(): void {
    this.loggedIn.next(false);
    this.userRole = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear(); // Clear storage only in browser
    }
    this.router.navigate(['']);
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }
}
