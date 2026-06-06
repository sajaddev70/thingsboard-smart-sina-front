import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { useAuthStore } from '@/application/auth/useAuthStore';
import { authService } from '@/application/auth/authService';

export interface ApiRequestMetadata {
  startTime: number;
  correlationId: string;
}

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: ApiRequestMetadata;
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCurl = (config: AxiosRequestConfig) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = `${config.baseURL || ''}${config.url}`;

  let curl = `curl -X ${method} "${url}"`;

  // Headers
  const headers = { ...config.headers };
  Object.entries(headers).forEach(([key, value]) => {
    const skipHeaders = ['common', 'delete', 'get', 'head', 'post', 'put', 'patch'];
    if (value && !skipHeaders.includes(key.toLowerCase())) {
        curl += ` -H "${key}: ${value}"`;
    }
  });

  // Body
  if (config.data) {
    curl += ` -d '${JSON.stringify(config.data)}'`;
  }

  return curl;
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const correlationId = crypto.randomUUID();
  const startTime = Date.now();
  config.metadata = { startTime, correlationId };

  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  if (token) {
    // Both standard Authorization and ThingsBoard legacy X-Authorization for maximum compatibility
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['X-Authorization'] = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  async (response) => {
    const metadata = response.config.metadata;
    const duration = metadata ? Date.now() - metadata.startTime : 0;
    const correlationId = metadata?.correlationId;

    const logData = {
      correlationId,
      method: response.config.method?.toUpperCase() || 'GET',
      endpoint: response.config.url || '',
      fullUrl: `${response.config.baseURL || ''}${response.config.url}`,
      headers: response.config.headers,
      params: response.config.params,
      requestBody: response.config.data,
      responseBody: response.data,
      status: response.status,
      duration,
      curl: getCurl(response.config),
    };

    if (typeof window !== 'undefined') {
      fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify(logData),
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {});
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const metadata = originalRequest?.metadata;
    const duration = metadata ? Date.now() - metadata.startTime : 0;

    // Handle 401 Unauthorized for token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            originalRequest.headers['X-Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;

      if (refreshToken) {
        try {
          const response = await authService.refreshToken(refreshToken);
          const { token, refreshToken: newRefreshToken } = response.dataList[0];

          if (token) {
            useAuthStore.getState().setAuth(
                useAuthStore.getState().user!,
                token,
                newRefreshToken || refreshToken
            );

            processQueue(null, token);
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            originalRequest.headers['X-Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        useAuthStore.getState().logout();
      }
    }

    if (error.config) {
        const logData = {
            correlationId: metadata?.correlationId,
            method: error.config.method?.toUpperCase() || 'GET',
            endpoint: error.config.url || '',
            fullUrl: `${error.config.baseURL || ''}${error.config.url}`,
            headers: error.config.headers,
            params: error.config.params,
            requestBody: error.config.data,
            responseBody: error.response?.data,
            status: error.response?.status || 0,
            duration,
            curl: getCurl(error.config),
            errorMessage: error.message,
            errorDetails: error.response?.data
          };

          if (typeof window !== 'undefined') {
            fetch('/api/logs', {
              method: 'POST',
              body: JSON.stringify(logData),
              headers: { 'Content-Type': 'application/json' },
            }).catch(() => {});
          }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
