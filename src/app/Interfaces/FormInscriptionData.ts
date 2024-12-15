import { Location } from "../core/models/form-report/report";

export interface UserRegistrationFormData {
  [key: string]: any;
  name: string;
  lastName: string;
  personalId: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  prefix: string;
  terms_conditions: boolean;
  foundation: FoundationFormData;
}

export interface FoundationRegistrationFormData {
  foundation: FoundationFormData;
  legalRepresentatives: LegalRepresentative[];
}

export interface RegisterUserFormData {
  name: string;
  lastName: string;
  personalId: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  username: string;
  email: string;
  password: string;
  foundationId?: string;
}

export interface LegalRepresentative {
  name: string;
  lastName: string;
  personalId: string;
  email: string;
  phoneNumber: string;
  address: string;
}
export interface FoundationFormData {
  name: string;
  legalName: string;
  nit: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  mission: string;
  vision: string;
  logo: string;
  location: Location;
  legalRepresentatives: LegalRepresentative[];
}

export interface Foundation {
  id: string;
  name: string;
  legalName: string;
  nit: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  mission: string;
  vision: string;
  logo: string;
  location: Location;
  legalRepresentatives: LegalRepresentative[];
}
