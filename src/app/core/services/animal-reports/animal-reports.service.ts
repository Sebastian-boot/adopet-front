import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalReport } from '../../models/anima-report/animal-report';
import { Observable } from 'rxjs';
import { Report } from '../../models/form-report/report';

@Injectable({
  providedIn: 'root'
})
export class AnimalReportsService {
  private apiUrl = 'http://localhost:5116/api';


  constructor(private http: HttpClient) {}

  getReportsByFoundation(foundationId: string): Observable<AnimalReport[]> {
    return this.http.get<AnimalReport[]>(`${this.apiUrl}/reports-abandonment/${foundationId}/foundation`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  createReport(formData: Report): Observable<AnimalReport> {
    return this.http.post<AnimalReport>(`${this.apiUrl}/reports-abandonment`, formData);
  }
}
