import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  standalone: false,
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Input() userRole: string | null = null; // Avoid changing userRole here
}
