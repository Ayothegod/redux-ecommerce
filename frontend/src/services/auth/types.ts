export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  accountType: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  accountType: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    userRes: UserResponse;
  };
}

export interface LoginResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    userRes: UserResponse;
  };
}

export interface LogOutResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

export interface UserResponse {
  id: string;
  email: string;
  accountType: string;
}

export interface AdminCreateRegisterRequest {
  firstName: string;
  lastName: string;
  accountType: string;
  email: string;
  password: string;
}
