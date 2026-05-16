const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

async function request(path, options = {}) {
  const url = `${BASE_URL}/api${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail ?? 'Something went wrong');
  }
  return res.status === 204 ? null : res.json();
}

// ── Media ──────────────────────────────────────────────────────────
export function getMediaList(params = {}) {
  const qs = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== '' && v != null)
  ).toString();
  return request(`/items/${qs ? `?${qs}` : ''}`);   // ← /items/ not /media/
}

export function getMediaById(id)     { return request(`/items/${id}/`); }
export function createMedia(data)    { return request('/items/', { method: 'POST', body: JSON.stringify(data) }); }
export function updateMedia(id, data){ return request(`/items/${id}/`, { method: 'PUT',   body: JSON.stringify(data) }); }
export function patchMedia(id, data) { return request(`/items/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }); }
export function deleteMedia(id)      { return request(`/items/${id}/`, { method: 'DELETE' }); }

// ── Stats ──────────────────────────────────────────────────────────
export function getStats()           { return request('/items/stats/'); }   // ← /items/stats/

// ── Recommendations ────────────────────────────────────────────────
export function getRecommendations() { return request('/items/recommend/'); } // ← /items/recommend/