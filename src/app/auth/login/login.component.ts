import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ErrorMessagesComponent } from '../../shared/components/error-messages/error-messages.component';
import { ErrorHandlingService } from '../../core/services/shared/error-handling.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ErrorMessagesComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      try {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.loginErrors = this.errorHandlingService.handleApiError(error);
          }
        });
      } catch(error: any){
        this.loginErrors = this.errorHandlingService.handleApiError(error);
        this.errorHandlingService.showErrorToast('Error al iniciar sesión');
      }

    }
  }
}
