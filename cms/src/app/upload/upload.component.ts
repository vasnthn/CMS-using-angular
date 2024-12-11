import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  selectedFile: File | null = null;
  caption: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile && this.caption) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('caption', this.caption);

      this.http.post('http://localhost:8080/api/files/upload', formData).subscribe(
        response => {
          console.log('Upload successful:', response);
          alert('File uploaded successfully!');
          this.router.navigate(['/view-content']); // Redirect to view-content page
        },
        error => {
          console.error('Error uploading file:', error);
          alert('An error occurred while uploading the file.');
        }
      );
    } else {
      alert('Please select a file and enter a caption.');
    }
  }
}
