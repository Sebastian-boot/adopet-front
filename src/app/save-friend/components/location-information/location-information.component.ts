import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Location, Report } from '../../../core/models/form-report/report';
import { LocationPickerComponent } from '../location-picker/location-picker.component';
import { CardTitleComponent } from '../../../shared/components/card-title/card-title.component';

@Component({
  selector: 'app-location-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleMapsModule, LocationPickerComponent, CardTitleComponent],
  templateUrl: './location-information.component.html',
  styleUrls: ['./location-information.component.css'],
})
export class LocationInformationComponent {
  @Input() formData!: Report;
  @Output() formChange = new EventEmitter<Report>();

  onLocationSelect(location: Location): void {
    this.formData.location = location;
    this.formChange.emit(this.formData);
  }
}
