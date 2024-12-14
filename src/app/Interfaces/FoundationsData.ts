export interface LegalRepresentative {
  id: string;
  fullName: string;
  personalId: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export interface FoundationData {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  nit: string;
  address: string;
  email: string;
  website: string;
  phoneNumber: string;
  mission: string;
  vission: string | null;
  averageRating: number;
  status: string;
  legalRepresentatives: LegalRepresentative[];
}
