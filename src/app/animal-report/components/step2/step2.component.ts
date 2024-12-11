import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalReportDataService } from '../../../core/services/animals-report-data.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleMapsModule],
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css'],
})
export class Step2Component implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private animalReportDataService: AnimalReportDataService
  ) {}

  ngOnInit(): void {
    const reportData = this.animalReportDataService.getReportData();
    this.form = this.fb.group({
      location: this.fb.group({
        latitude: [reportData.location.latitude, Validators.required],
        longitude: [reportData.location.longitude, Validators.required],
        city: [reportData.location.city, Validators.required],
        address: [reportData.location.address, Validators.required],
        postalCode: [reportData.location.postalCode, Validators.required],
      }),
      observations: [reportData.observations, Validators.required],
      abandonmentDateTime: [
        reportData.abandonmentDateTime,
        Validators.required,
      ],
      abandonmentStatus: [reportData.abandonmentStatus, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.animalReportDataService.setReportData(this.form.value);
      this.router.navigate(['/form-report/stepthree']);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach((subKey) => {
            const subControl = control.get(subKey);
            subControl?.markAsTouched();
          });
        } else {
          control?.markAsTouched();
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/form-report/stepone']);
  }
}
