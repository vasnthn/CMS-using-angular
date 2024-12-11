import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout(); // Call logout method
    this.router.navigate(['/']); // Redirect to home page
  }
}
