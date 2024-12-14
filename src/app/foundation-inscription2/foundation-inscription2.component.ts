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
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../environments/environment';

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

  private map!: google.maps.Map;
  private marker!: google.maps.Marker;

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
    this.form.get('city')?.disable();
    this.form.get('address')?.disable();
    this.form.get('postalCode')?.disable();
  }

  onSubmit(event: Event): void {
    event?.preventDefault();
    if (this.form.valid) {
      this.formData = {
        ...this.form.value,
        personalId: String(this.form.get('personalId')?.value),
        phoneNumber: String(this.form.get('phoneNumber')?.value),
        address: this.formLocationData.address,
      } as LegalRepresentative;
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

  async ngAfterViewInit(): Promise<void> {
    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      libraries: ['places'],
      version: 'weekly',
      region: 'ES',
      language: 'es',
    });

    try {
      await loader.load();
      this.initializeMap();
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  }

  private initializeMap(): void {
    const defaultPosition = { lat: 0, lng: 0 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        defaultPosition.lat = position.coords.latitude;
        defaultPosition.lng = position.coords.longitude;
        this.updateMap(defaultPosition);
      },
      () => this.updateMap(defaultPosition)
    );
  }

  private updateMap(position: google.maps.LatLngLiteral): void {
    const latLng = new google.maps.LatLng(position.lat, position.lng);
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: position,
        zoom: 13,
      }
    );

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      draggable: true,
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.updateMarker(event.latLng);
      }
    });

    this.marker.addListener('dragend', () => {
      const position = this.marker.getPosition();
      if (position) {
        this.emitLocation(position);
      }
    });

    this.emitLocation(latLng);
  }

  private updateMarker(position: google.maps.LatLng): void {
    this.marker.setPosition(position);
    this.emitLocation(position);
  }

  private async emitLocation(position: google.maps.LatLng): Promise<void> {
    const geocoder = new google.maps.Geocoder();

    try {
      const response = await geocoder.geocode({
        location: { lat: position.lat(), lng: position.lng() },
      });

      if (response.results?.[0]) {
        const result = response.results[0];
        const address = result.formatted_address;
        const cityComponent = result.address_components.find((component) =>
          component.types.includes('locality')
        );
        const postalCodeComponent = result.address_components.find(
          (component) => component.types.includes('postal_code')
        );

        this.formLocationData = {
          latitude: position.lat().toString(),
          longitude: position.lng().toString(),
          address,
          city: cityComponent?.long_name || '',
          postalCode: postalCodeComponent?.long_name || '',
        };
        this.formDataService.setLocationData(this.formLocationData);
        console.log('Location:', this.formLocationData);
      }
    } catch (error) {
      console.error('Error en geocoding:', error);
    }
  }
}
