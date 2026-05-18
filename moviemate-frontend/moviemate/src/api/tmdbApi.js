const OMDB_KEY  = import.meta.env.VITE_OMDB_KEY;
const OMDB_BASE = `https://www.omdbapi.com`;

/** Search by title — returns basic results */
export async function searchTMDB(query) {
  if (!query || query.length < 2) return [];

  const res  = await fetch(`${OMDB_BASE}/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`);
  const data = await res.json();

  if (data.Response === 'False') return [];

  // Fetch full details for each result to get director, genre, etc.
  const detailed = await Promise.all(
    (data.Search ?? [])
      .filter((r) => r.Type === 'movie' || r.Type === 'series')
      .slice(0, 8)
      .map((r) => fetchDetails(r.imdbID))
  );

  return detailed.filter(Boolean);
}

/** Fetch full detail for one item by imdbID */
async function fetchDetails(imdbID) {
  const res  = await fetch(`${OMDB_BASE}/?i=${imdbID}&apikey=${OMDB_KEY}`);
  const r    = await res.json();
  if (r.Response === 'False') return null;

  const isTV = r.Type === 'series';
  return {
    tmdb_id:    r.imdbID,
    title:      r.Title,
    type:       isTV ? 'tv' : 'movie',
    year:       parseInt(r.Year) || null,
    poster_url: r.Poster !== 'N/A' ? r.Poster : '',
    // Director is "N/A" for some TV shows — clean it up
    director:   r.Director !== 'N/A' ? r.Director : '',
    genre:      r.Genre?.split(',')[0].trim() ?? '',  // OMDB returns "Action, Drama" — take first
  };
}