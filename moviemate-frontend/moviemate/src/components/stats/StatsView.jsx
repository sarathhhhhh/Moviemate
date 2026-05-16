import StatsCard    from './StatsCard';
import GenreStats   from './GenreStats';
import PlatformStats from './PlatformStats';
import { formatDuration } from '../../utils/formatters';
import styles from './StatsView.module.css';

/**
 * StatsView
 * Props:
 *   stats - object returned by /api/stats/
 *            { total, completed, watching, wishlist, total_watch_time_minutes,
 *              avg_rating, by_genre: [{genre, count}], by_platform: [{platform, count}] }
 */
export default function StatsView({ stats }) {
  if (!stats) return null;

  const summaryCards = [
    { label: 'Total Titles',     value: stats.total ?? 0,                             icon: '🎞️',  accent: 'var(--color-primary)' },
    { label: 'Completed',        value: stats.completed ?? 0,                          icon: '✅',  accent: 'var(--color-success)' },
    { label: 'Watching',         value: stats.watching ?? 0,                           icon: '▶️',  accent: 'var(--color-accent)'  },
    { label: 'Wishlist',         value: stats.wishlist ?? 0,                           icon: '🔖',  accent: 'var(--color-warning)' },
    { label: 'Watch Time',       value: formatDuration(stats.total_watch_time_minutes), icon: '⏱️', accent: '#b07fe8'              },
    { label: 'Avg Rating',       value: stats.avg_rating ? `${stats.avg_rating} ★` : '—', icon: '⭐', accent: 'var(--color-primary)' },
  ];

  return (
    <div className={styles.view}>
      {/* Summary row */}
      <div className={styles.cardsGrid}>
        {summaryCards.map((card) => (
          <StatsCard key={card.label} {...card} />
        ))}
      </div>

      {/* Detail panels */}
      <div className={styles.detailGrid}>
        <GenreStats    data={stats.by_genre    ?? []} />
        <PlatformStats data={stats.by_platform ?? []} />
      </div>
    </div>
  );
}
