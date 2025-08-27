import User from './User';

export interface LoginFormData {
  email: string;
  password: string;
}


export interface AuthResponse {
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}