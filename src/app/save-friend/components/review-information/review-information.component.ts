import { Component, Input } from '@angular/core';
import { Report } from '../../../core/models/form-report/report';
import { CommonModule } from '@angular/common';
import { CardTitleComponent } from '../../../shared/components/card-title/card-title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PreviewImagesComponent } from '../preview-images/preview-images.component';

@Component({
  selector: 'app-review-information',
  templateUrl: './review-information.component.html',
  standalone: true,
  imports: [CommonModule, CardTitleComponent, ReactiveFormsModule, PreviewImagesComponent],
  styleUrls: ['./review-information.component.scss']
})
export class ReviewInformationComponent {
  @Input() formData!: Report;

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
