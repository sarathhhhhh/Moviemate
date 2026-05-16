import Badge from '../common/Badge';
import StarRating from '../common/StarRating';
import ProgressBar from '../common/ProgressBar';
import { STATUS, STATUS_LABELS, MEDIA_TYPES } from '../../constants/mediaConstants';
import { calcProgressPercent } from '../../utils/calculations';
import { formatDate } from '../../utils/formatters';
import styles from './MediaCard.module.css';

/**
 * MediaCard
 * Props:
 *   item     - media object from API
 *   onEdit   - (item) => void
 *   onDelete - (id) => void
 */
export default function MediaCard({ item, onEdit, onDelete }) {
  const isTVShow  = item.type === MEDIA_TYPES.TV_SHOW;
  const progress  = isTVShow && item.total_episodes
    ? calcProgressPercent(item.episodes_watched ?? 0, item.total_episodes)
    : null;

  return (
    <article className={`${styles.card} fade-in`}>
      {/* Poster / placeholder */}
      <div className={styles.poster}>
        {item.poster_url ? (
          <img src={item.poster_url} alt={item.title} className={styles.posterImg} />
        ) : (
          <div className={styles.posterPlaceholder}>
            <span>{isTVShow ? '📺' : '🎬'}</span>
          </div>
        )}
        <Badge status={item.status} className={styles.statusBadge}>
          {STATUS_LABELS[item.status]}
        </Badge>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.topRow}>
          <h3 className={styles.title} title={item.title}>{item.title}</h3>
          <div className={styles.cardActions}>
            <button className={styles.actionBtn} onClick={() => onEdit(item)} aria-label="Edit">✏️</button>
            <button className={styles.actionBtn} onClick={() => onDelete(item.id)} aria-label="Delete">🗑️</button>
          </div>
        </div>

        {/* Meta row */}
        <div className={styles.meta}>
          {item.director && <span className={styles.metaItem}>{item.director}</span>}
          {item.year     && <span className={styles.metaItem}>{item.year}</span>}
          {item.genre    && <span className={styles.metaItem}>{item.genre}</span>}
        </div>

        {/* Platform */}
        {item.platform && (
          <span className={styles.platform}>{item.platform}</span>
        )}

        {/* TV Show progress bar */}
        {isTVShow && item.total_episodes != null && (
          <ProgressBar
            value={progress}
            label={`${item.episodes_watched ?? 0} / ${item.total_episodes} eps`}
            className={styles.progress}
          />
        )}

        {/* Rating */}
        {item.rating != null && item.status === STATUS.COMPLETED && (
          <div className={styles.rating}>
            <StarRating value={item.rating} size="sm" />
          </div>
        )}

        {/* Review snippet */}
        {item.review && (
          <p className={styles.review}>"{item.review}"</p>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.date}>Updated {formatDate(item.updated_at)}</span>
        </div>
      </div>
    </article>
  );
}
