import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimalReport } from '../../models/anima-report/animal-report';
import { Observable } from 'rxjs';
import { Report } from '../../models/form-report/report';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalReportsService {

  constructor(private http: HttpClient) {}

  getReportsByFoundation(foundationId: string): Observable<AnimalReport[]> {
    return this.http.get<AnimalReport[]>(
      `${environment.apiUrl}/reports-abandonment/${foundationId}/foundation`,
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
