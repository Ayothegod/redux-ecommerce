export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  accountType: "SHOPPER" | "SELLER" | "ADMIN";
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};

export interface RegisterResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
  }
}

export interface LoginResponse {
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken: string;
    user: UserResponse;
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
  firstname: string;
  lastName: string;
  accountType: "SHOPPER" | "SELLER" | "ADMIN";
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
