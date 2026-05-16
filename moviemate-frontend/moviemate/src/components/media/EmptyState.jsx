import styles from './EmptyState.module.css';

/**
 * EmptyState
 * Props:
 *   title   - override headline
 *   message - override body text
 *   action  - ReactNode (e.g. Add button)
 */
export default function EmptyState({
  title   = 'Nothing here yet',
  message = 'Add your first movie or TV show to get started.',
  action,
}) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>🎞️</span>
      <h3 className={styles.title}>{title}</h3>
      <p  className={styles.message}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
