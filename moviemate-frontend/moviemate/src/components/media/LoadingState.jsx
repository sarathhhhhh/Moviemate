import styles from './LoadingState.module.css';

/** Renders a grid of skeleton placeholder cards. */
export default function LoadingState({ count = 8 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.skeleton}>
          <div className={styles.skeletonPoster} />
          <div className={styles.skeletonBody}>
            <div className={styles.skeletonLine} style={{ width: '75%' }} />
            <div className={styles.skeletonLine} style={{ width: '50%' }} />
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
