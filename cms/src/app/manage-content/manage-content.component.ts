import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../manage-content/file.service';

@Component({
  selector: 'app-manage-content',
  standalone: false,
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.css']
})
export class ManageContentComponent implements OnInit {
  files: any[] = [];
  selectedFile: any = null;

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.fileService.getAllFiles().subscribe(
      data => this.files = data,
      error => console.log('Error fetching files', error)
    );
  }

  deleteFile(id: number): void {
    this.fileService.deleteFile(id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.loadFiles(); // Reload the content list after deletion
      },
      error => console.log('Error deleting file', error)
    );
  }

  getMediaUrl(file: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
  }

  isImage(file: any): boolean {
    return file.fileType.startsWith('image/');
  }

  isVideo(file: any): boolean {
    return file.fileType.startsWith('video/');
  }

  openModal(file: any): void {
    this.selectedFile = file;
  }

  closeModal(): void {
    this.selectedFile = null;
  }
}
