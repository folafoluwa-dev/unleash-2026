import { useCallback } from 'react';
import axiosInstance from './axiosInstance';

export function useApi() {
  const authFetch = useCallback(async (url, options = {}) => {
    const method = options.method || 'GET';
    const data = options.body ? JSON.parse(options.body) : undefined;

    const config = {
      method,
      url,
      data,
      // Axios handles headers automatically via interceptor
    };

    const response = await axiosInstance(config);
    return response.data;
  }, []);

  return authFetch;
}