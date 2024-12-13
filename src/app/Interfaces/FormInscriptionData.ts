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
  image: string;
  location: location;
  legalRepresentatives: LegalRepresentative;
}
export interface location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
}
