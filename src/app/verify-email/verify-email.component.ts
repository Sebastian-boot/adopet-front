import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit {
  environment = environment;
  verificationSuccessful = false;
  messageError = '';
  loading = true;
  emailAlreadyVerified = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const userId = params['userId'];

      if (token && userId) {
        this.authService.verifyEmail(token, userId).subscribe({
          next: () => {
            this.verificationSuccessful = true;
            this.loading = false;
          },
          error: (error) => {
            this.verificationSuccessful = false;
            this.loading = false;

            if (error.status === 409) {
              this.emailAlreadyVerified = true;
              this.messageError = 'Este correo electrónico ya ha sido verificado anteriormente.';
            } else {
              this.emailAlreadyVerified = false;
              this.messageError = 'Error al verificar el email. Por favor, intente nuevamente.';
            }
          }
        });
      } else {
        this.verificationSuccessful = false;
        this.messageError = 'Enlace de verificación inválido';
        this.loading = false;
      }
    });
  }
}
