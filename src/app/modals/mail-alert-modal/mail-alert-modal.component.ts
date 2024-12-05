import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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

  closeModal() {
    this.isOpen = false;
  }
}
