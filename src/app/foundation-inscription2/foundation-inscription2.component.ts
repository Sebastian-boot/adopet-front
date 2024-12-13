import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {
  LegalRepresentative,
  Location,
} from '../Interfaces/FormInscriptionData';
import { FormDataService } from '../core/services/foundations-register/form-data.service';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-foundation-inscription2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleMapsModule],
  templateUrl: './foundation-inscription2.component.html',
  styleUrls: ['./foundation-inscription2.component.css'],
})
export class FoundationInscription2Component implements OnInit {
  form!: FormGroup;
  formData!: LegalRepresentative;
  formLocationData!: Location;
  center = { lat: 4.8096863519342135, lng: -74.35400356403468 };
  zoom = 4;
  selectedLocation: google.maps.LatLngLiteral | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.getLegalFormData();
    this.formLocationData = this.formDataService.getLocationData();
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
      phoneNumber: [this.formData?.phoneNumber || '', [Validators.required]],
      email: [
        this.formData?.email || '',
        [Validators.required, Validators.email],
      ],
      city: [this.formLocationData?.city || '', [Validators.required]],
      address: [this.formLocationData?.address || '', [Validators.required]],
      postalCode: [this.formLocationData?.postalCode, [Validators.required]],
    });
  }

  onSubmit(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = {
        ...this.form.value,
        personalId: String(this.form.get('personalId')?.value),
        phoneNumber: String(this.form.get('phoneNumber')?.value),
      } as LegalRepresentative;
      this.formLocationData = {
        latitude: String(this.selectedLocation?.lat || 0),
        longitude: String(this.selectedLocation?.lng || 0),
        address: this.form.get('address')?.value || '',
        city: this.form.get('city')?.value || '',
        postalCode: this.form.get('postalCode')?.value || '',
      };
      this.formDataService.setLegalFormData(this.formData);
      this.formDataService.setLocationData(this.formLocationData);
      this.router.navigate(['/form-signup-foundation3']);
      console.log('Form Submitted', this.form.value);
      console.log('Location', this.formLocationData);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/form-signup-foundation1']);
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

  onMapClick(event: google.maps.MapMouseEvent) {
    this.selectedLocation = event.latLng?.toJSON() || null;
    console.log('Selected Location', this.selectedLocation);
  }
}
