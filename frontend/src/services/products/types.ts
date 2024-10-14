export interface productModel {
  id: number;
  name: number;
  description: string;
  imageUrl: string;
  category: string;
  sellerId: string;
  price: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetProductsResponse {
  products: productModel[];
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
