/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AdminCreateRegisterRequest,
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
      const token =
        (getState() as RootState).auth.token ||
        JSON.parse(sessionStorage.getItem("token") || "null");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Admin"],
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
    adminCreateUser: builder.mutation<
      { message: string; data: null },
      AdminCreateRegisterRequest
    >({
      query: (data) => ({
        url: "auth/admin/createUser",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Admin"],
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        url: `auth/admin/getUsers`,
      }),
      providesTags: ["Admin"],
    }),
    deleteUser: builder.query<{ message: string; data: null }, string>({
      query: (id) => ({
        url: `auth/admin/deleteUser/${id}`,
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAdminCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserQuery,
  useLazyDeleteUserQuery,
} = authApi;

// The slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  } as AuthState,
  reducers: {
    clearState: (state) => {
      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      if (isAuthenticated === "true") {
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");

        state.token = null;
        state.user = null;
      }
      return state;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        // console.log("Login done");

        state.token = payload.data?.accessToken;
        state.user = {
          id: payload.data?.userRes.id,
          email: payload.data?.userRes.email,
          accountType: payload.data?.userRes.accountType,
        };

        const user = payload.data?.userRes;
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("user", `${JSON.stringify(user)}`);
        sessionStorage.setItem(
          "token",
          `${JSON.stringify(payload.data?.accessToken)}`
        );
        // console.log("Login done");
        return state;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data?.accessToken;
        state.user = {
          id: payload.data?.userRes.id,
          email: payload.data?.userRes.email,
          accountType: payload.data?.userRes.accountType,
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
export const { clearState } = authSlice.actions;
