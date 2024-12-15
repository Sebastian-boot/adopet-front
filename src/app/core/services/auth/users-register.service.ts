import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Foundation, FoundationFormData, RegisterUserFormData, UserRegistrationFormData } from '../../../Interfaces/FormInscriptionData';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersRegisterService {


  constructor(private http: HttpClient) {}

  registerUser(userData: UserRegistrationFormData, foundationId?: string): Observable<void> {
    const body: RegisterUserFormData = {
      foundationId: foundationId,
      name: userData.name,
      lastName: userData.lastName,
      personalId: String(userData.personalId),
      birthDate: userData.birthDate,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      username: userData.username,
      password: userData.password,
    };

    return this.http.post<void>(`${environment.apiUrl}/auth/register`, body);
  }

  registerFoundation(foundationData: FoundationFormData): Observable<Foundation> {
    return this.http.post<Foundation>(`${environment.apiUrl}/foundations`, foundationData);
  }
}
