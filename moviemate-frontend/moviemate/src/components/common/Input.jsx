import styles from './Input.module.css';

/**
 * Input
 * Props:
 *   label     - string
 *   error     - string (validation message)
 *   icon      - ReactNode (left icon)
 *   hint      - string (helper text below)
 */
export default function Input({
  label,
  error,
  icon,
  hint,
  id,
  className = '',
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={[styles.wrapper, error ? styles.hasError : '', className].join(' ')}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          className={[styles.input, icon ? styles.withIcon : ''].join(' ')}
          {...props}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
