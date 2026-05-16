import styles from './StatsCard.module.css';

/**
 * StatsCard
 * Props:
 *   label   - string
 *   value   - string | number
 *   icon    - emoji or ReactNode
 *   accent  - CSS color string
 */
export default function StatsCard({ label, value, icon, accent }) {
  return (
    <div className={styles.card} style={{ '--accent': accent ?? 'var(--color-primary)' }}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
