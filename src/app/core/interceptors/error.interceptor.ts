import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../services/shared/error-handling.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandlingService: ErrorHandlingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorHandlingService.showErrorToast('Sesión expirada. Por favor, inicie sesión nuevamente.');
        }

        if (error.status === 403) {
          this.errorHandlingService.showErrorToast('No tiene permisos para realizar esta acción.');
        }

        return throwError(() => error);
      })
    );
  }
}
