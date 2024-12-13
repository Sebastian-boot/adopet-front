import { Injectable } from '@angular/core';
import {
  FoundationFormData,
  LegalRepresentative,
  RegistrationFormData,
} from '../../Interfaces/FormInscriptionData';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: RegistrationFormData = {} as RegistrationFormData;
  private foundationFormData: FoundationFormData | null = null;
  private legalRepresentative: LegalRepresentative = {} as LegalRepresentative;

  setFormData(data: RegistrationFormData) {
    this.formData = data;
  }

  getFormData(): RegistrationFormData {
    return this.formData;
  }

  setFoundationFormData(data: FoundationFormData): void {
    this.foundationFormData = data;
  }

  getFoundationFormData(): FoundationFormData | null {
    return this.foundationFormData;
  }

  clearFoundationFormData(): void {
    this.foundationFormData = null;
  }

  setLegalFormData(data: LegalRepresentative) {
    this.legalRepresentative = data;
  }

  getLegalFormData(): LegalRepresentative {
    return this.legalRepresentative;
  }
}
