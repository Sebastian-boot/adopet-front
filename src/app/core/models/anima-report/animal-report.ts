export interface Reporter {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface Animal {
  id: string;
  name: string;
  description: string;
  images: string[];
  specie: string;
  age: string;
  gender: string;
  status: string;
}

export interface AnimalReport {
  id: string;
  title: string;
  description: string;
  images: string[];
  status: string;
  abandonmentStatus: string;
  address: string;
  abandonmentDateTime: string;
  abandonmentDuration: string;
  reportDateTime: string;
  rescueDateTime: string | null;
  responseTime: string | null;
  foundationId: string | null;
  animals: Animal[];
  reporter: Reporter;
}
