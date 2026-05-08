# TMDB (The Movie Database) TV API guide

**Best for:** TV show recommendation projects (mrumurari0)
**Base URL:** `https://api.themoviedb.org/3/`
**Auth:** Free API key required (signup at themoviedb.org, then account settings > API)
**CORS:** Yes
**Rate limit:** ~40 requests/second

> **Companion guide:** This guide covers the `/tv/...` endpoints. The `/movie/...` endpoints are documented in `tmdb-movie-api.md`. The patterns are identical — only the endpoint paths and a few field names differ.

---

## Getting your API key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to **Settings > API** in your account
3. Request an API key (select "Developer" use case)
4. Your key goes in every request as `?api_key=YOUR_KEY`

**Alternative:** Use a Bearer token in the `Authorization` header instead:

```javascript
const options = {
  headers: {
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
};
const response = await fetch("https://api.themoviedb.org/3/tv/popular", options);
```

---

## Key endpoints

| Endpoint                       | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| `GET /discover/tv`             | Browse TV shows with filters (genre, network, etc.)  |
| `GET /search/tv`               | Search TV shows by name                              |
| `GET /tv/popular`              | Currently popular TV shows                           |
| `GET /tv/top_rated`            | Highest-rated TV shows                               |
| `GET /tv/on_the_air`           | Shows currently airing                               |
| `GET /tv/airing_today`         | Shows airing today                                   |
| `GET /genre/tv/list`           | All TV genres with IDs (different from movie genres) |
| `GET /tv/{id}`                 | Single TV show details                               |
| `GET /tv/{id}/watch/providers` | Streaming providers per region                       |

---

## Response structure

### Paginated list response

```json
{
  "page": 1,
  "results": [],
  "total_pages": 200,
  "total_results": 4000
}
```

### TV show object — list view (inside `results` array from `/discover/tv`, `/tv/popular`, etc.)

```json
{
  "adult": false,
  "backdrop_path": "/abc123.jpg",
  "genre_ids": [18, 80],
  "id": 1396,
  "origin_country": ["US"],
  "original_language": "en",
  "original_name": "Breaking Bad",
  "overview": "When Walter White, a chemistry teacher, is diagnosed with...",
  "popularity": 312.5,
  "poster_path": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
  "first_air_date": "2008-01-20",
  "name": "Breaking Bad",
  "vote_average": 8.9,
  "vote_count": 13452
}
```

### TV show object — detail view (from `/tv/{id}`)

The detail endpoint returns the same fields as the list view, **plus**:

```json
{
  "created_by": [{ "id": 66633, "name": "Vince Gilligan" }],
  "episode_run_time": [45, 47],
  "first_air_date": "2008-01-20",
  "genres": [
    { "id": 18, "name": "Drama" },
    { "id": 80, "name": "Crime" }
  ],
  "homepage": "http://www.amc.com/shows/breaking-bad",
  "in_production": false,
  "languages": ["en"],
  "last_air_date": "2013-09-29",
  "last_episode_to_air": { "name": "Felina", "episode_number": 16, "season_number": 5 },
  "networks": [{ "id": 174, "name": "AMC", "logo_path": "/pmvRmATOCaDykE6JrVoeYxlFHw3.png" }],
  "next_episode_to_air": null,
  "number_of_episodes": 62,
  "number_of_seasons": 5,
  "production_companies": [],
  "production_countries": [{ "iso_3166_1": "US", "name": "United States of America" }],
  "seasons": [
    {
      "air_date": "2008-01-20",
      "episode_count": 7,
      "id": 3572,
      "name": "Season 1",
      "overview": "...",
      "poster_path": "/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg",
      "season_number": 1
    }
  ],
  "spoken_languages": [],
  "status": "Ended",
  "tagline": "Change the equation.",
  "type": "Scripted"
}
```

### Field reference

| Field                | Type           | Description                                             |
| -------------------- | -------------- | ------------------------------------------------------- |
| `id`                 | integer        | TMDb TV show ID                                         |
| `name`               | string         | Localized show name                                     |
| `original_name`      | string         | Original language name                                  |
| `overview`           | string         | Plot summary                                            |
| `first_air_date`     | string         | Premiere date (`YYYY-MM-DD`)                            |
| `last_air_date`      | string or null | Last episode air date (detail endpoint only)            |
| `vote_average`       | number         | Average rating (0–10 scale)                             |
| `vote_count`         | integer        | Number of votes                                         |
| `popularity`         | number         | Popularity score                                        |
| `genre_ids`          | integer[]      | Genre IDs (list view; use TV genre list to map)         |
| `genres`             | object[]       | Full genre objects (detail view: `{ id, name }`)        |
| `poster_path`        | string or null | Poster image path fragment                              |
| `backdrop_path`      | string or null | Backdrop image path fragment                            |
| `original_language`  | string         | ISO 639-1 language code                                 |
| `origin_country`     | string[]       | ISO 3166-1 country codes                                |
| `episode_run_time`   | integer[]      | Typical episode length(s) in minutes (detail only)      |
| `number_of_seasons`  | integer        | Total seasons (detail only)                             |
| `number_of_episodes` | integer        | Total episodes (detail only)                            |
| `networks`           | object[]       | Original broadcasters (detail only)                     |
| `seasons`            | object[]       | Per-season metadata (detail only)                       |
| `status`             | string         | "Returning Series", "Ended", "Canceled", etc.           |
| `in_production`      | boolean        | Whether new episodes are still being made (detail only) |
| `tagline`            | string         | Show tagline (detail only)                              |
| `type`               | string         | "Scripted", "Reality", "Documentary", etc. (detail)     |

---

## Building image URLs

`poster_path` and `backdrop_path` are path fragments like `/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`. Build the full URL with:

```
https://image.tmdb.org/t/p/{size}{path}
```

### Poster sizes

`w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`

### Backdrop sizes

`w300`, `w780`, `w1280`, `original`

### Example

```javascript
const posterUrl = `https://image.tmdb.org/t/p/w342${show.poster_path}`;
```

**Always check for null** before building a URL:

```javascript
const posterUrl = show.poster_path
  ? `https://image.tmdb.org/t/p/w342${show.poster_path}`
  : "placeholder.jpg";
```

---

## TV genre ID list

> **Important:** TV genre IDs are **different** from movie genre IDs. Use `/genre/tv/list` for TV, not `/genre/movie/list`.

Use `GET /genre/tv/list?api_key=KEY` to fetch this dynamically, or hardcode:

| ID    | Genre              | ID    | Genre            |
| ----- | ------------------ | ----- | ---------------- |
| 10759 | Action & Adventure | 16    | Animation        |
| 35    | Comedy             | 80    | Crime            |
| 99    | Documentary        | 18    | Drama            |
| 10751 | Family             | 10762 | Kids             |
| 9648  | Mystery            | 10763 | News             |
| 10764 | Reality            | 10765 | Sci-Fi & Fantasy |
| 10766 | Soap               | 10767 | Talk             |
| 10768 | War & Politics     | 37    | Western          |

---

## Discover TV endpoint query parameters

The `/discover/tv` endpoint is the most powerful for filter forms.

### Most useful for students

| Parameter                | Type        | Example           | Description                                                                   |
| ------------------------ | ----------- | ----------------- | ----------------------------------------------------------------------------- |
| `api_key`                | string      | required          | Your API key                                                                  |
| `with_genres`            | string      | `18\|80`          | Genre IDs. Comma = AND, pipe = OR                                             |
| `vote_average.gte`       | number      | `7`               | Minimum rating (0–10)                                                         |
| `vote_average.lte`       | number      | `9`               | Maximum rating                                                                |
| `first_air_date_year`    | integer     | `2024`            | Exact premiere year                                                           |
| `first_air_date.gte`     | date string | `2020-01-01`      | Premiered after this date                                                     |
| `first_air_date.lte`     | date string | `2025-12-31`      | Premiered before this date                                                    |
| `with_runtime.gte`       | integer     | `30`              | Minimum episode runtime in minutes                                            |
| `with_runtime.lte`       | integer     | `60`              | Maximum episode runtime in minutes                                            |
| `with_networks`          | string      | `213` (Netflix)   | Filter by network ID                                                          |
| `with_status`            | string      | `0` (returning)   | Show status (0–5: returning, planned, in production, ended, cancelled, pilot) |
| `sort_by`                | string      | `popularity.desc` | Sort order                                                                    |
| `page`                   | integer     | `1`               | Page number (1–500)                                                           |
| `language`               | string      | `en-US`           | Response language                                                             |
| `with_origin_country`    | string      | `US`              | Origin country code                                                           |
| `with_original_language` | string      | `en`              | Original language code                                                        |

### Sort options

`popularity.desc`, `popularity.asc`, `vote_average.desc`, `vote_average.asc`, `vote_count.desc`, `first_air_date.desc`, `first_air_date.asc`, `name.asc`, `name.desc`

**Comma vs pipe:** In multi-value parameters (like `with_genres`), comma-separated = AND logic, pipe-separated = OR logic.

### Search endpoint parameters

| Parameter             | Type    | Description                           |
| --------------------- | ------- | ------------------------------------- |
| `api_key`             | string  | Required                              |
| `query`               | string  | Search text (required)                |
| `page`                | integer | Page number                           |
| `first_air_date_year` | integer | Filter by premiere year               |
| `language`            | string  | Response language                     |
| `include_adult`       | boolean | Include adult content (default false) |

---

## Common network IDs

A few popular networks to use with `with_networks`:

| ID   | Network       | ID   | Network      |
| ---- | ------------- | ---- | ------------ |
| 213  | Netflix       | 49   | HBO          |
| 2    | ABC           | 6    | NBC          |
| 16   | CBS           | 19   | FOX          |
| 174  | AMC           | 67   | Showtime     |
| 384  | HBO Max / Max | 1024 | Amazon Prime |
| 2552 | Apple TV+     | 2739 | Disney+      |
| 4    | BBC One       | 9    | Hulu         |

For more, query `/tv/{id}` for a known show and look at its `networks` array, or use TMDb's network search.

---

## How to use in a my-advice TV project

### Basic fetch with API key

```javascript
const API_KEY = "your_api_key_here";
const BASE_URL = "https://api.themoviedb.org/3";

async function getPopularShows() {
  const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}
```

### Discover with filters from a form

```javascript
async function discoverShows(genre, minRating, year) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: "popularity.desc",
    "vote_count.gte": "50",
  });

  if (genre) params.set("with_genres", genre);
  if (minRating) params.set("vote_average.gte", minRating);
  if (year) params.set("first_air_date_year", year);

  const response = await fetch(`${BASE_URL}/discover/tv?${params}`);
  const data = await response.json();
  return data.results;
}
```

### Mapping TV genre IDs to names

```javascript
async function getTvGenreMap() {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  const map = {};
  for (const genre of data.genres) {
    map[genre.id] = genre.name;
  }
  return map;
}

// Usage: genreMap[18] → "Drama"
```

### Fetching detail data (seasons, episode count, networks)

The list endpoints (`/discover/tv`, `/tv/popular`) do **not** include `number_of_seasons`, `number_of_episodes`, `episode_run_time`, or `networks`. To get those, fetch the detail endpoint per show:

```javascript
async function getShowDetail(id) {
  const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  return await response.json();
}
```

Pattern: list endpoint gets you the cards (id, name, overview, poster, vote_average), detail endpoint gets you the rich data for the detail view (seasons, episodes, networks). Cache detail responses in localStorage so clicking the same card twice doesn't refetch.

### Rendering show cards

```javascript
function renderShows(shows, genreMap) {
  const container = document.getElementById("results");
  container.textContent = "";

  for (const show of shows) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = show.id;

    const img = document.createElement("img");
    img.src = show.poster_path
      ? `https://image.tmdb.org/t/p/w342${show.poster_path}`
      : "placeholder.jpg";
    img.alt = `${show.name} poster`;

    const title = document.createElement("h3");
    title.textContent = show.name;

    const year = document.createElement("p");
    year.textContent = show.first_air_date ? show.first_air_date.slice(0, 4) : "Year unknown";

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${show.vote_average}/10 (${show.vote_count} votes)`;

    const genres = document.createElement("p");
    genres.textContent = show.genre_ids.map((id) => genreMap[id] || "Unknown").join(", ");

    const overview = document.createElement("p");
    overview.textContent = show.overview;

    card.append(img, title, year, rating, genres, overview);
    container.append(card);
  }
}
```

### Wiring to a filter form

```html
<form id="show-form">
  <select id="genre-select">
    <option value="">Any genre</option>
    <!-- Populated dynamically from /genre/tv/list -->
  </select>
  <select id="rating-select">
    <option value="">Any rating</option>
    <option value="7">7+ stars</option>
    <option value="8">8+ stars</option>
  </select>
  <button type="submit">Find shows</button>
</form>
```

```javascript
// Populate genre select dynamically
async function populateGenres() {
  const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  const data = await response.json();
  const select = document.getElementById("genre-select");

  for (const genre of data.genres) {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    select.append(option);
  }
}

// Handle form submit
document.getElementById("show-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const genre = document.getElementById("genre-select").value;
  const minRating = document.getElementById("rating-select").value;
  const shows = await discoverShows(genre, minRating);
  renderShows(shows, genreMap);
});
```

---

## Gotchas and tips

- **TV vs movie genre IDs.** The genre lists are different. `18` is Drama in both, but `28` is Action only for movies; for TV, the equivalent is `10759` (Action & Adventure). Always use `/genre/tv/list`, not `/genre/movie/list`.
- **`name` vs `title`.** TV uses `name`; movies use `title`. If you copy code from the movie guide, change `movie.title` to `show.name`.
- **`first_air_date` vs `release_date`.** TV uses `first_air_date`; movies use `release_date`. Same string format (`YYYY-MM-DD`).
- **List view does not include season/episode counts.** `number_of_seasons`, `number_of_episodes`, `episode_run_time`, and `networks` are only on the detail endpoint (`/tv/{id}`). Plan two fetches: one for the list, one per show for the detail view.
- **`episode_run_time` is an array.** Some shows have a single value, some have ranges (e.g., `[45, 47]` for episodes that vary in length). Use `[0]` for the typical length, or `Math.round(arr.reduce((a,b)=>a+b)/arr.length)` for the average.
- **Networks vs streaming providers.** `networks` (in the detail response) is the **original broadcaster** (AMC for Breaking Bad, BBC for Sherlock). The `/tv/{id}/watch/providers` endpoint returns **where it streams now** (Netflix, Hulu, etc.) per region. They are different — pick which one fits your `platforms` field.
- **API key in URL:** The key is visible in network requests. This is fine for student projects served from localhost or your serverless function. For production, use a Bearer token in the `Authorization` header.
- **Null poster paths:** Some shows have no poster. Always provide a fallback image.
- **Vote count matters:** Sort by `vote_average` alone returns obscure shows with one 10/10 vote. Add `vote_count.gte=50` to get meaningful ratings.
- **Pagination:** Results are paginated at 20 per page. Use `page` parameter for more.
- **Rate limit:** 40 req/sec is very generous. Students won't hit it during normal use, but cache aggressively anyway — re-fetching the same TV detail every time the user clicks a card burns quota for no gain.
