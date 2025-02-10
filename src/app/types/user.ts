export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface jwtData {
  email: string;
  username: string;
  iat: number;
  exp: number;
}
