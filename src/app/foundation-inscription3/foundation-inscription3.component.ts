import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../core/services/form-data.service';
import {
  RegistrationFormData,
  FoundationFormData,
  LegalRepresentative,
} from '../Interfaces/FormInscriptionData';
import { Router } from '@angular/router';
import { MailAlertModalComponent } from '../modals/mail-alert-modal/mail-alert-modal.component';

@Component({
  selector: 'app-foundation-inscription3',
  standalone: true,
  imports: [MailAlertModalComponent],
  templateUrl: './foundation-inscription3.component.html',
  styleUrl: './foundation-inscription3.component.css',
})
export class FoundationInscription3Component implements OnInit {
  formData!: RegistrationFormData;
  formFoundationData!: FoundationFormData;
  formLegalData!: LegalRepresentative;

  showModal: boolean = false;

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();
    //this.formFoundationData = this.formDataService.getFoundationFormData();
    this.formLegalData = this.formDataService.getLegalFormData();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.showModal = true;
    console.log('Form Submitted', this.formFoundationData);
  }

  onBack(): void {
    this.router.navigate(['/form-signup-foundation2']);
  }
}
