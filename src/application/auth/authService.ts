import apiClient from '@/infrastructure/api/client';
import { User, JwtPair } from '@/domain/models/auth';

export const authService = {
  login: async (credentials: Record<string, string>): Promise<JwtPair> => {
    const { data } = await apiClient.post<JwtPair>('/api/auth/login', credentials);
    return data;
  },
  getCurrentUser: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/api/auth/user');
    return data;
  },
  logout: async () => {
    await apiClient.post('/api/auth/logout');
  }
};
