import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private API_URL = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) {}

  uploadFile(file: File, caption: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    return this.http.post<any>(`${this.API_URL}/upload`, formData);
  }

  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/all`);
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
