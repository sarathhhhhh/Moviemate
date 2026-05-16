import { useState, useEffect } from 'react';
import { getStats } from '../api/mediaApi';

export function useStats() {
  const [stats,     setStats]     = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState(null);

  async function fetchStats() {
    setIsLoading(true);
    setError(null);
    try {
      const raw = await getStats();

      // Transform backend shape → frontend shape
      const stats = {
        ...raw,
        by_genre: Object.entries(raw.genres ?? {})
          .map(([genre, count]) => ({ genre, count }))
          .sort((a, b) => b.count - a.count),
        by_platform: Object.entries(raw.platforms ?? {})
          .map(([platform, count]) => ({ platform, count }))
          .sort((a, b) => b.count - a.count),
      };
      setStats(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, []);
  return { stats, isLoading, error, refresh: fetchStats };
}