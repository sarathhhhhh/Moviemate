import styles from './Tabs.module.css';

/**
 * Tabs
 * Props:
 *   tabs     - [{ value, label, count? }]
 *   active   - current active value
 *   onChange - (value) => void
 */
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          className={[styles.tab, active === tab.value ? styles.active : ''].join(' ')}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
          {tab.count != null && (
            <span className={styles.count}>{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
