import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  loading = false;
  requestSent = false;
  errorMessage = '';
  userIdentifier = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.requestPasswordReset(this.userIdentifier).subscribe({
      next: () => {
        this.loading = false;
        this.requestSent = true;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'Ha ocurrido un error. Por favor, intenta nuevamente.';
      }
    });
  }
}
