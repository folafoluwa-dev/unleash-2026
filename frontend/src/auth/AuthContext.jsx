import { createContext, useContext, useState, useCallback } from 'react';
import { login as loginApi, refreshToken as refreshTokenApi } from './authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('access_token') || null;
  });
  const [refreshTokenValue, setRefreshTokenValue] = useState(() => {
    return localStorage.getItem('refresh_token') || null;
  });

  const isAuthenticated = !!accessToken;

  const login = useCallback(async (username, password) => {
    const tokens = await loginApi(username, password);
    setAccessToken(tokens.access);
    setRefreshTokenValue(tokens.refresh);
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshTokenValue(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect handled by routing later
  }, []);

  const refreshAccessToken = useCallback(async () => {
    if (!refreshTokenValue) throw new Error('No refresh token');
    try {
      const newAccess = await refreshTokenApi(refreshTokenValue);
      setAccessToken(newAccess);
      localStorage.setItem('access_token', newAccess);
      return newAccess;
    } catch (error) {
      logout();
      throw error;
    }
  }, [refreshTokenValue, logout]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, refreshToken: refreshTokenValue, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};