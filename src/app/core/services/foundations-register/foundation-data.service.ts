import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoundationData } from '../../../Interfaces/FoundationsData';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoundationDataService {
  constructor(private http: HttpClient) {}

  getFoundationData(): Observable<FoundationData[]> {
    return this.http.get<FoundationData[]>(`${environment.apiUrl}/foundations`);
  }
}
