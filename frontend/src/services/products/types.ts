/* eslint-disable @typescript-eslint/no-explicit-any */
export interface productModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  sellerId: string;
  price: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface itemProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  productUrl: string;
  productName: string;
  productPrice: number;
  cartId: string;
  productId: string;
  sellerId: string;
}

export interface cartItem {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  items: itemProduct[];
}

export interface cartModel {
  cart: cartItem;
}

export interface GetProductsResponse {
  products: productModel[];
}

export interface GetSingleProductResponse {
  product: productModel;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  imageUrl?: string | undefined;
  price: number;
  category: string;
  tags?: string[];
}

export interface CreateProductResponse {
  message: string;
  statusCode: number;
  data: {
    imagePublicId: string;
    name: string;
  };
}

export interface OrderItem {
  productId: string;
  sellerId: string;
  quantity: number;
  productPrice: number;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productUrl: string;
  productName: string;
  cartId: string;
}

export interface CreateOrderRequest {
  totalAmount: number | undefined;
  orderItems: OrderItem[] | undefined;
}

export interface CreateOrderResponse {
  message: string;
  data: {
    orderId: string;
    date: Date;
    items: number;
    amount: number;
  };
}

export interface GetSellerOrdersResponse {
  sellerOrders: SellerOrderData[];
}

export interface SellerOrderData {
  id: string;
  orderId: string;
  productId: string;
  sellerId: string;
  quantity: number;
  price: number;
  status: string;
  product: SellerOrderProduct;
  order: SellerOrderParent;
}

export interface SellerOrderProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  sellerId: string;
}

export interface SellerOrderParent {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  shopperId: string;
}
