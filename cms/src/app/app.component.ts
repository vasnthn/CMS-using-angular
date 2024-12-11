import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showUserHeader = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      console.log('Logged in status:', loggedIn);
      console.log('User role:', this.authService.role);
      this.showUserHeader = loggedIn && this.authService.role === 'USER';
    });
  }
}
