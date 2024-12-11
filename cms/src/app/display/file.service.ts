import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, caption: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }
  deleteFile(id: number): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/${id}`); 
}
}
