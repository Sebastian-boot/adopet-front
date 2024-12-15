import { Component } from '@angular/core';
import {
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRegistrationFormData } from '../../Interfaces/FormInscriptionData';
import { initialFormData } from '../constants/initial-form-data';
import { UsersRegisterService } from '../../core/services/auth/users-register.service';
import { Router } from '@angular/router';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { FoundationInformationComponent } from './components/foundation-information/foundation-information.component';
import { ReviewInformationComponent } from './components/review-information/review-information.component';
import { LegalRepresentativeInformationComponent } from './components/legal-representative-information/legal-representative-information.component';
import { NavigationControlsComponent } from '../../animal-report/components/navigation-controls/navigation-controls.component';
import { firstValueFrom } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../shared/components/success-modal/success-modal.component';
import { ErrorMessagesComponent } from '../../shared/components/error-messages/error-messages.component';
import { ErrorHandlingService } from '../../core/services/shared/error-handling.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserInformationComponent,
    FoundationInformationComponent,
    ReviewInformationComponent,
    LegalRepresentativeInformationComponent,
    NavigationControlsComponent,
    ErrorMessagesComponent,
  ],
})
export class SignupComponent {
  currentStep = 1;
  formData: UserRegistrationFormData = initialFormData;
  errors: string[] = [];
  submitErrors: string[] = [];

  constructor(
    private usersRegisterService: UsersRegisterService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService,
    private dialog: MatDialog
  ) {}

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    this.errors = [];
    return true;
  }

  async mediatorSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitErrors = [];
    if (this.currentStep === 1) {
      await this.handleSubmit(event);
    } else if (this.currentStep === 4 && this.formData.foundation) {
      await this.handleFoundationSubmit(event);
    }
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitErrors = [];

    try {
      await this.usersRegisterService.registerUser(this.formData).toPromise();

      this.showSuccessDialog();
    } catch (error: any) {
      this.submitErrors = this.errorHandlingService.handleApiError(error);
      this.errorHandlingService.showErrorToast('Error al crear el usuario');
    }
  }

  async handleFoundationSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitErrors = [];
    try {
      const foundation = await firstValueFrom(this.usersRegisterService.registerFoundation(this.formData.foundation));
      if (foundation) {
        this.usersRegisterService.registerUser(this.formData, foundation.id).subscribe({
          next: () => {
            this.showSuccessDialog();
          },
          error: (error) => {
            this.submitErrors = this.errorHandlingService.handleApiError(error);
          }
        });
      }
    } catch (error: any) {
      this.submitErrors = this.errorHandlingService.handleApiError(error);
      this.errorHandlingService.showErrorToast('Error al crear el usuario');
    }
  }

  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      width: '400px',
      data: {
        message: 'Se ha enviado un correo de verificación a tu dirección de email.'
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
