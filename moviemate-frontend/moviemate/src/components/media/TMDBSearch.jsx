import { useState, useEffect, useRef } from 'react';
import { searchTMDB } from '../../api/tmdbApi';
import { debounce } from '../../utils/helpers';
import styles from './TMDBSearch.module.css';

/**
 * TMDBSearch
 * A search-as-you-type input that shows TMDB results as a dropdown.
 * When the user picks a result, onSelect(normalisedItem) is called —
 * the parent (MediaForm) uses it to pre-fill the form fields.
 */
export default function TMDBSearch({ onSelect }) {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);
  const wrapperRef = useRef(null);

  // Debounced search — fires 400ms after user stops typing
  const search = useRef(
    debounce(async (q) => {
      if (!q) { setResults([]); return; }
      setLoading(true);
      try {
        const data = await searchTMDB(q);
        setResults(data);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  useEffect(() => { search(query); }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(item) {
    onSelect(item);       // send data up to MediaForm
    setQuery(item.title); // show selected title in input
    setOpen(false);
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.inputRow}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.input}
          placeholder="Search TMDB to auto-fill…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
        />
        {loading && <span className={styles.spinner} />}
        {query && (
          <button className={styles.clear} onClick={() => { setQuery(''); setResults([]); }}>✕</button>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((item) => (
            <li key={item.tmdb_id} className={styles.item} onClick={() => handleSelect(item)}>
              {item.poster_url
                ? <img src={item.poster_url} alt="" className={styles.thumb} />
                : <div className={styles.thumbPlaceholder}>{item.type === 'tv' ? '📺' : '🎬'}</div>
              }
              <div className={styles.itemInfo}>
                <span className={styles.itemTitle}>{item.title}</span>
                <span className={styles.itemMeta}>
                  {item.type === 'tv' ? 'TV Show' : 'Movie'}
                  {item.year ? ` · ${item.year}` : ''}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}