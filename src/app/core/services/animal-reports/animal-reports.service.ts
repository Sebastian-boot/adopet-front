import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalReport } from '../../models/anima-report/animal-report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalReportsService {
  private apiUrl = 'http://localhost:5116/api';
  //private token = sessionStorage.getItem('token');
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb21haW4uVXNlcnMuVXNlcklkIiwiZ2l2ZW5fbmFtZSI6IlNlYmFzIiwiZmFtaWx5X25hbWUiOiJUcml2aW5vIiwianRpIjoiYzM5NGY0MzMtOWQzMi00OWI4LTg1NzEtM2NlMjBiMjg4MmM5IiwiZXhwIjoxNzM0MDY0OTgyLCJpc3MiOiJBZG9wZXQiLCJhdWQiOiJBZG9wZXQifQ.Al3Xedo7OcOKDVJMVKT-W85fyBRfOxtIToBqR0Y175c';

  constructor(private http: HttpClient) {}

  getReportsByFoundation(foundationId: string): Observable<AnimalReport[]> {
    return this.http.get<AnimalReport[]>(`${this.apiUrl}/reports-abandonment/${foundationId}/foundation`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
