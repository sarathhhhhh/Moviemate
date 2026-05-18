import { useState, useEffect } from 'react';
import Input       from '../common/Input';
import Select      from '../common/Select';
import Textarea    from '../common/Textarea';
import StarRating  from '../common/StarRating';
import Button      from '../common/Button';
import {
  GENRES, PLATFORMS, STATUS, STATUS_LABELS, MEDIA_TYPES, MEDIA_TYPE_LABELS,
} from '../../constants/mediaConstants';
import styles from './MediaForm.module.css';
import TMDBSearch from './TMDBSearch';
/** Default empty form state */
const EMPTY_FORM = {
  title:            '',
  type:             MEDIA_TYPES.MOVIE,
  director:         '',
  genre:            '',
  platform:         '',
  year:             '',
  status:           STATUS.WISHLIST,
  rating:           0,
  review:           '',
  total_episodes:   '',
  episodes_watched: '',
  poster_url:       '',
};

/** Validate required fields; returns { field: message } */
function validate(data) {
  const errors = {};
  if (!data.title.trim())   errors.title  = 'Title is required.';
  if (!data.genre)          errors.genre  = 'Please pick a genre.';
  if (!data.platform)       errors.platform = 'Please pick a platform.';
  if (data.year && (isNaN(data.year) || data.year < 1888 || data.year > 2100))
    errors.year = 'Enter a valid year.';
  return errors;
}

/**
 * MediaForm
 * Props:
 *   initialData - media object (null = create mode)
 *   onSubmit    - async (formData) => void
 *   onClose     - () => void
 *   isLoading   - boolean (submit in progress)
 */
export default function MediaForm({ initialData = null, onSubmit, onClose, isLoading }) {
  const [form,   setForm]   = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing an existing item
  useEffect(() => {
    if (initialData) {
      setForm({ ...EMPTY_FORM, ...initialData });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [initialData]);

  const isTVShow = form.type === MEDIA_TYPES.TV_SHOW;

  /** Generic field updater */
  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
    // When user picks a TMDB result, pre-fill matching form fields

  }
  function handleTMDBSelect(tmdbItem) {
  setForm((prev) => ({
    ...prev,
    title:      tmdbItem.title      || prev.title,
    type:       tmdbItem.type       || prev.type,
    year:       tmdbItem.year       || prev.year,
    director:   tmdbItem.director   || prev.director,
    poster_url: tmdbItem.poster_url || prev.poster_url,
  }));
}

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Clean up: remove episode fields for movies
    const payload = { ...form };
    if (!isTVShow) {
      delete payload.total_episodes;
      delete payload.episodes_watched;
    }
    // Convert numeric strings to numbers
    payload.year             = payload.year             ? Number(payload.year)             : null;
    payload.total_episodes   = payload.total_episodes   ? Number(payload.total_episodes)   : null;
    payload.episodes_watched = payload.episodes_watched ? Number(payload.episodes_watched) : null;
    payload.rating           = payload.rating           ? Number(payload.rating)           : null;

    await onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.tmdbSection}>
  <p className={styles.tmdbLabel}>🎬 Search to auto-fill from TMDB</p>
  <TMDBSearch onSelect={handleTMDBSelect} />
  <p className={styles.tmdbHint}>Pick a result to fill title, year, type and poster — then complete the rest.</p>
</div>
      {/* Type toggle */}
      <div className={styles.typeToggle}>
        {Object.entries(MEDIA_TYPE_LABELS).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={[styles.typeBtn, form.type === value ? styles.typeActive : ''].join(' ')}
            onClick={() => set('type', value)}
          >
            {value === MEDIA_TYPES.MOVIE ? '🎬' : '📺'} {label}
          </button>
        ))}
      </div>

      {/* Row 1: Title + Year */}
      <div className={styles.row}>
        <Input
          label="Title *"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Inception"
          error={errors.title}
          className={styles.flex3}
        />
        <Input
          label="Year"
          type="number"
          value={form.year}
          onChange={(e) => set('year', e.target.value)}
          placeholder="2024"
          error={errors.year}
          className={styles.flex1}
        />
      </div>

      {/* Director */}
      <Input
        label="Director / Creator"
        value={form.director}
        onChange={(e) => set('director', e.target.value)}
        placeholder="e.g. Christopher Nolan"
      />

      {/* Row 2: Genre + Platform */}
      <div className={styles.row}>
        <Select
          label="Genre *"
          value={form.genre}
          options={GENRES}
          error={errors.genre}
          onChange={(e) => set('genre', e.target.value)}
          className={styles.flex1}
        />
        <Select
          label="Platform *"
          value={form.platform}
          options={PLATFORMS}
          error={errors.platform}
          onChange={(e) => set('platform', e.target.value)}
          className={styles.flex1}
        />
      </div>

      {/* Status */}
      <Select
        label="Status"
        value={form.status}
        options={Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label }))}
        onChange={(e) => set('status', e.target.value)}
      />

      {/* TV Show: episode tracking */}
      {isTVShow && (
        <div className={styles.row}>
          <Input
            label="Total Episodes"
            type="number"
            value={form.total_episodes}
            onChange={(e) => set('total_episodes', e.target.value)}
            placeholder="e.g. 62"
            className={styles.flex1}
          />
          <Input
            label="Watched Episodes"
            type="number"
            value={form.episodes_watched}
            onChange={(e) => set('episodes_watched', e.target.value)}
            placeholder="e.g. 24"
            className={styles.flex1}
          />
        </div>
      )}

      {/* Rating (only for completed) */}
      {form.status === STATUS.COMPLETED && (
        <div className={styles.ratingRow}>
          <span className={styles.ratingLabel}>Your Rating</span>
          <StarRating
            value={form.rating}
            onChange={(v) => set('rating', v)}
            size="lg"
          />
        </div>
      )}

      {/* Review / Notes */}
      <Textarea
        label="Review / Notes"
        value={form.review}
        onChange={(e) => set('review', e.target.value)}
        placeholder="Write a short review or notes…"
        rows={3}
      />

      {/* Poster URL */}
      <Input
        label="Poster URL"
        type="url"
        value={form.poster_url}
        onChange={(e) => set('poster_url', e.target.value)}
        placeholder="https://…"
        hint="Paste a direct image URL (TMDB, OMDB, etc.)"
      />

      {/* Footer actions */}
      <div className={styles.formFooter}>
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          {initialData ? 'Save Changes' : 'Add to Collection'}
        </Button>
      </div>
    </form>
  );
}
