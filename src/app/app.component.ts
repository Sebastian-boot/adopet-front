import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidebarComponent } from './components/Layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/Layout/navbar/navbar.component';
import { DarkModeService } from './core/services/dark-mode/dark-mode.service';
import { NgClass, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GoogleMapsModule,
    NavbarComponent,
    SidebarComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarOpen = false;
  isLoginRoute = false;

  private readonly publicUrls = ['/login', '/form-signup', '/verify-report'];

  isPublicRoute(url: string): boolean {
    return this.publicUrls.some(publicUrl => url.startsWith(publicUrl));
  }

  constructor(
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    window.addEventListener('sidebarToggle', () => {
      this.isSidebarOpen = !this.isSidebarOpen;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginRoute = this.isPublicRoute(this.router.url);
    });
  }

  ngOnInit(): void {
    this.darkModeService.initializeTheme();
    this.isLoginRoute = this.isPublicRoute(this.router.url);
  }

  title = 'Admin Adopet';
}
