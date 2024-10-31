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

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
})
export class FormInscriptionComponent implements OnInit {
  logoUrl = '/assets/images/Animales.png';
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Success:', this.form.value);
    } else {
      console.log('Form not valid');
    }
  }

  onSubmitFailed(errorInfo: any): void {
    console.log('Failed:', errorInfo);
  }
}
