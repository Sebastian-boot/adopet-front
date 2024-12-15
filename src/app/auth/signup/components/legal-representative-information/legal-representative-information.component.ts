import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRegistrationFormData } from '../../../../Interfaces/FormInscriptionData';
import { LocationPickerComponent } from '../../../../animal-report/components/location-picker/location-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '../../../../core/models/form-report/report';
import { CommonModule } from '@angular/common';
import { CardTitleComponent } from '../../../../animal-report/components/card-title/card-title.component';

@Component({
  selector: 'app-legal-representative-information',
  standalone: true,
  imports: [LocationPickerComponent, FormsModule, ReactiveFormsModule, CommonModule, CardTitleComponent],
  templateUrl: './legal-representative-information.component.html',
  styleUrl: './legal-representative-information.component.css'
})
export class LegalRepresentativeInformationComponent {
  @Input() formData!: UserRegistrationFormData;
  @Output() formChange = new EventEmitter<UserRegistrationFormData>();

  onLocationSelect(location: Location): void {
    this.formData.foundation.location = location;
    this.formChange.emit(this.formData);
  }
  removeLegalRepresentative(index: number) {
    this.formData.foundation.legalRepresentatives.splice(index, 1);
    this.formChange.emit(this.formData);
  }
  addLegalRepresentative() {
    this.formData.foundation.legalRepresentatives.push({
      name: '',
      lastName: '',
      personalId: '',
      email: '',
      phoneNumber: '',
      address: '',
    });
  }
}
