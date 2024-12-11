import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: any;
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const userId = 15; // Replace this with the actual logged-in user's ID or fetch it dynamically
    this.http.get<any>(`${this.baseUrl}/${userId}`).subscribe(
      data => {
        this.userProfile = data;
        this.profileForm.patchValue(this.userProfile);
      },
      error => console.error('Error loading profile', error)
    );
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const userId = 15; // Replace this with the actual logged-in user's ID or fetch it dynamically
      this.http.put(`${this.baseUrl}/${userId}`, this.profileForm.value).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          alert('Profile updated successfully!');
        },
        error => console.error('Error updating profile', error)
      );
    }
  }
}
