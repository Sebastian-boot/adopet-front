export interface RegistrationFormData {
  name: string;
  lastName: string;
  personalId: string;
  birthDate: string;
  phoneNumber: string;
  address: string;
  username: string;
  email: string;
  password: string;
  prefix: string;
  terms_conditions: boolean;
  foundation: FoundationFormData;
  legal_representative: LegalRepresentative;
}
export interface LegalRepresentative {
  name: string;
  surname: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
}
export interface FoundationFormData {
  nameFoundation: string;
  nit: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  mission: string;
  vision: string;
  image: string;
}
