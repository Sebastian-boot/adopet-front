import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mail-alert-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mail-alert-modal.component.html',
  styleUrl: './mail-alert-modal.component.css',
})
export class MailAlertModalComponent {
  @Input() isOpen: boolean = false;
  @Input() email: string = '';
  @Input() message: string = '';

  constructor(private router: Router) {}

  closeModal() {
    this.isOpen = false;
    this.router.navigate(['/login']);
  }
}
