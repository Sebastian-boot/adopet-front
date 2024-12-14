import { Routes } from '@angular/router';
import { AnimalReportsComponent } from './animal-reports/animal-reports.component';
import { FormInscriptionComponent } from './form-inscription/form-inscription.component';
import { FoundationInscriptionComponent } from './foundation-inscription/foundation-inscription.component';
import { FoundationInscription2Component } from './foundation-inscription2/foundation-inscription2.component';
import { FoundationInscription3Component } from './foundation-inscription3/foundation-inscription3.component';
import { LoginComponent } from './auth/login/login.component';
import { FoundationsAdopetComponent } from './users/dashboard/foundations-adopet/foundations-adopet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { SaveFriendComponent } from './animal-report/save-friend.component';
import { userGuard } from './core/guards/user.guard';
import { foundationUserGuard } from './core/guards/foundation-user.guard';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Adopet - Iniciar sesión',
    canActivate: [publicGuard]
  },
  {
    path: 'form-signup',
    component: FormInscriptionComponent,
    title: 'Adopet - Crear cuenta',
    canActivate: [publicGuard]
  },
  {
    path: 'form-signup-foundation1',
    component: FoundationInscriptionComponent,
    canActivate: [publicGuard]

  },
  {
    path: 'form-signup-foundation2',
    component: FoundationInscription2Component,
    canActivate: [publicGuard]

  },
  {
    path: 'form-signup-foundation3',
    component: FoundationInscription3Component,
    canActivate: [publicGuard]
  },
  {
    path: 'save-friend',
    component: SaveFriendComponent,
    title: 'Adopet - Salvar un Amigo',
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'users-main',
    component: FoundationsAdopetComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Adopet - Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'animals-reports',
    component: AnimalReportsComponent,
    title: 'Admin Adopet - Reportes de animales',
    canActivate: [authGuard, foundationUserGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
