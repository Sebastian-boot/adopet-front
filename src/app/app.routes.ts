import { Routes } from '@angular/router';
import LoginComponent from './login/login.component';
import { AnimalReportComponent } from './animal-report/animal-report.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'animal-report', component: AnimalReportComponent },
  { path: 'form-signup', component: FormInscriptionComponent },
  { path: 'form-signup-foundation', component: FoundationInscriptionComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
