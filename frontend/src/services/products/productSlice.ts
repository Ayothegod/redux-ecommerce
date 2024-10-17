/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";
import type {
  cartItem,
  cartModel,
  CreateProductRequest,
  CreateProductResponse,
  GetProductsResponse,
  GetSingleProductResponse,
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
  tagTypes: ["productModel", "cartModel", "userCart"],
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
      getAllProducts: builder.query<
        { products: productModel[]; totalCount: number },
        { page: number; limit: number }
      >({
        query: ({ page, limit }) => ({
          url: `products/all`,
          params: { page, limit },
        }),
        transformResponse: (
          response: {
            data: { products: productModel[]; totalCount: number };
          },
          _meta,
          _arg
        ) => ({
          products: response.data.products,
          totalCount: response.data.totalCount,
        }),
        providesTags: ["productModel"],
      }),
      getProductById: builder.query<productModel, string>({
        query: (id) => `products/${id}`,
        transformResponse: (
          response: { data: GetSingleProductResponse },
          _meta,
          _arg
        ) => response.data.product,
        providesTags: ["productModel"],
      }),
      getCart: builder.query<cartItem, string>({
        query: (id) => `cart/${id}`,
        transformResponse: (response: { data: cartModel }, _meta, _arg) =>
          response.data.cart,
        providesTags: ["userCart"],
      }),
      addToCart: builder.mutation<
        string,
        { productId: string | undefined; quantity: number }
      >({
        query: (body) => ({
          url: "cart/add",
          method: "POST",
          credentials: "include",
          body: body,
        }),
        transformResponse: (response: { message: string }, _meta, _arg) =>
          response.message,
        invalidatesTags: ["userCart"],
      }),
    };
  },
});

// Exporting the generated methods from createApi
export const {
  useCreateProductMutation,
  useGetAllSellerProductsQuery,
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useGetCartQuery,
  useLazyGetCartQuery,
  useAddToCartMutation,
} = productApi;
