// ─── Media Type ──────────────────────────────────────────────────
export const MEDIA_TYPES = {
  MOVIE:   'movie',
  TV_SHOW: 'tv',
};

export const MEDIA_TYPE_LABELS = {
  [MEDIA_TYPES.MOVIE]:   'Movie',
  [MEDIA_TYPES.TV_SHOW]: 'TV Show',
};

// ─── Watch Status ─────────────────────────────────────────────────
export const STATUS = {
  WATCHING:   'watching',
  COMPLETED:  'completed',
  WISHLIST:   'wishlist',
  DROPPED:    'dropped',
};

export const STATUS_LABELS = {
  [STATUS.WATCHING]:  'Watching',
  [STATUS.COMPLETED]: 'Completed',
  [STATUS.WISHLIST]:  'Wishlist',
  [STATUS.DROPPED]:   'Dropped',
};

export const STATUS_COLORS = {
  [STATUS.WATCHING]:  '#5b8dee',
  [STATUS.COMPLETED]: '#4caf7d',
  [STATUS.WISHLIST]:  '#e8a045',
  [STATUS.DROPPED]:   '#e05c5c',
};

// ─── Genres ───────────────────────────────────────────────────────
export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
  'Romance', 'Sci-Fi', 'Thriller', 'Western',
];

// ─── Platforms ────────────────────────────────────────────────────
export const PLATFORMS = [
  'Netflix', 'Prime Video', 'Disney+', 'HBO Max',
  'Apple TV+', 'Hulu', 'Peacock', 'Paramount+',
  'Crunchyroll', 'YouTube', 'Other',
];

// ─── Sort Options ─────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { value: 'updated_at_desc', label: 'Recently Updated' },
  { value: 'title_asc',       label: 'Title A–Z' },
  { value: 'title_desc',      label: 'Title Z–A' },
  { value: 'rating_desc',     label: 'Highest Rated' },
  { value: 'year_desc',       label: 'Newest First' },
];

// ─── Ratings ──────────────────────────────────────────────────────
export const MAX_RATING = 5;
