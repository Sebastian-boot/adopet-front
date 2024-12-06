import { Routes } from '@angular/router';
import { AnimalReportComponent } from './animal-report/animal-report.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';
import { FoundationInscription2Component } from './foundation-inscription2/foundation-inscription2.component';
import { FoundationInscription3Component } from './foundation-inscription3/foundation-inscription3.component';
import { LoginComponent } from './auth/login/login.component';

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
  { path: '', redirectTo: '/form-signup-foundation1', pathMatch: 'full' },
  { path: '**', redirectTo: '/form-signup-foundation1', pathMatch: 'full' },
];
