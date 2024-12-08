import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { AnimalReportComponent } from './animal-report/animal-report.component';
import { AnimalsReportsComponent } from './FoundationDashboard/animals-reports/animals-reports.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleMapsModule,
    NavbarComponent,
    AnimalReportComponent,
    AnimalsReportsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'adopet-front';
}
