# My code map — v2 additions

These sections were added in Week 4. Your Week 3 entries above are still valid.

---

## Serverless function

- File path: `netlify/functions/api.mjs`
- What does this function do? `Fetches live TV show data from TMDb, transforms into the shape that my app expects, returns as JSON`
- What external API does it call? `TMDb TV API`
- What HTTP method does your function use to call the API? `GET`

- What shape does the response have? (list the top-level properties)
  - id
  - title
  - description
  - rating
  - popularity
  - firstAirDate
  - posterPath

---

## Environment variables

- Do you have a `.env` file in your project root? `Yes`
- What variable(s) are defined in it?
  - TMDB_API_KEY

- Are these same variables set in the Netlify UI (Site settings > Environment variables)? `Yes`
- Is `.env` listed in your `.gitignore`? `Yes`

---

## Data flow

How does your app get its data now compared to Week 3?

- Before (Week 3): `import { shows } from './data.js'`
- Now (Week 4): `fetch('/.netlify/functions/api')`
- Did you keep `data.js` as a fallback if the fetch fails? `No`
- Where does the fetch happen? (file and function name): `src/js/app.js` in the `loadShows()` function

---

## New fields from API

In Part 3A you added field(s) from the live API that your static data did not have.

- What new field(s) did you add?
  - description
  - rating
  - firstAirDate

- Where do they appear in your card? (what element shows them?): `description appears as a <p> in the results card; rating and firstAirDate appear in the detail view`
- Did you add any CSS for the new field(s)? `No, they use default styling`

---

## localStorage cacheshows'`
- What shape is the cached data? (array of objects, single object, etc.): `Array of show objects`
- Where is your `loadCache` function? (file and function name): `src/js/app.js` in the `loadCache()` function
- Where is your `saveCache` function? (file and function name): `src/js/app.js` in the `saveCache()` function
- When does your app use the cache instead of fetching? `On page load, if the cache key 'shows' exists and contains valid array data________`
- Where is your `saveCache` function? (file and function name): `___________`
- When does your app use the cache instead of fetching? `___________`
