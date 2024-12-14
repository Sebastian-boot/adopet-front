import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistrationFormData } from '../../../Interfaces/FormInscriptionData';

@Injectable({
  providedIn: 'root',
})
export class UsersRegisterService {
  private apiUrl = `${environment.apiUrl}/auth/register`;

  constructor(private http: HttpClient) {}

  registerUser(userData: RegistrationFormData): Observable<void> {
    const body = {
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

    console.log(body);

    return this.http.post<void>(this.apiUrl, body);
  }

  registerUserFoundation(userData: RegistrationFormData): Observable<void> {
    const body = {
      foundationId: userData.foundationId,
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

    console.log(body);

    return this.http.post<void>(this.apiUrl, body);
  }
}
