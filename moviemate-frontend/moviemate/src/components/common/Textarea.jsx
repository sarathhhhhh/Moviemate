import styles from './Textarea.module.css';

/** Textarea – same API as Input (label, error, hint). */
export default function Textarea({
  label,
  error,
  hint,
  id,
  rows = 4,
  className = '',
  ...props
}) {
  const taId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={[styles.wrapper, error ? styles.hasError : '', className].join(' ')}>
      {label && (
        <label htmlFor={taId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea id={taId} rows={rows} className={styles.textarea} {...props} />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}
