"use client";

import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'sonner';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
