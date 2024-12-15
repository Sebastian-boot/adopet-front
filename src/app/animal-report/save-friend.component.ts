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
import { ErrorHandlingService } from '../core/services/shared/error-handling.service';
import { ErrorMessagesComponent } from '../shared/components/error-messages/error-messages.component';

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
    ErrorMessagesComponent
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
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService
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
      this.router.navigate(['/dashboard']);

    } catch (error: any) {
      this.submitErrors = this.errorHandlingService.handleApiError(error);
      this.errorHandlingService.showErrorToast('Error al crear el reporte');
    }
  }
}
