import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-information-animal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-information-animal-modal.component.html',
  styleUrl: './more-information-animal-modal.component.css',
})
export class MoreInformationAnimalModalComponent {
  @Input() isOpen: boolean = false;
  @Input() report: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
