import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FoundationFormData } from '../Interfaces/FormInscriptionData';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../core/services/form-data.service';

@Component({
  selector: 'app-foundation-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './foundation-inscription.component.html',
  styleUrls: ['./foundation-inscription.component.css'],
})
export class FoundationInscriptionComponent implements OnInit {
  form!: FormGroup;
  formData!: FoundationFormData;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getFoundationFormData();
    this.form = this.fb.group({
      nameFoundation: [
        this.formData?.nameFoundation || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      nit: [this.formData?.nit || '', [Validators.required]],
      email: [
        this.formData?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [this.formData?.phone || '', [Validators.required]],
      website: [this.formData?.website || '', [Validators.required]],
      address: [
        this.formData?.address || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      description: [
        this.formData?.description || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      mission: [
        this.formData?.mission || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      vision: [this.formData?.vision || '', [Validators.required]],
    });
  }

  displaySelectedImage(event: Event, elementId: string): void {
    const selectedImage = document.getElementById(
      elementId
    ) as HTMLImageElement;
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target) {
          selectedImage.src = e.target.result as string;
        }
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  onSubmit(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = this.form.value as FoundationFormData;
      this.formDataService.setFoundationFormData(this.formData);
      this.router.navigate(['/form-signup-foundation2']);
      console.log('Form Submitted', this.form.value);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
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
