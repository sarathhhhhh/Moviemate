import Input   from '../common/Input';
import Select  from '../common/Select';
import Button  from '../common/Button';
import {
  GENRES, PLATFORMS, STATUS_LABELS, SORT_OPTIONS, MEDIA_TYPE_LABELS,
} from '../../constants/mediaConstants';
import styles from './MediaFilters.module.css';

/** Build select options array from a key→label map */
function fromMap(map) {
  return [
    { value: '', label: 'All' },
    ...Object.entries(map).map(([value, label]) => ({ value, label })),
  ];
}

/**
 * MediaFilters
 * Props:
 *   filters  - { search, genre, platform, status, type, sort }
 *   onChange - (key, value) => void
 *   onReset  - () => void
 */
export default function MediaFilters({ filters, onChange, onReset }) {
  const hasActiveFilters =
    filters.search || filters.genre || filters.platform ||
    filters.status || filters.type;

  return (
    <div className={styles.filters}>
      {/* Search */}
      <Input
        placeholder="Search titles…"
        value={filters.search}
        onChange={(e) => onChange('search', e.target.value)}
        icon={<span>🔍</span>}
        className={styles.searchInput}
      />

      {/* Dropdowns row */}
      <div className={styles.dropdowns}>
        <Select
          placeholder="Type"
          value={filters.type}
          options={fromMap(MEDIA_TYPE_LABELS)}
          onChange={(e) => onChange('type', e.target.value)}
        />
        <Select
          placeholder="Status"
          value={filters.status}
          options={fromMap(STATUS_LABELS)}
          onChange={(e) => onChange('status', e.target.value)}
        />
        <Select
          placeholder="Genre"
          value={filters.genre}
          options={[{ value: '', label: 'All Genres' }, ...GENRES.map((g) => ({ value: g, label: g }))]}
          onChange={(e) => onChange('genre', e.target.value)}
        />
        <Select
          placeholder="Platform"
          value={filters.platform}
          options={[{ value: '', label: 'All Platforms' }, ...PLATFORMS.map((p) => ({ value: p, label: p }))]}
          onChange={(e) => onChange('platform', e.target.value)}
        />
        <Select
          placeholder="Sort by"
          value={filters.sort}
          options={SORT_OPTIONS}
          onChange={(e) => onChange('sort', e.target.value)}
        />

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
