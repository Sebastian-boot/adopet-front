import { Component, Input } from '@angular/core';
import { UserRegistrationFormData } from '../../../../Interfaces/FormInscriptionData';
import { CommonModule } from '@angular/common';
import { CardTitleComponent } from '../../../../shared/components/card-title/card-title.component';

@Component({
  selector: 'app-review-information',
  standalone: true,
  imports: [CommonModule, CardTitleComponent],
  templateUrl: './review-information.component.html',
  styleUrl: './review-information.component.css'
})
export class ReviewInformationComponent {
  @Input() formData!: UserRegistrationFormData;

}
