import MediaCard from './MediaCard';
import EmptyState from './EmptyState';
import styles from './MediaGrid.module.css';

/**
 * MediaGrid
 * Props:
 *   items    - media array
 *   onEdit   - (item) => void
 *   onDelete - (id) => void
 */
export default function MediaGrid({ items, onEdit, onDelete }) {
  if (!items?.length) return <EmptyState />;

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
