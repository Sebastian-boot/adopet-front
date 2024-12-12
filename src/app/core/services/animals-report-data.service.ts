import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AnimalReportData } from '../../Interfaces/AnimalReportData';

@Injectable({
  providedIn: 'root',
})
export class AnimalReportDataService {
  private reportData: AnimalReportData[] = [
    {
      title: 'Reporte 1',
      description: 'Descripción del reporte 1',
      images: [],
      reporter: {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phoneNumber: '123456789',
        isAnonymous: false,
      },
      animals: {
        name: 'Firulais',
        image: '',
        description: 'Perro de raza mediana',
        age: 3,
        coatColor: 'Marrón',
        specie: 'Perro',
        race: 'Labrador',
        weight: 20,
        gender: 'Macho',
      },
      location: {
        latitude: 0,
        longitude: 0,
        address: 'Calle Falsa 123',
        city: 'Ciudad',
        postalCode: '12345',
      },
      observations: 'Ninguna',
      abandonmentDateTime: new Date(),
      abandonmentStatus: 'Critico',
    },
    {
      title: 'Reporte 1',
      description: 'Descripción del reporte 1',
      images: [],
      reporter: {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phoneNumber: '123456789',
        isAnonymous: false,
      },
      animals: {
        name: 'Firulais',
        image: '',
        description: 'Perro de raza mediana',
        age: 3,
        coatColor: 'Marrón',
        specie: 'Perro',
        race: 'Labrador',
        weight: 20,
        gender: 'Macho',
      },
      location: {
        latitude: 0,
        longitude: 0,
        address: 'Calle Falsa 123',
        city: 'Ciudad',
        postalCode: '12345',
      },
      observations: 'Ninguna',
      abandonmentDateTime: new Date(),
      abandonmentStatus: 'Critico',
    },
    // Agrega más datos de prueba aquí
  ];

  setReportData(data: Partial<AnimalReportData>) {
    this.reportData = { ...this.reportData, ...data };
  }

  getReportData(): Observable<AnimalReportData[]> {
    return of(this.reportData);
  }
}
