import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoundationData } from '../../../Interfaces/FoundationsData';

@Injectable({
  providedIn: 'root',
})
export class FoundationDataService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getFoundationData(): Observable<FoundationData[]> {
    return this.http.get<FoundationData[]>(`${this.apiUrl}/foundations`);
  }
}
