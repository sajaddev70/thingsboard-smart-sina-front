import apiClient from '@/infrastructure/api/client';
import { User, JwtPair, ApiResponse } from '@/domain/models/auth';

export const authService = {
  sendOtp: async (mobile: string): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post<ApiResponse<void>>('/api/auth/send-otp', { mobile });
    return data;
  },

  verifyOtp: async (mobile: string, otp: string): Promise<ApiResponse<JwtPair>> => {
    const { data } = await apiClient.post<ApiResponse<JwtPair>>('/api/auth/verify-otp', { mobile, otp });
    return data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/api/auth/user');
    return data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post<ApiResponse<void>>('/api/auth/logout');
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<JwtPair>> => {
    const { data } = await apiClient.post<ApiResponse<JwtPair>>('/api/auth/token', { refreshToken });
    return data;
  }
};
