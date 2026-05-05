import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://sarrabackend.onrender.com/api/v1',
  withCredentials: true, // Important for cookies (refreshToken, accessToken)
});

// Interceptor to handle access token
axiosInstance.interceptors.request.use(
  (config) => {
    // You can also add token from localStorage if you stored it there
    // But since we use withCredentials, cookies might be enough if backend reads from cookies.
    // However, our backend might expect Authorization: Bearer <token>.
    // Wait, in auth.middleware.js, we check:
    // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // So cookies are enough! But let's also pass from localStorage just in case.
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token refresh on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post('https://sarrabackend.onrender.com/api/v1/auth/refresh-token', {}, { withCredentials: true });
        const newAccessToken = data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh failed, logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
