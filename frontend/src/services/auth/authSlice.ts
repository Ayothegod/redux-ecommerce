import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthState,
  LoginRequest,
  LoginResponse,
  LogOutResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";
import { RootState } from "@/store";
//http://localhost:6000/api/v1/auth/login
export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogOutResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        validateStatus(response) {
          return response.ok === true;
        },
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;

// The slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  } as AuthState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log("Login done");

        state.token = payload.data?.accessToken;
        state.user = {
          id: payload.data.userRes.id,
          email: payload.data.userRes.email,
          role: payload.data.userRes.accountType,
        };
        const user = payload.data.userRes;

        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("user", `${JSON.stringify(user)}`);
        return state;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        console.log("Register done");

        state.token = payload.data?.accessToken;
        state.user = {
          id: payload.data?.userRes.id,
          email: payload.data?.userRes.email,
          role: payload.data?.userRes.accountType,
        };

        const user = payload.data?.userRes;
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("user", `${JSON.stringify(user)}`);
        sessionStorage.setItem(
          "token",
          `${JSON.stringify(payload.data?.accessToken)}`
        );
        return state;
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("user");
      return state;
    });
  },
});

export default authSlice.reducer;
// export const { refreshAuthentication } = authSlice.actions;
