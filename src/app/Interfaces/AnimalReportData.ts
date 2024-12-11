export interface AnimalReportData {
  title: string;
  description: string;
  images: string[];
  reporter: reporter;
  animals: animal;
  location: location;
  observations: string;
  abandonmentDateTime: Date;
  abandonmentStatus: string;
}

export interface reporter {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAnonymous: boolean;
}

export interface animal {
  name: string;
  image: string;
  description: string;
  age: number;
  coatColor: string;
  specie: string;
  race: string;
  weight: number;
  gender: string;
}

export interface location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
}
