// ─── formatters.js ────────────────────────────────────────────────
// Pure display-formatting helpers. No side effects.

/** Format minutes into "2h 15m" style. */
export function formatDuration(totalMinutes) {
  if (!totalMinutes || totalMinutes <= 0) return '—';
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/** Format an ISO date string to "Jan 12, 2024". */
export function formatDate(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

/** Capitalize the first letter of a string. */
export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Convert a snake_case or camelCase string to "Title Case". */
export function toTitleCase(str = '') {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Format a rating number to one decimal place. */
export function formatRating(rating) {
  if (rating == null) return '—';
  return Number(rating).toFixed(1);
}

/** Return "X episode(s)" with correct pluralization. */
export function formatEpisodes(count) {
  if (count == null) return '—';
  return `${count} episode${count !== 1 ? 's' : ''}`;
}
