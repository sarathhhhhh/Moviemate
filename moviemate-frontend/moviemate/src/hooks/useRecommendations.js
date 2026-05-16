import { useState, useEffect } from 'react';
import { getRecommendations } from '../api/mediaApi';

/**
 * useRecommendations
 * Fetches AI-powered recommendations from the Django backend.
 *
 * Returns: { recommendations, isLoading, error, refresh }
 */
export function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading,       setIsLoading]       = useState(true);
  const [error,           setError]           = useState(null);

  async function fetchRecommendations() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecommendations();
      setRecommendations(data.recommendations ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchRecommendations(); }, []);

  return {
    recommendations,
    isLoading,
    error,
    refresh: fetchRecommendations,
  };
}
