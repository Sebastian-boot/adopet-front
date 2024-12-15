import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export interface ApiError {
  type: string;
  title: string;
  status: number;
  errors?: {
    [key: string]: string[];
  };
  detail?: string;
  traceId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private toastr: ToastrService) {}

  handleApiError(error: any): string[] {
    const errors: string[] = [];

    if (error.error) {
      const apiError: ApiError = error.error;

      if (apiError.status === 500) {
        errors.push('Ha ocurrido un error en el servidor. Por favor, intente más tarde.');
        return errors;
      }

      if (apiError.errors) {
        Object.keys(apiError.errors).forEach(key => {
          errors.push(...apiError.errors![key]);
        });
        return errors;
      }

      if (apiError.title) {
        const errorMessage = this.getErrorMessageByTitle(apiError.title);
        errors.push(errorMessage);
        return errors;
      }
    }

    errors.push('Ha ocurrido un error inesperado. Por favor, intente nuevamente.');
    return errors;
  }

  private getErrorMessageByTitle(title: string): string {
    const errorMessages: { [key: string]: string } = {
      'Already username exists.': 'El nombre de usuario ya existe.',
      'Invalid credentials.': 'Credenciales inválidas.',
      // Agrega más mapeos de mensajes según necesites
    };

    return errorMessages[title] || title;
  }

  showErrorToast(message: string): void {
    this.toastr.error(message);
  }
}
