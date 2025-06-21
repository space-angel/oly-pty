import { Product } from '../types/product';
import { apiClient, handleApiError, ApiResponse } from './config';
import { AxiosError } from 'axios';

class ProductApi {
  private static instance: ProductApi;

  private constructor() {}

  public static getInstance(): ProductApi {
    if (!ProductApi.instance) {
      ProductApi.instance = new ProductApi();
    }
    return ProductApi.instance;
  }

  async getProduct(productId: string): Promise<Product> {
    try {
      console.log('상품 상세 정보 요청:', productId);
      const response = await apiClient.get<ApiResponse<Product>>(`/products/${productId}`);
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '상품 정보를 가져오는데 실패했습니다.');
      }

      console.log('상품 상세 정보 응답:', response.data.data);
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '상품 정보 조회');
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      console.log('상품 목록 요청');
      const response = await apiClient.get<ApiResponse<Product[]>>('/products');
      
      if (!response.data.success || !response.data.data) {
        throw new Error(response.data.message || '상품 목록을 가져오는데 실패했습니다.');
      }

      console.log('상품 목록 응답:', response.data.data);
      return response.data.data;
    } catch (error) {
      return handleApiError(error as AxiosError, '상품 목록 조회');
    }
  }
}

export const productApi = ProductApi.getInstance(); 