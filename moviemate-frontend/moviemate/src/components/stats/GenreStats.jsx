import styles from './GenreStats.module.css';

/**
 * GenreStats
 * Props:
 *   data - [{ genre, count }] sorted descending
 */
export default function GenreStats({ data = [] }) {
  if (!data.length) return null;
  const max = data[0].count;

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>By Genre</h3>
      <div className={styles.list}>
        {data.map(({ genre, count }) => (
          <div key={genre} className={styles.row}>
            <span className={styles.label}>{genre}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.bar}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className={styles.count}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
