import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Species } from '../../models/config/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>('http://localhost:5116/api/species');
  }
}
