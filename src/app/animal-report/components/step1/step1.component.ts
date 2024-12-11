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
import { AnimalReportData, animal } from '../../../Interfaces/AnimalReportData';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;
  formData!: animal;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private animalReportDataService: AnimalReportDataService
  ) {}

  ngOnInit(): void {
    const reportData = this.animalReportDataService.getReportData();
    this.form = this.fb.group({
      name: [reportData.animals.name, Validators.required],
      image: [reportData.animals.image],
      description: [reportData.animals.description, Validators.required],
      age: [reportData.animals.age, Validators.required],
      coatColor: [reportData.animals.coatColor, Validators.required],
      specie: [reportData.animals.specie, Validators.required],
      race: [reportData.animals.race, Validators.required],
      weight: [reportData.animals.weight, Validators.required],
      gender: [reportData.animals.gender, Validators.required],
    });
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

  onSubmit(event: Event): void {
    if (this.form.valid) {
      this.animalReportDataService.setReportData(this.form.value);
      console.log(this.form.value);
      this.router.navigate(['/form-report/steptwo']);
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
}
