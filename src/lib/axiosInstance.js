import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies for authenticated endpoints (MPR pages)
  timeout: 30000,
});

// Request interceptor - attach access token if available (for MPR forms)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? window.__SARRA_ACCESS_TOKEN__ : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - try silent token refresh on 401
// Does NOT force redirect to login — public pages work without auth
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh if we had a token (i.e. user was logged in)
    const hadToken = typeof window !== 'undefined' && window.__SARRA_ACCESS_TOKEN__;

    if (error.response?.status === 401 && !originalRequest._retry && hadToken) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = data.data.accessToken;
        if (typeof window !== 'undefined') {
          window.__SARRA_ACCESS_TOKEN__ = newAccessToken;
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        // Refresh failed — clear token silently, don't redirect
        if (typeof window !== 'undefined') {
          window.__SARRA_ACCESS_TOKEN__ = null;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
