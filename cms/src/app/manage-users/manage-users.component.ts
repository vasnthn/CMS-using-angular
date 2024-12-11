import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  editingUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        // Filter out the admin user based on a unique identifier (e.g., email or role)
        this.users = data.filter(user => user.role !== 'ADMIN');
      },
      error => console.error('Error loading users', error)
    );
  }

  editUser(user: any): void {
    this.editingUser = { ...user }; // Create a copy of the user to edit
  }

  saveUser(): void {
    if (this.editingUser) {
      this.userService.updateUser(this.editingUser).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.loadUsers(); // Reload users after save
          this.cancelEdit(); // Clear the editing form
        },
        error => console.error('Error updating user', error)
      );
    }
  }

  cancelEdit(): void {
    this.editingUser = null; // Clear the editing form
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      response => {
        console.log('User deleted successfully', response);
        this.loadUsers(); // Reload users after delete
      },
      error => console.error('Error deleting user', error)
    );
  }
}
