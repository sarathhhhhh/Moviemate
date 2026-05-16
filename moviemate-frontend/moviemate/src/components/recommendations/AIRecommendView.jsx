import RecommendationCard from './RecommendationCard';
import Button from '../common/Button';
import styles from './AIRecommendView.module.css';

/**
 * AIRecommendView
 * Props:
 *   recommendations - array of recommendation objects
 *   isLoading       - boolean
 *   error           - string | null
 *   onRefresh       - () => void  (re-fetch)
 */
export default function AIRecommendView({ recommendations, isLoading, error, onRefresh }) {
  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p className={styles.loadingText}>Analysing your watch history…</p>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className={styles.centered}>
        <span className={styles.errorIcon}>⚠️</span>
        <p className={styles.errorText}>{error}</p>
        <Button onClick={onRefresh} variant="secondary">Try Again</Button>
      </div>
    );
  }

  /* ── Empty ── */
  if (!recommendations?.length) {
    return (
      <div className={styles.centered}>
        <span className={styles.emptyIcon}>🤔</span>
        <p className={styles.emptyTitle}>Not enough data yet</p>
        <p className={styles.emptyText}>
          Complete a few movies or shows and rate them — then come back for personalised picks.
        </p>
      </div>
    );
  }

  /* ── Results ── */
  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <p className={styles.subtitle}>
          Based on your watch history and ratings
        </p>
        <Button variant="ghost" size="sm" onClick={onRefresh} icon={<span>🔄</span>}>
          Refresh
        </Button>
      </div>

      <div className={styles.grid}>
        {recommendations.map((item, i) => (
          <RecommendationCard key={item.title + i} item={item} />
        ))}
      </div>
    </div>
  );
}
