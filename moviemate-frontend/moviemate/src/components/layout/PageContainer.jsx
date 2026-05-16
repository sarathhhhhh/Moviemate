import styles from './PageContainer.module.css';

/**
 * PageContainer
 * Wraps every page with consistent max-width, padding, and entrance animation.
 * Props:
 *   title    - page heading
 *   subtitle - optional subheading
 *   actions  - ReactNode (e.g. Add button) placed top-right
 */
export default function PageContainer({ title, subtitle, actions, children }) {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Page header row */}
        {(title || actions) && (
          <div className={styles.pageHeader}>
            <div>
              {title    && <h1 className={styles.title}>{title}</h1>}
              {subtitle && <p  className={styles.subtitle}>{subtitle}</p>}
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
        )}

        {/* Page content */}
        <div className={`${styles.content} fade-in`}>{children}</div>
      </div>
    </main>
  );
}
