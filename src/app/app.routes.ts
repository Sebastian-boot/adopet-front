import { Routes } from '@angular/router';
import { AnimalReportComponent } from './animal-report/animal-report.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';
import { FoundationInscription2Component } from './foundation-inscription2/foundation-inscription2.component';
import { FoundationInscription3Component } from './foundation-inscription3/foundation-inscription3.component';
import { LoginComponent } from './auth/login/login.component';
import { Step1Component } from './animal-report/components/step1/step1.component';
import { Step2Component } from './animal-report/components/step2/step2.component';
import { Step3Component } from './animal-report/components/step3/step3.component';
import { FoundationsAdopetComponent } from './users/dashboard/foundations-adopet/foundations-adopet.component';
import { AnimalsReportsComponent } from './FoundationDashboard/animals-reports/animals-reports.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'animal-report', component: AnimalReportComponent },
  { path: 'form-signup', component: FormInscriptionComponent },
  {
    path: 'form-signup-foundation1',
    component: FoundationInscriptionComponent,
  },
  {
    path: 'form-signup-foundation2',
    component: FoundationInscription2Component,
  },
  {
    path: 'form-signup-foundation3',
    component: FoundationInscription3Component,
  },
  {
    path: 'form-report',
    component: AnimalReportComponent,
    children: [
      {
        path: 'stepone',
        component: Step1Component,
      },
      {
        path: 'steptwo',
        component: Step2Component,
      },
      {
        path: 'stepthree',
        component: Step3Component,
      },
    ],
  },
  {
    path: 'users-main',
    component: FoundationsAdopetComponent,
  },
  {
    path: 'foundations-main',
    component: AnimalsReportsComponent,
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
