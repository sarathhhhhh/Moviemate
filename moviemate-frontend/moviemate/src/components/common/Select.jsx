import styles from './Select.module.css';

/**
 * Select
 * Props:
 *   label   - string
 *   error   - string
 *   options - [{ value, label }] or ['string', ...]
 */
export default function Select({
  label,
  error,
  options = [],
  placeholder = 'Select…',
  id,
  className = '',
  ...props
}) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  // Support both string arrays and { value, label } arrays
  const normalised = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  return (
    <div className={[styles.wrapper, error ? styles.hasError : '', className].join(' ')}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrap}>
        <select id={selectId} className={styles.select} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {normalised.map(({ value, label: lbl }) => (
            <option key={value} value={value}>
              {lbl}
            </option>
          ))}
        </select>
        <span className={styles.arrow}>▾</span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
