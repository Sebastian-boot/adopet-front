import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DarkModeService } from '../../../services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private darkModeService: DarkModeService) {}

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('-translate-x-full');

    window.dispatchEvent(new Event('sidebarToggle'));
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}

