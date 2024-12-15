import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthResponse, User } from '../../models/auth/auth.models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => this.handleAuthentication(response)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.router.navigate(['/login']);
  }

  private handleAuthentication(response: AuthResponse): void {
    const expirationDate = this.getTokenExpirationDate(response.token);
    localStorage.setItem('token', response.token);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        id: response.id,
        name: response.name,
        lastName: response.lastName,
        username: response.username,
        email: response.email,
        phoneNumber: response.phoneNumber,
        foundationId: response.foundationId,
        isFoundationUser: response.foundationId !== null,
      })
    );
    this.currentUserSubject.next(
      JSON.parse(localStorage.getItem('userData') || '{}')
    );
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
  }

  private checkToken(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');

    if (!token || !userData) {
      return;
    }

    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate <= new Date()) {
      this.logout();
      return;
    }

    this.currentUserSubject.next(JSON.parse(userData));
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
  }

  private autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private getTokenExpirationDate(token: string): Date {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return new Date(decodedToken.exp * 1000);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status === 401) {
      this.logout();
      errorMessage = 'Sesión expirada o credenciales inválidas';
    }
    return throwError(() => errorMessage);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
