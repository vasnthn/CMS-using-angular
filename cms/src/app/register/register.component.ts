import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ensure the correct path to your AuthService

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const user = { 
      firstName: this.firstName, 
      lastName: this.lastName, 
      email: this.email, 
      password: this.password 
    };
    this.authService.register(user).subscribe((response: any) => {
      if (response && response.message === 'User registered successfully!') {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      } else {
        alert('Registration failed!');
      }
    });
  }
}
