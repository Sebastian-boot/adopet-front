import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalReport } from '../../models/anima-report/animal-report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalReportsService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getReportsByFoundation(foundationId: string): Observable<AnimalReport[]> {
    return this.http.get<AnimalReport[]>(
      `${this.apiUrl}/reports-abandonment/${foundationId}/foundation`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
