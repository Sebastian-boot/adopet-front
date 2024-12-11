import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoundationsDataService {
  private apiUrl = 'https://api.example.com/foundations'; // URL de la API

  constructor(private http: HttpClient) {}

  foundationsData: any[] = [
    {
      name: 'Fundación 1',
      description: 'Descripción de la fundación 1',
      image: 'assets/images/dogs2.jpg',
    },
    {
      name: 'Fundación 2',
      description: 'Descripción de la fundación 2',
      image: 'assets/images/dogs2.jpg',
    },
    {
      name: 'Fundación 3',
      description: 'Descripción de la fundación 3',
      image: 'assets/images/dogs2.jpg',
    },
  ];

  getFoundationsData(): Observable<any[]> {
    return of(this.foundationsData); // Return the dummy data as an observable
    // return this.http.get<any[]>(this.apiUrl); // Uncomment this line to use the real API
  }
}
