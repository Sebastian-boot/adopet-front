import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initialFormData } from './constants/initial-form-data';
import { Report } from '../core/models/form-report/report';
import { AnimalReportsService } from '../core/services/animal-reports/animal-reports.service';
import { AnimalInformationComponent } from "./components/animal-information/animal-information.component";
import { ReviewInformationComponent } from './components/review-information/review-information.component';
import { LocationInformationComponent } from './components/location-information/location-information.component';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { ReportInformationComponent } from './components/report-information/report-information.component';
import { NavigationControlsComponent } from './components/navigation-controls/navigation-controls.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-save-friend',
  standalone: true,
  imports: [
    CommonModule,
    ReportInformationComponent,
    AnimalInformationComponent,
    LocationInformationComponent,
    ReviewInformationComponent,
    StepIndicatorComponent,
    NavigationControlsComponent,
    FormsModule,
  ],
  templateUrl: './save-friend.component.html',
  styleUrl: './save-friend.component.css',
})
export class SaveFriendComponent implements OnInit {
  currentUser$: Observable<any>;
  currentStep = 1;
  formData: Report = initialFormData;
  errors: string[] = [];
  submitErrors: string[] = [];

  constructor(
    private reportService: AnimalReportsService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$;

    this.currentUser$.subscribe(user => {
      this.formData = {
        ...initialFormData,
        reporter: {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isAnonymous: false
        }
      };
    });
  }

  ngOnInit(): void {}

  handleChange(event: any): void {
    const { name, value, type } = event.target;
    const finalValue = type === 'checkbox' ? event.target.checked : value;

    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof Report, string];
      (this.formData[parent] as any)[child] = finalValue;
    } else {
      (this.formData as any)[name] = finalValue;
    }
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    this.errors = [];
    return true;
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.submitErrors = [];
    try {
      await this.reportService.createReport(this.formData).toPromise();
      alert('¡Reporte creado exitosamente!');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.submitErrors = [error.message];
      alert('Error al crear el reporte');
    }
  }

  handleAddAnimal(): void {
    this.formData.animals.push({
      name: '',
      specie: '',
      breed: '',
      gender: '',
      age: undefined,
      weight: undefined,
      coatColor: '',
      description: '',
      image: ''
    });
  }

  handleRemoveAnimal(index: number): void {
    this.formData.animals.splice(index, 1);
  }

  handleAnimalChange({ index, event }: { index: number, event: Event }): void {
    const { name, value } = event.target as HTMLInputElement;
    this.formData.animals[index] = {
      ...this.formData.animals[index],
      [name]: value
    };
  }

  handleAnimalImageUpload({ index, urls }: { index: number, urls: string[] }): void {
    this.formData.animals[index] = {
      ...this.formData.animals[index],
      image: urls[0] // Asumiendo que solo manejamos una imagen
    };
  }
}
