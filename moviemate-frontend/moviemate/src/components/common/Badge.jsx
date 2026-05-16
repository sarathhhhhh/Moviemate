import { STATUS_COLORS } from '../../constants/mediaConstants';
import styles from './Badge.module.css';

/**
 * Badge
 * Props:
 *   status  - one of STATUS keys → applies the matching colour automatically
 *   color   - override hex colour
 *   variant - 'solid' | 'subtle' (default)
 */
export default function Badge({
  children,
  status,
  color,
  variant = 'subtle',
  className = '',
}) {
  // Resolve colour: explicit prop → status map → fallback
  const resolvedColor = color ?? (status ? STATUS_COLORS[status] : null) ?? '#9aa0b8';

  const inlineStyle =
    variant === 'solid'
      ? { background: resolvedColor, color: '#0d0f14' }
      : {
          background: `${resolvedColor}20`,   // 12% opacity
          color: resolvedColor,
          borderColor: `${resolvedColor}40`,  // 25% opacity border
        };

  return (
    <span className={[styles.badge, className].join(' ')} style={inlineStyle}>
      {children}
    </span>
  );
}
