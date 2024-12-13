import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RegistrationFormData } from '../Interfaces/FormInscriptionData';
import { MailAlertModalComponent } from '../modals/mail-alert-modal/mail-alert-modal.component';
import { FormDataService } from '../core/services/form-data.service';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MailAlertModalComponent,
  ],
})
export class FormInscriptionComponent implements OnInit {
  logoUrl = '/assets/images/Animales.png';
  form!: FormGroup;
  showModal: boolean = false;
  formData!: RegistrationFormData;
  registrationError: string | null = null;
  validationErrors: { [key: string]: string[] } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getFormData();
    this.form = this.fb.group({
      name: [
        this.formData?.name || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      lastName: [
        this.formData?.lastName || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      personalId: [this.formData?.personalId || '', [Validators.required]],
      birthDate: [
        this.formData?.birthDate || '',
        [Validators.required, this.ageValidator(18)],
      ],
      phoneNumber: [this.formData?.phoneNumber || '', [Validators.required]],
      address: [
        this.formData?.address || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      username: [
        this.formData?.username || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      email: [
        this.formData?.email || '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      confirm: ['', [Validators.required, this.matchPassword.bind(this)]],
      terms_conditions: [
        this.formData?.terms_conditions || false,
        [Validators.requiredTrue],
      ],
      prefix: [this.formData?.prefix || '57', Validators.required],
    });
  }

  matchPassword(control: FormControl): ValidationErrors | null {
    if (this.form && control.value !== this.form.controls['password'].value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  ageValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (
        age > minAge ||
        (age === minAge && monthDiff > 0) ||
        (age === minAge && monthDiff === 0 && dayDiff >= 0)
      ) {
        return null;
      } else {
        return { ageInvalid: true };
      }
    };
  }

  onSubmit(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = this.form.value as RegistrationFormData;
      this.formDataService.setFormData(this.formData);

      // Create a new object with only the required fields
      const registrationData = {
        name: this.formData.name,
        lastName: this.formData.lastName,
        personalId: String(this.formData.personalId), // Ensure personalId is a string
        birthDate: this.formData.birthDate,
        address: this.formData.address,
        phoneNumber: this.formData.phoneNumber,
        email: this.formData.email,
        username: this.formData.username,
        password: this.formData.password,
      };

      console.log('Form Submitted', registrationData);
      /*this.authService.register(registrationData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.showModal = true;
        },
        (error) => {
          console.error('Registration failed', error);
          this.registrationError =
            error.error.title || 'Registration failed. Please try again.';
          this.validationErrors = error.error.errors || {};
        }
      );*/
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  onSubmitFoundation(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = this.form.value as RegistrationFormData;
      this.formDataService.setFormData(this.formData);
      this.router.navigate(['/form-signup-foundation1']);
      console.log('Form Submitted', this.form.value);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['email']) {
        return 'Invalid email';
      } else if (control.errors['pattern']) {
        return 'La contraseña debe ser de minimo 8 caracteres, una mayuscula, una minuscula, un numero y un caracter especial';
      } else if (control.errors['passwordMismatch']) {
        return 'Passwords do not match';
      } else if (control.errors['ageInvalid']) {
        return 'You must be at least 18 years old';
      }
    }
    if (this.validationErrors[controlName]) {
      return this.validationErrors[controlName].join(' ');
    }
    return '';
  }

  onSubmitFailed(errorInfo: any): void {
    console.log('Failed:', errorInfo);
  }
}
