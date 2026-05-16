# 🎬 MovieMate — Frontend

React frontend for the MovieMate collection tracker.  
Connects to a Django REST backend via `/api/`.

---

## Tech Stack

| Layer     | Choice                            |
|-----------|-----------------------------------|
| Framework | React 18 + Vite                   |
| Routing   | React Router v6                   |
| Styling   | CSS Modules + CSS custom properties|
| State     | React hooks (no Redux)            |
| HTTP      | `fetch` (no extra libraries)      |

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env
# Edit .env and set VITE_API_URL to your Django server URL

# 3. Start the dev server  (proxies /api → Django automatically)
npm run dev
# → http://localhost:5173

# 4. Production build
npm run build
```

> **No CORS config needed in dev** — Vite proxies `/api` requests to Django via `vite.config.js`.

---

## Features

### Core
- Add movies and TV shows with title, director, genre, platform, year
- Set status: **Watching / Completed / Wishlist / Dropped**
- Track TV show progress (episodes watched / total)
- Rate completed titles with a 5-star rating
- Write and store personal reviews / notes
- Filter by type, status, genre, platform; sort by 7 options
- Tab bar with live counts per status
- Delete with confirmation

### AI (optional backend features)
- **For You** page: personalised recommendations based on watch history
- AI review generation from user notes (via `/api/media/:id/generate-review/`)

### UX
- Skeleton loading state (shimmer animation)
- Empty states with contextual messages
- Modal with Escape-to-close and scroll-lock
- Responsive grid layout (auto-fill, mobile-friendly)
- Sticky header with active-link highlighting

---

## Project Structure

```
src/
├── api/
│   └── mediaApi.js           ← all fetch calls to Django
├── components/
│   ├── common/               ← Button, Input, Select, Modal, Badge, etc.
│   ├── layout/               ← Header, PageContainer, Tabs
│   ├── media/                ← MediaCard, MediaGrid, MediaForm, MediaFilters
│   ├── stats/                ← StatsCard, GenreStats, PlatformStats, StatsView
│   └── recommendations/      ← RecommendationCard, AIRecommendView
├── constants/
│   └── mediaConstants.js     ← enums: STATUS, GENRES, PLATFORMS, etc.
├── hooks/
│   ├── useMedia.js           ← CRUD + filter/sort state
│   ├── useStats.js           ← stats fetch
│   └── useRecommendations.js ← AI recommendations fetch
├── pages/
│   ├── CollectionPage.jsx    ← main grid + add/edit modal
│   ├── StatsPage.jsx
│   └── RecommendationsPage.jsx
├── styles/
│   ├── globals.css           ← reset, typography, animations
│   └── variables.css         ← design tokens (colors, spacing, fonts)
└── utils/
    ├── calculations.js       ← progress %, groupBy, average
    ├── formatters.js         ← dates, durations, ratings
    └── helpers.js            ← debounce, sortMedia, filterMedia
```

---

## Expected Django API Contract

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| GET    | `/api/media/`                     | List all media items           |
| POST   | `/api/media/`                     | Create a media item            |
| GET    | `/api/media/:id/`                 | Get single item                |
| PUT    | `/api/media/:id/`                 | Full update                    |
| PATCH  | `/api/media/:id/`                 | Partial update                 |
| DELETE | `/api/media/:id/`                 | Delete item                    |
| GET    | `/api/stats/`                     | Aggregated stats               |
| GET    | `/api/recommendations/`           | AI recommendations             |
| POST   | `/api/media/:id/generate-review/` | Generate AI review from notes  |

### Media object shape
```json
{
  "id": 1,
  "title": "Inception",
  "type": "movie",
  "director": "Christopher Nolan",
  "genre": "Sci-Fi",
  "platform": "Netflix",
  "year": 2010,
  "status": "completed",
  "rating": 5,
  "review": "Mind-bending masterpiece.",
  "poster_url": "https://…",
  "total_episodes": null,
  "watched_episodes": null,
  "updated_at": "2024-01-12T10:30:00Z"
}
```

### Stats object shape
```json
{
  "total": 42,
  "completed": 28,
  "watching": 6,
  "wishlist": 8,
  "total_watch_time_minutes": 5040,
  "avg_rating": 4.1,
  "by_genre":    [{ "genre": "Drama",   "count": 12 }],
  "by_platform": [{ "platform": "Netflix", "count": 18 }]
}
```
