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

// Helper to generate cURL
const getCurl = (config: AxiosRequestConfig) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = `${config.baseURL}${config.url}`;
  const headers = Object.entries(config.headers || {})
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(' ');
  const body = config.data ? `-d '${JSON.stringify(config.data)}'` : '';
  return `curl -X ${method} "${url}" ${headers} ${body}`;
};

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const correlationId = crypto.randomUUID();
  const startTime = Date.now();

  // Attach metadata for logging
  (config as any).metadata = { startTime, correlationId };

  // Attach Auth Token
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

    // Persist Log (Client-side trigger to a server-side action)
    if (typeof window !== 'undefined') {
      const logData = {
        correlationId: metadata.correlationId,
        method: response.config.method?.toUpperCase() || 'GET',
        endpoint: response.config.url || '',
        fullUrl: `${response.config.baseURL}${response.config.url}`,
        headers: response.config.headers,
        params: response.config.params,
        requestBody: response.config.data,
        responseBody: response.data,
        status: response.status,
        duration,
        curl: getCurl(response.config),
      };

      // Send log to our local DB via Next.js API route
      fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify(logData),
        headers: { 'Content-Type': 'application/json' },
      }).catch(console.error);
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
            fullUrl: `${error.config.baseURL}${error.config.url}`,
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

          fetch('/api/logs', {
            method: 'POST',
            body: JSON.stringify(logData),
            headers: { 'Content-Type': 'application/json' },
          }).catch(console.error);
    }

    // Handle Token Refresh
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
           // Implement refresh logic here based on ThingsBoard docs
           // const { data } = await axios.post('/api/auth/token', { refreshToken });
           // localStorage.setItem('jwt_token', data.token);
           // return apiClient(error.config);
        }
      } catch (refreshError) {
        // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
