import { Injectable } from '@angular/core';
import { AnimalReportData } from '../../Interfaces/AnimalReportData';

@Injectable({
  providedIn: 'root',
})
export class AnimalReportDataService {
  private reportData: AnimalReportData = {
    title: '',
    description: '',
    images: [],
    reporter: {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      isAnonymous: false,
    },
    animals: {
      name: '',
      image: '',
      description: '',
      age: 0,
      coatColor: '',
      specie: '',
      race: '',
      weight: 0,
      gender: '',
    },
    location: {
      latitude: 0,
      longitude: 0,
      address: '',
      city: '',
      postalCode: '',
    },
    observations: '',
    abandonmentDateTime: new Date(),
    abandonmentStatus: '',
  };

  setReportData(data: Partial<AnimalReportData>) {
    this.reportData = { ...this.reportData, ...data };
  }

  getReportData(): AnimalReportData {
    return this.reportData;
  }
}
