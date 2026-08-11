import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../services/api';

/**
 * Custom hook for GET requests with the authenticated API client.
 * @param {string} url - endpoint path (relative to API base)
 * @param {Array} deps - additional dependency array to trigger refetch
 * @returns {{ data, loading, error, endpointMissing, refetch }}
 */
export function useApiGet(url, deps = []) {
  const authFetch = useApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [endpointMissing, setEndpointMissing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setEndpointMissing(false);
    try {
      const result = await authFetch(url);
      setData(result);
    } catch (err) {
      if (err.status === 404) {
        setEndpointMissing(true);
        setData(null);
      } else {
        setError(err.message || 'Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  }, [authFetch, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  return { data, loading, error, endpointMissing, refetch: fetchData };
}