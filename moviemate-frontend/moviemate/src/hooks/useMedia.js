import { useState, useEffect, useCallback } from 'react';
import {
  getMediaList, createMedia, updateMedia, deleteMedia,
} from '../api/mediaApi';
import { filterMedia, sortMedia } from '../utils/helpers';
import { SORT_OPTIONS } from '../constants/mediaConstants';

/** Default filter/sort state */
const DEFAULT_FILTERS = {
  search:   '',
  genre:    '',
  platform: '',
  status:   '',
  type:     '',
  sort:     SORT_OPTIONS[0].value,
};

/**
 * useMedia
 * Manages the full media collection: fetching, creating, updating, deleting,
 * and client-side filtering/sorting.
 *
 * Returns:
 *   items         - filtered + sorted media array for display
 *   allItems      - raw unfiltered array (used for counts/tabs)
 *   isLoading     - initial load in progress
 *   error         - fetch error string or null
 *   filters       - current filter state object
 *   setFilter     - (key, value) => void
 *   resetFilters  - () => void
 *   saveMedia     - async (data) => void  (create or update)
 *   removeMedia   - async (id) => void
 */
export function useMedia() {
  const [allItems,  setAllItems]  = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState(null);
  const [filters,   setFilters]   = useState(DEFAULT_FILTERS);

  /* ── Fetch all media on mount ── */
  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMediaList();
      setAllItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  /* ── Filter + sort derived array ── */
  const items = sortMedia(filterMedia(allItems, filters), filters.sort);

  /* ── Filter helpers ── */
  function setFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }
  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  /* ── Create or Update ── */
  async function saveMedia(data) {
    if (data.id) {
      // Edit existing
      const updated = await updateMedia(data.id, data);
      setAllItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } else {
      // Create new
      const created = await createMedia(data);
      setAllItems((prev) => [created, ...prev]);
    }
  }

  /* ── Delete ── */
  async function removeMedia(id) {
    await deleteMedia(id);
    setAllItems((prev) => prev.filter((item) => item.id !== id));
  }

  return {
    items,
    allItems,
    isLoading,
    error,
    filters,
    setFilter,
    resetFilters,
    saveMedia,
    removeMedia,
    refresh: fetchMedia,
  };
}
