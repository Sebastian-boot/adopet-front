import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RegistrationFormData } from '../../Interfaces/FormInscriptionData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = 'http://localhost:8080/api/auth/login';
  private REGISTER_URL = 'http://localhost:8080/api/auth/register';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.LOGIN_URL, { username, password })
      .pipe(
        tap((response) => {
          if (response.token) {
            this.setToken(response.token);
            console.log('Token: ', response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  register(data: Partial<RegistrationFormData>): Observable<any> {
    const {
      name,
      lastName,
      personalId,
      birthDate,
      address,
      phoneNumber,
      email,
      username,
      password,
    } = data;
    console.log('Data: ', data);
    return this.httpClient
      .post<any>(this.REGISTER_URL, {
        name,
        lastName: lastName,
        personalId,
        birthDate,
        address,
        phoneNumber,
        email,
        username,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now < expiry;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
