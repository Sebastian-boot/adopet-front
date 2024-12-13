import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalReport } from '../../types/animal-report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalReportsService {
  private apiUrl = 'http://localhost:5116/api';
  //private token = sessionStorage.getItem('token');
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJEb21haW4uVXNlcnMuVXNlcklkIiwiZ2l2ZW5fbmFtZSI6IlNlYmFzIiwiZmFtaWx5X25hbWUiOiJUcml2aW5vIiwianRpIjoiOTI3NTg5NDgtNjA5My00MzAzLWEwZmUtZmEyZDczOTIwYjUxIiwiZXhwIjoxNzM0MDU3MzE3LCJpc3MiOiJBZG9wZXQiLCJhdWQiOiJBZG9wZXQifQ.7WUO_O3mp32XSbOBism5qbdKwy2Q7NHMp0jP0ULjS5Q';

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
