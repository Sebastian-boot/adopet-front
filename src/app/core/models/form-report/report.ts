interface Reporter {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAnonymous: boolean;
}

interface Animal {
  name: string | null;
  image: string;
  description: string;
  age?: number;
  coatColor: string;
  specie: string;
  breed?: string;
  weight?: number;
  gender: string;
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
