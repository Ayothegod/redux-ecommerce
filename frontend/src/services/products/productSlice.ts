/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
import type {
  CreateProductRequest,
  CreateProductResponse,
  GetProductsResponse,
  productModel,
} from "./types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token ||
        JSON.parse(sessionStorage.getItem("token") || "null");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // console.log(token);
      return headers;
    },
    credentials: "include",
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["productModel"],
  endpoints: (builder) => {
    return {
      createProduct: builder.mutation<
        CreateProductResponse,
        CreateProductRequest
      >({
        query: (body) => ({
          url: "products/product",
          method: "POST",
          credentials: "include",
          body: body,
        }),
        invalidatesTags: ["productModel"],
      }),
      getAllSellerProducts: builder.query<productModel[], void>({
        query: (sellerId) => ({
          url: `products/${sellerId}/products`,
        }),
        transformResponse: (
          response: { data: GetProductsResponse },
          _meta,
          _arg
        ) => response.data.products,
        providesTags: ["productModel"],
      }),
    };
  },
});

// Exporting the generated methods from createApi
export const { useCreateProductMutation, useGetAllSellerProductsQuery } =
  productApi;
