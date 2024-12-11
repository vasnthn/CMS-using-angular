import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(isLoggedIn => {
        if (isLoggedIn && this.authService.isAdmin()) {
          return true;
        } else {
          console.log('Access denied - Admins only');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
