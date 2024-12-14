interface Reporter {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAnonymous: boolean;
}

export interface Animal {
  name: string;
  image: string;
  description: string;
  age?: number | string;
  coatColor: string;
  specie: string;
  breed?: string;
  weight?: number | string;
  gender: string;
  [key: string]: string | number | undefined;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
}

export interface Report {
  [key: string]: any;
  title: string;
  description: string;
  images: string[];
  reporter: Reporter;
  animals: Animal[];
  location: Location;
  abandonmentDateTime: string;
  abandonmentStatus?: string;
}
