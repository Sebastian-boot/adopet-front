export interface AuthResponse {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  token: string;
  foundationId: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  foundationId: string;
  isFoundationUser: boolean;
}

