export interface ValidationError {
  [key: string]: string;
}

export class FormValidator {
  static validateField(value: any, validations: ValidationRule[]): string {
    for (const validation of validations) {
      const error = validation.validate(value);
      if (error) return error;
    }
    return '';
  }
}

export interface ValidationRule {
  validate: (value: any) => string | null;
}

export const ValidationRules = {
  required: (fieldName: string): ValidationRule => ({
    validate: (value: any) => !value ? `${fieldName} es requerido` : null
  }),

  email: (): ValidationRule => ({
    validate: (value: string) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : null
  }),

  minLength: (length: number): ValidationRule => ({
    validate: (value: string) =>
      value.length < length ? `Mínimo ${length} caracteres` : null
  }),

  passwordMatch: (compareValue: string): ValidationRule => ({
    validate: (value: string) =>
      value !== compareValue ? 'Las contraseñas no coinciden' : null
  }),

  phone: (): ValidationRule => ({
    validate: (value: string) =>
      !/^\d{10}$/.test(value) ? 'Teléfono inválido' : null
  })
};
