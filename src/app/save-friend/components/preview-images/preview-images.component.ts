import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-preview-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-images.component.html',
  styleUrl: './preview-images.component.css'
})
export class PreviewImagesComponent {
  @Input() images: string[] = [];
  @Input() isRemovable: boolean = true;
  @Output() remove = new EventEmitter<number>();

  removeImage(index: number): void {
    this.remove.emit(index);
  }
}
