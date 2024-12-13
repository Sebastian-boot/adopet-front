import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FoundationFormData,
  LegalRepresentative,
} from '../Interfaces/FormInscriptionData';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../core/services/foundations-register/form-data.service';

@Component({
  selector: 'app-foundation-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './foundation-inscription.component.html',
  styleUrls: ['./foundation-inscription.component.css'],
})
export class FoundationInscriptionComponent implements OnInit {
  form!: FormGroup;
  formData!: FoundationFormData;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getFoundationFormData() || {
      name: '',
      legalName: '',
      nit: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      description: '',
      mission: '',
      vision: '',
      logo: '',
      location: {
        latitude: '0',
        longitude: '0',
        address: '',
        city: '',
        postalCode: '',
      },
      legalRepresentatives: {
        name: '',
        lastName: '',
        personalId: '',
        email: '',
        phoneNumber: '',
        address: '',
      },
    };
    this.form = this.fb.group({
      name: [
        this.formData?.name || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      legalName: [
        this.formData?.legalName || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      nit: [this.formData?.nit || '', [Validators.required]],
      email: [
        this.formData?.email || '',
        [Validators.required, Validators.email],
      ],
      phone: [this.formData?.phone || '', [Validators.required]],
      website: [this.formData?.website || '', [Validators.required]],
      description: [
        this.formData?.description || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      mission: [
        this.formData?.mission || '',
        [Validators.required, Validators.pattern(/\S+/)],
      ],
      vision: [this.formData?.vision || '', [Validators.required]],
      logo: [this.formData?.logo || '', [Validators.required]],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        console.log('reader.result: ', reader.result),
          this.form.patchValue({
            logo: reader.result as string,
          });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(event: Event): void {
    console.log('entering here: ', this.formData, this.form);
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = this.form.value as FoundationFormData;
      this.formDataService.setFoundationFormData(this.formData);
      console.log('Form Submitted', this.form.value);
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
      }
    }
    return '';
  }

  onBack(): void {
    this.router.navigate(['/form-signup']);
  }

  onSubmitFailed(errorInfo: any): void {
    console.log('Failed:', errorInfo);
  }
}
