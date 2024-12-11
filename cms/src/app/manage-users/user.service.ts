import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
