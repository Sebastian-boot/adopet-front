import { Routes } from '@angular/router';
import { AnimalReportsComponent } from './animal-reports/animal-reports.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
import { SaveFriendComponent } from './animal-report/save-friend.component';
import { userGuard } from './core/guards/user.guard';
import { foundationUserGuard } from './core/guards/foundation-user.guard';
import { VerifyReportComponent } from './verify-report/verify-report.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FoundationsComponent } from './foundations/foundations.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Adopet - Iniciar sesión',
    canActivate: [publicGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Adopet - Crear cuenta',
    canActivate: [publicGuard]
  },
  {
    path: 'save-friend',
    component: SaveFriendComponent,
    title: 'Adopet - Salvar un Amigo',
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'foundations',
    component: FoundationsComponent,
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
  {
    path: 'verify-report/:id',
    component: VerifyReportComponent,
    title: 'Admin Adopet - Verificar reporte',
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
