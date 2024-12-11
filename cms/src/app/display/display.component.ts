import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from '../display/file.service';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  files: any[] = [];
  selectedFile: any = null;

  constructor(private fileService: FileService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.fileService.getFiles().subscribe(
      data => this.files = data,
      error => console.log('Error fetching files', error)
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

  deleteFile(id: number): void {
    this.fileService.deleteFile(id).subscribe(
      response => {
        console.log('Delete successful:', response);
        this.loadContent(); // Reload the content list after deletion
      },
      error => console.log('Error deleting file', error)
    );
  }

  loadContent(): void {
    this.fileService.getFiles().subscribe(
      data => this.files = data,
      error => console.log('Error fetching files', error)
    );
  }

  openModal(file: any): void {
    this.selectedFile = file;
  }

  closeModal(): void {
    this.selectedFile = null;
  }
}
