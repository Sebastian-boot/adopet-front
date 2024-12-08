import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsDataService {
  private apiUrl = 'https://api.example.com/reports';

  constructor(private http: HttpClient) {}

  reportsData: any[] = [
    {
      title: 'Animal 1',
      description: 'Descripción del reporte 1',
      date: '2023-10-01',
      image: 'assets/images/straydog2.jpg',
    },
    {
      title: 'Animal 2',
      description: 'Descripción del reporte 2',
      date: '2023-10-02',
      image: 'assets/images/straydog3.jpg',
    },
    {
      title: 'Animal 3',
      description: 'Descripción del reporte 3',
      date: '2023-10-03',
      image: 'assets/images/straycat4.jpg',
    },
    {
      title: 'Animal 4',
      description: 'Descripción del reporte 4',
      date: '2023-10-04',
    },
  ];

  getReportsData(): Observable<any> {
    return of(this.reportsData);
    /*return this.http.get<any>(this.apiUrl);*/
  }
}
