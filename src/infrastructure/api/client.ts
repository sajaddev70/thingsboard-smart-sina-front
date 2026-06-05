import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export interface ApiRequestMetadata {
  startTime: number;
  correlationId: string;
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
    if (value && key !== 'common' && key !== 'delete' && key !== 'get' && key !== 'head' && key !== 'post' && key !== 'put' && key !== 'patch') {
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
  (config as any).metadata = { startTime, correlationId };

  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;
  if (token) {
    config.headers['X-Authorization'] = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  async (response) => {
    const metadata = (response.config as any).metadata as ApiRequestMetadata;
    const duration = Date.now() - metadata.startTime;

    const logData = {
      correlationId: metadata.correlationId,
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
      }).catch(() => {}); // Silent catch for logger
    }

    return response;
  },
  async (error) => {
    const metadata = (error.config as any)?.metadata as ApiRequestMetadata;
    const duration = metadata ? Date.now() - metadata.startTime : 0;

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
