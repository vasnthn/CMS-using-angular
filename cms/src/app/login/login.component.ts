import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isAdmin: boolean = false; // Default role is user

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        const route = this.isAdmin ? '/admin-dashboard' : '/user-dashboard';
        this.router.navigate([route]);
      } else {
        alert('Invalid email or password!');
      }
    });
  }
}
