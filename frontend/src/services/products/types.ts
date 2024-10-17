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

// export interface ProductTableModel {
//   id: string;
//   name: string;
//   imageUrl: string;
//   // stock: number;
//   price: number;
//   createdAt: Date;
//   updatedAt: Date;
//   category: string;
// }

// filters (category, date)

// Table for products additions(stock left (original - orderItems sold))
// Table for products sold and the amount being sold - from orderItems (amount sold, revenue from amount (amount sold * price))

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

export interface CreateProductResponse {
  message: string;
  statusCode: number;
  data: {
    imagePublicId: string;
    name: string;
  };
}
