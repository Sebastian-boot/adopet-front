import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface ApiErrorResponse {
  type: string;
  title: string;
  status: number;
  errors?: {
    [key: string]: string[];
  };
  traceId?: string;
}

const ERROR_MESSAGES = {
  'Auth.InvalidCredentials': 'Credenciales inválidas',
  'Already username exists.': 'El nombre de usuario ya existe',
  'User.NotFound': 'Usuario no encontrado',
  'User.AlreadyExists': 'El usuario ya existe',
  'Email.AlreadyExists': 'El correo electrónico ya está registrado',
  'Foundation.NotFound': 'Fundación no encontrada',
  'Foundation.AlreadyExists': 'La fundación ya existe',
} as const;

type ErrorKey = keyof typeof ERROR_MESSAGES;

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private toastr: ToastrService) {}

  handleApiError(error: any): string[] {
    if (!error.error) {
      return ['Ha ocurrido un error inesperado. Por favor, intente nuevamente.'];
    }

    const apiError: ApiErrorResponse = error.error;
    const errors: string[] = [];

    switch (apiError.status) {
      case 400:
        if (apiError.errors) {
          Object.entries(apiError.errors).forEach(([key, messages]) => {
            messages.forEach(message => {
              errors.push(this.translateError(key as ErrorKey, message));
            });
          });
        } else if (apiError.title) {
          errors.push(this.translateError(apiError.title as ErrorKey, apiError.title));
        }
        break;

      case 401:
        errors.push('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
        break;

      case 403:
        errors.push('No tiene permisos para realizar esta acción.');
        break;

      case 404:
        errors.push('El recurso solicitado no fue encontrado.');
        break;

      case 500:
        errors.push('Ha ocurrido un error en el servidor. Por favor, intente más tarde.');
        break;

      default:
        errors.push('Ha ocurrido un error inesperado. Por favor, intente nuevamente.');
    }

    return errors.length > 0 ? errors : ['Ha ocurrido un error inesperado'];
  }

  private translateError(key: ErrorKey, defaultMessage: string): string {
    return ERROR_MESSAGES[key] || defaultMessage;
  }

  showErrorToast(message: string): void {
    this.toastr.error(message);
  }

  showErrorToasts(errors: string[]): void {
    errors.forEach(error => this.showErrorToast(error));
  }
}
