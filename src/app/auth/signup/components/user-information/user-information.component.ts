import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRegistrationFormData } from '../../../../Interfaces/FormInscriptionData';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.css'
})
export class UserInformationComponent {
  @Input() formData!: UserRegistrationFormData;
  @Output() formChange = new EventEmitter<UserRegistrationFormData>();

   onFormChange(event: Event, field: string) {
    const target = event.target as HTMLInputElement;
    this.formData[field as keyof UserRegistrationFormData] = target.value;
    this.formChange.emit(this.formData);
  }
}
