// ─── helpers.js ───────────────────────────────────────────────────
// Miscellaneous utilities that don't fit neatly elsewhere.

/**
 * Returns a debounced version of `fn` that only fires after
 * `delay` ms of inactivity.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Sort an array of media objects.
 * @param {Object[]} items
 * @param {string}   sortKey  - one of the SORT_OPTIONS values
 */
export function sortMedia(items, sortKey) {
  const arr = [...items]; // avoid mutating original

  switch (sortKey) {
    case 'title_asc':
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    case 'title_desc':
      return arr.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating_desc':
      return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case 'year_desc':
      return arr.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    case 'updated_at_desc':
    default:
      return arr.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
}

/**
 * Client-side filter for media items.
 * All filters are optional; passing '' or null skips that filter.
 */
export function filterMedia(items, { search, genre, platform, status, type }) {
  return items.filter((item) => {
    if (search   && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (genre    && item.genre    !== genre)    return false;
    if (platform && item.platform !== platform) return false;
    if (status   && item.status   !== status)   return false;
    if (type     && item.type     !== type)     return false;
    return true;
  });
}

/** Generate a temporary local id (used before the server responds). */
export function tempId() {
  return `temp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}
