import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { RegistrationFormData } from '../Interfaces/FormInscriptionData';
import { MailAlertModalComponent } from '../modals/mail-alert-modal/mail-alert-modal.component';
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
  ], // Add ReactiveFormsModule here
})
export class FormInscriptionComponent implements OnInit {
  logoUrl = '/assets/images/Animales.png';
  form!: FormGroup;
  showModal: boolean = false;
  formData!: RegistrationFormData;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/\S+/)]],
      surname: ['', [Validators.required, Validators.pattern(/\S+/)]],
      dni: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(/\S+/)]],
      username: ['', [Validators.required, Validators.pattern(/\S+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required, this.matchPassword.bind(this)]],
      terms_conditions: [false, [Validators.requiredTrue]],
      prefix: ['57', Validators.required],
    });
  }

  matchPassword(control: FormControl): ValidationErrors | null {
    if (this.form && control.value !== this.form.controls['password'].value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = this.form.value as RegistrationFormData;
      this.showModal = true;
      console.log('Fomr Submitted', this.form.value);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }

    /*if (this.form.valid) {
      const formData: RegistrationFormData = {
        name: this.form.value.name,
        surname: this.form.value.surname,
        dni: this.form.value.dni,
        birth_date: this.form.value.birth_date,
        phone: this.form.value.phone,
        address: this.form.value.address,
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        prefix: this.form.value.prefix,
      };
      console.log('Success:', this.form.value);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      console.log('Form not valid');
    }*/
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'This field is required';
      } else if (control.errors['email']) {
        return 'Invalid email';
      } else if (control.errors['pattern']) {
        return 'Invalid format';
      } else if (control.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }

  onSubmitFailed(errorInfo: any): void {
    console.log('Failed:', errorInfo);
  }
}
