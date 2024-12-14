import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  FoundationFormData,
  LegalRepresentative,
  RegistrationFormData,
  Location,
} from '../../../Interfaces/FormInscriptionData';
import { environment } from '../../../../environments/environment';

interface FoundationResponse {
  id: string;
  name: string;
  logo: string;
  description: string;
  nit: string;
  address: string;
  email: string;
  website: string;
  phoneNumber: string;
  mission: string;
  vision: string;
  averageRating: number;
  status: string;
  legalRepresentatives: LegalRepresentative[];
}

interface LegalRepresentativeResponse {
  id: string;
  fullname: string;
  personalId: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  private formData: RegistrationFormData = {} as RegistrationFormData;
  private foundationFormData: FoundationFormData = {} as FoundationFormData;
  private legalRepresentative: LegalRepresentative = {} as LegalRepresentative;
  private locationData: Location = {} as Location;
  private foundationId: string | null = null;

  private apiUrl = `${environment.apiUrl}/foundations`;

  constructor(private http: HttpClient) {}

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

  setLegalFormData(data: LegalRepresentative) {
    this.legalRepresentative = data;
  }

  getLegalFormData(): LegalRepresentative {
    return this.legalRepresentative;
  }

  getLocationData(): Location {
    return this.locationData;
  }

  setLocationData(data: Location): void {
    this.locationData = data;
  }

  registerFoundation(): Observable<FoundationResponse> {
    const foundationData = {
      name: this.foundationFormData.name,
      legalName: this.foundationFormData.legalName,
      logo: this.foundationFormData.logo,
      description: this.foundationFormData.description,
      nit: String(this.foundationFormData.nit),
      email: this.foundationFormData.email,
      webSite: this.foundationFormData.website,
      phoneNumber: String(this.foundationFormData.phone),
      mission: this.foundationFormData.mission,
      vission: this.foundationFormData.vision,
      location: this.locationData,
      legalRepresentatives: [this.legalRepresentative],
    };

    console.log('Request Data:', foundationData);
    return this.http.post<FoundationResponse>(this.apiUrl, foundationData).pipe(
      map((response) => {
        this.foundationId = response.id;
        return response;
      })
    );
  }

  getFoundationId(): string | null {
    return this.foundationId;
  }
}
