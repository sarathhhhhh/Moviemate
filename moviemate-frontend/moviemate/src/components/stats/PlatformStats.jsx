import styles from './PlatformStats.module.css';

// Platform brand colours (best effort approximations)
const PLATFORM_COLORS = {
  'Netflix':       '#e50914',
  'Prime Video':   '#00a8e0',
  'Disney+':       '#113ccf',
  'HBO Max':       '#5822b4',
  'Apple TV+':     '#555',
  'Hulu':          '#1ce783',
  'Peacock':       '#f47521',
  'Paramount+':    '#0064ff',
  'Crunchyroll':   '#f47521',
  'YouTube':       '#ff0000',
};

/**
 * PlatformStats
 * Props:
 *   data - [{ platform, count }] sorted descending
 */
export default function PlatformStats({ data = [] }) {
  if (!data.length) return null;
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className={styles.section}>
      <h3 className={styles.heading}>By Platform</h3>
      <div className={styles.list}>
        {data.map(({ platform, count }) => {
          const color   = PLATFORM_COLORS[platform] ?? 'var(--color-accent)';
          const percent = Math.round((count / total) * 100);

          return (
            <div key={platform} className={styles.row}>
              <span className={styles.dot} style={{ background: color }} />
              <span className={styles.label}>{platform}</span>
              <span className={styles.count}>{count}</span>
              <span className={styles.percent}>{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
