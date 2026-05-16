import styles from './ProgressBar.module.css';

/**
 * ProgressBar
 * Props:
 *   value  - 0–100 number
 *   label  - optional string shown above
 *   showPercent - show the percentage text
 *   color  - optional hex override
 */
export default function ProgressBar({
  value = 0,
  label,
  showPercent = true,
  color,
  className = '',
}) {
  const clamped = Math.min(100, Math.max(0, value));
  const barColor = color ?? 'var(--color-primary)';

  return (
    <div className={[styles.wrapper, className].join(' ')}>
      {(label || showPercent) && (
        <div className={styles.meta}>
          {label  && <span className={styles.label}>{label}</span>}
          {showPercent && <span className={styles.percent}>{clamped}%</span>}
        </div>
      )}
      <div className={styles.track} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={styles.fill}
          style={{ width: `${clamped}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
