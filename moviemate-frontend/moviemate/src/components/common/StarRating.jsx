import { useState } from 'react';
import { MAX_RATING } from '../../constants/mediaConstants';
import styles from './StarRating.module.css';

/**
 * StarRating
 * Props:
 *   value    - current rating (0–5)
 *   onChange - (newRating) => void  (omit to make read-only)
 *   size     - 'sm' | 'md' | 'lg'
 */
export default function StarRating({
  value    = 0,
  onChange,
  size     = 'md',
  className = '',
}) {
  const [hovered, setHovered] = useState(null);
  const isReadOnly = !onChange;

  const displayValue = hovered ?? value;

  return (
    <div
      className={[styles.stars, styles[size], isReadOnly ? styles.readOnly : '', className].join(' ')}
      role={isReadOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} of ${MAX_RATING}`}
    >
      {Array.from({ length: MAX_RATING }, (_, i) => {
        const starValue = i + 1;
        const filled    = starValue <= displayValue;

        return (
          <button
            key={starValue}
            type="button"
            disabled={isReadOnly}
            className={[styles.star, filled ? styles.filled : styles.empty].join(' ')}
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => !isReadOnly && setHovered(starValue)}
            onMouseLeave={() => !isReadOnly && setHovered(null)}
            aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
