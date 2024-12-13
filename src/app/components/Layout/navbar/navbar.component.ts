import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../core/services/dark-mode/dark-mode.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser$: Observable<any>;

  constructor(private darkModeService: DarkModeService, private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('-translate-x-full');

    window.dispatchEvent(new Event('sidebarToggle'));
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
  onLogout(): void {
    this.authService.logout();
  }
}

