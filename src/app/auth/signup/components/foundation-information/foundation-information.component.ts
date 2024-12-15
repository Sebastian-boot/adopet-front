import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationFormData } from '../../../../Interfaces/FormInscriptionData';
import { ImageUploaderComponent } from '../../../../animal-report/components/image-uploader/image-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardTitleComponent } from '../../../../animal-report/components/card-title/card-title.component';

@Component({
  selector: 'app-foundation-information',
  standalone: true,
  imports: [CommonModule, ImageUploaderComponent, FormsModule, ReactiveFormsModule, CardTitleComponent],
  templateUrl: './foundation-information.component.html',
  styleUrls: ['./foundation-information.component.css'],
})
export class FoundationInformationComponent {
  @Input() formData!: UserRegistrationFormData;
  @Output() formChange = new EventEmitter<UserRegistrationFormData>();
  @Input() currentStep!: number;

  onReportImageUpload(url: string[]) {
    this.formData.foundation.logo = url[0];
    this.formChange.emit(this.formData);
  }
}
