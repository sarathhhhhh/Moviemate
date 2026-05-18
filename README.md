 MovieMate

A web app to track movies and TV shows you are watching, have watched, or want to watch.
Built with React on the frontend and Django on the backend.

---

Features

- Add movies and TV shows to your collection
- Set a status for each title - watching, completed, wishlist, or dropped
- Track episode progress for TV shows
- Rate and review titles after watching
- Filter your collection by genre, platform, or status
- Search OMDB to auto-fill title, year, poster, director and genre
- Stats page showing your watch history broken down by genre and platform
- Recommendations based on your highest rated titles

---

Tech Stack

Frontend - React, Vite, React Router, CSS Modules

Backend - Django, Django REST Framework, SQLite

---

Setup

Backend

Make sure you have Python installed. Then:

```
cd moviemate_backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

The backend will run at http://localhost:8000

Frontend

Make sure you have Node.js installed. Then:

```
cd moviemate-frontend
npm install
```

Create a .env file in the root of the frontend folder:

```
VITE_API_URL=http://localhost:8000
VITE_OMDB_KEY=b68a4b18
```

You can get a free OMDB key at https://www.omdbapi.com/apikey.aspx

Then start the dev server:

```
npm run dev
```

The app will run at http://localhost:5173

### Running both together

Open two terminals. Run the backend in one and the frontend in the other. Both need to be running at the same time for the app to work.

---

 Notes

- The OMDB search auto-fills some fields but you still need to pick a platform and set the status manually
- Recommendations only show up once you have completed and rated a few titles
- If you change anything in the .env file you need to restart the frontend dev server for it to take effect
