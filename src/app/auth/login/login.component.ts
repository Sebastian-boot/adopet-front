import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginFormData } from '../../Interfaces/LoginFormData';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
      rememberMe: [false],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData: LoginFormData = this.loginForm.value;

      console.log('Datos del usuario: ', formData);
      this.router.navigate(['/animal-report']);
    } else {
      console.log('Formulario no valido');
    }
  }
}
