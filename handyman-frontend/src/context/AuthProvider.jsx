// src/context/AuthProvider.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import api from '../api/axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userData = localStorage.getItem('user');
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // If invalid data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        // This will run exactly once, after all above
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ── Login ──────────────────────────────────────
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, data } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(data);
    return response.data;
  };

  // ── Register ────────────────────────────────────
  const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    const { token, data } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(data);
    return response.data;
  };

  // ── Logout ─────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};