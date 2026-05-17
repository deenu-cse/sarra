"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../lib/axiosInstance';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await axiosInstance.post('/auth/refresh-token');
        const { accessToken } = data.data;

        if (typeof window !== 'undefined') {
          window.__SARRA_ACCESS_TOKEN__ = accessToken;
        }

        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        setUser({
          id: payload.adminId,
          email: payload.email,
          role: payload.role,
        });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { user: userData, accessToken } = response.data.data;

      if (typeof window !== 'undefined') {
        window.__SARRA_ACCESS_TOKEN__ = accessToken;
      }

      setUser(userData);
      toast.success('Login successful!');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setUser(null);
      if (typeof window !== 'undefined') {
        window.__SARRA_ACCESS_TOKEN__ = null;
      }
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
