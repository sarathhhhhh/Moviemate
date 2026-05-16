import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header  from './components/layout/Header';
import { routes } from './routes';

/**
 * App.jsx
 * Root component. Renders the persistent Header above all pages,
 * then maps the routes array to <Route> elements.
 * A catch-all redirects unknown paths back to "/".
 */
export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Catch-all: redirect unknown URLs to Collection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
