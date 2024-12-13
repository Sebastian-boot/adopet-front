import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Location, Report } from '../../../core/models/form-report/report';
import { LocationPickerComponent } from '../location-picker/location-picker.component';

@Component({
  selector: 'app-location-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleMapsModule, LocationPickerComponent],
  templateUrl: './location-information.component.html',
  styleUrls: ['./location-information.component.css'],
})
export class LocationInformationComponent {
  @Input() formData!: Report;
  @Output() locationSelect = new EventEmitter<Location>();

  onLocationSelect(location: Location): void {
    this.locationSelect.emit(location);
  }
}
