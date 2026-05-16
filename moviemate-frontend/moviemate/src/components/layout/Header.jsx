import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const NAV_LINKS = [
  { to: '/',               label: 'Collection' },
  { to: '/stats',          label: 'Stats'      },
  { to: '/recommendations', label: 'For You'   },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎬</span>
          <span className={styles.logoText}>MovieMate</span>
        </NavLink>

        {/* Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : ''].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
