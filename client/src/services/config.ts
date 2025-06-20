import axios, { AxiosInstance, AxiosError } from 'axios';

// API 기본 설정
const API_BASE_URL = 'http://localhost:5001/api';

// axios 인스턴스 생성
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 요청:', config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ 요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ 응답:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ 응답 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 에러 처리 유틸리티
export const handleApiError = (error: AxiosError, context: string): never => {
  console.error(`${context} 실패:`, error);
  throw error;
};

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
} 