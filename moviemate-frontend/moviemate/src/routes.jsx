import CollectionPage      from './pages/CollectionPage';
import StatsPage           from './pages/StatsPage';
import RecommendationsPage from './pages/RecommendationsPage';

/**
 * routes.jsx
 * Central route definitions consumed by App.jsx.
 * Keeping routes here means adding a new page only requires:
 *   1. Creating the page component
 *   2. Adding one entry below
 */
export const routes = [
  {
    path:      '/',
    element:   <CollectionPage />,
    label:     'Collection',
  },
  {
    path:      '/stats',
    element:   <StatsPage />,
    label:     'Stats',
  },
  {
    path:      '/recommendations',
    element:   <RecommendationsPage />,
    label:     'For You',
  },
];
