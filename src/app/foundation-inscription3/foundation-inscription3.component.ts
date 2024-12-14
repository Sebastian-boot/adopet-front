import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../core/services/foundations-register/form-data.service';
import {
  RegistrationFormData,
  FoundationFormData,
  LegalRepresentative,
  Location,
} from '../Interfaces/FormInscriptionData';
import { Router } from '@angular/router';
import { MailAlertModalComponent } from '../modals/mail-alert-modal/mail-alert-modal.component';
import { UsersRegisterService } from '../core/services/users/users-register.service';

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
  formLocaltionData!: Location;
  registrationError: string | null = null;

  showModal: boolean = false;

  constructor(
    private formDataService: FormDataService,
    private router: Router,
    private usersRegisterService: UsersRegisterService
  ) {}

  ngOnInit(): void {
    this.formData =
      this.formDataService.getFormData() ?? ({} as RegistrationFormData);
    this.formFoundationData =
      this.formDataService.getFoundationFormData() ??
      ({} as FoundationFormData);
    this.formLegalData =
      this.formDataService.getLegalFormData() ?? ({} as LegalRepresentative);
    this.formLocaltionData =
      this.formDataService.getLocationData() ?? ({} as Location);
    console.log('Hola! Foundation Data:', this.formFoundationData);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    this.formDataService.registerFoundation().subscribe({
      next: (foundationId) => {
        console.log('Fundación registrada exitosamente con ID:', foundationId);

        // Actualizar el foundationId en el formData
        const registrationData: RegistrationFormData = {
          ...this.formDataService.getFormData(),
          foundationId: foundationId.id,
        };

        // Llamar a la función registerUserFoundation
        this.usersRegisterService
          .registerUserFoundation(registrationData)
          .subscribe(
            () => {
              console.log('Usuario registrado exitosamente');
              this.showModal = true;
            },
            (error) => {
              console.error('Error al registrar el usuario:', error);
              this.registrationError =
                'Error al registrar el usuario. Por favor, intente nuevamente.';
            }
          );
      },
      error: (error) => {
        console.error('Error al registrar la fundación:', error);
        this.registrationError =
          'Error al registrar la fundación. Por favor, intente nuevamente.';
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/form-signup-foundation2']);
  }
}
