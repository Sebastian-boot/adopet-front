import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidebarComponent } from './components/Layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/Layout/navbar/navbar.component';
import { DarkModeService } from './services/dark-mode/dark-mode.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleMapsModule,
    NavbarComponent,
    SidebarComponent,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarOpen = false;

  constructor(private darkModeService: DarkModeService) {
    window.addEventListener('sidebarToggle', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });
  }

  ngOnInit(): void {
    this.darkModeService.initializeTheme();
  }
  title = 'Admin Adopet';
}
