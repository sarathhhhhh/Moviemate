import styles from './RecommendationCard.module.css';

/**
 * RecommendationCard
 * Props:
 *   item - { title, type, genre, reason, poster_url, year, platform }
 */
export default function RecommendationCard({ item }) {
  return (
    <article className={`${styles.card} fade-in`}>
      {/* Poster */}
      <div className={styles.poster}>
        {item.poster_url ? (
          <img src={item.poster_url} alt={item.title} className={styles.posterImg} />
        ) : (
          <div className={styles.posterPlaceholder}>
            {item.type === 'tv_show' ? '📺' : '🎬'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>

        <div className={styles.meta}>
          {item.year     && <span>{item.year}</span>}
          {item.genre    && <span>{item.genre}</span>}
          {item.platform && <span className={styles.platform}>{item.platform}</span>}
        </div>

        {/* AI-generated reason */}
        {item.reason && (
          <p className={styles.reason}>
            <span className={styles.aiIcon}>✨</span>
            {item.reason}
          </p>
        )}
      </div>
    </article>
  );
}
