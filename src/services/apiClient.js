import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const ENDPOINTS = {
  GIGS: '/api/gigs',
  ADMIN_LOGIN: '/api/auth/login',
  ADMIN_REGISTER: '/api/auth/register',
};

// Generic helper methods
export const get = async (endpoint, params = {}) => {
  const response = await apiClient.get(endpoint, { params });
  return response.data;
};

export const post = async (endpoint, data) => {
  const response = await apiClient.post(endpoint, data);
  return response.data;
};

export const put = async (endpoint, data) => {
  const response = await apiClient.put(endpoint, data);
  return response.data;
};

export const del = async (endpoint) => {
  const response = await apiClient.delete(endpoint);
  return response.data;
};

export default apiClient;
