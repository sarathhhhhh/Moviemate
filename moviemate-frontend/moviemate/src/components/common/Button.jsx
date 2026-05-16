import styles from './Button.module.css';

/**
 * Button
 * Props:
 *   variant  - 'primary' | 'secondary' | 'ghost' | 'danger'
 *   size     - 'sm' | 'md' | 'lg'
 *   loading  - boolean
 *   icon     - ReactNode (left icon)
 *   fullWidth- boolean
 */
export default function Button({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      className={[
        styles.btn,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        loading   ? styles.loading   : '',
        className,
      ].join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
