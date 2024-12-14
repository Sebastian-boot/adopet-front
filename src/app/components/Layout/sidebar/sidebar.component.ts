import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  get isFoundationUser(): boolean {
    let isFoundation = false;
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        isFoundation = user.isFoundationUser;
      }
    });
    return isFoundation;
  }

  get reportsLink(): string {
    return this.isFoundationUser ? '/animals-reports' : '/users-main';
  }

  get reportsText(): string {
    return this.isFoundationUser ? 'Reportes' : 'Fundaciones';
  }
}
