> [!IMPORTANT]
> **Action required before you start the final.** Your Week 4 code structure is sound — try/catch wrappers, response.ok checks, defensive rendering, the cache wrapper pattern, the live deploy at `what-should-i-watch-mrudula.netlify.app`. But the form filters do not work on live data because the TMDb fields don't match what your matcher expects, and there are two smaller cleanup items still open from the Week 4 starter PR. Read this Issue carefully, work through the checklist, and close the issue when the live filters return results. Your instructor monitors closed issues to confirm you are ready for the final.

## How to work this with your AI agent

Save this issue into your repo so your agent can read it as a file:

1. On this GitHub issue page, click the **`...`** menu in the top-right corner of the issue body.
2. Choose **Copy Markdown**.
3. In your repo, create a new file `docs/pre-final-fix.md` and paste the markdown into it.
4. Save and commit it (`git add docs/pre-final-fix.md && git commit -m "Add pre-final fix plan from issue"`).

Then point Copilot at `docs/pre-final-fix.md` and ask it to follow the instructions in the next section. Keep this file in the repo — it's the record of what you read and worked through, and your instructor will look for it.

### Instructions for the AI agent

> [!NOTE]
> The block below is written **directly to the AI agent**, not to Mrudula. If you (the agent) are reading this file as context, these are your operating rules for this issue. Mrudula has read this section too — she expects you to follow it.

**Your role.** You are helping Mrudula complete four fixes from this issue. You are not a co-pilot deciding scope; she has already decided the scope and it is exactly what's in the "Step-by-step fix" section below. Your job is to implement the fixes correctly, one at a time, with verifiable diffs.

**Sequence — do not deviate.**

1. **First: the data-shape fix only.** This is the substantive code change. Do not touch `.eslintrc.cjs`, `docs/my-code-map-v2-additions.md`, or `README.md` until Mrudula confirms the data-shape fix is working on her live site.
2. **Second (after Mrudula confirms step 1):** delete `.eslintrc.cjs`.
3. **Third:** fix the duplicate entries near the end of `docs/my-code-map-v2-additions.md`.
4. **Fourth:** add the live URL `https://what-should-i-watch-mrudula.netlify.app/` to `README.md` near the top.

One commit per logical fix. Four commits total. Do not batch.

**Hard rules.**

- **Do not improvise the TMDb genre-ID list.** This issue lists 9 of the ~16 TMDb TV genre IDs. Before adding a `GENRE_BY_ID` map to `api.mjs`, ask Mrudula to fetch the full canonical list from `https://api.themoviedb.org/3/genre/tv/list?api_key=$TMDB_API_KEY` using her local key. If she cannot or will not, use only the 9 IDs spelled out in this issue and add a comment in the code: `// Partial map — extend from /genre/tv/list when needed`.
- **Do not guess the mood-filter values.** Before writing `moodFromGenre()`, read `index.html` and find the `<option>` values inside the mood `<select>`. The function must return _those exact strings_, case-sensitive. If the mood filter does not exist in `index.html`, stop and ask Mrudula.
- **Do not refactor `matching.js` beyond what's required.** The fix is: delete `fitsEpisodeLength`, delete `isOnPlatform`, simplify `meetsAllCriteria` to AND only the two remaining matchers. Do not rename functions, do not move them to a new file, do not change the signatures of `matchesMood` or `matchGenre`. Resist the urge to "clean up while you're here."
- **Do not push without testing.** After the data-shape fix, run `npm run dev` locally. Open the form. Pick a non-default genre. Confirm the result list filters correctly. If it does not filter, stop and report what you see — do not "fix" the matcher more aggressively to make it pass.
- **Do not edit the form to remove the dropped filter sections without telling Mrudula first.** This is a UX change visible to her users. Show her the diff of `index.html` before committing.
- **Do not touch the cache wrapper, the views, the loading state, or the error handler.** They work. Leave them alone.

**Verification gates — show Mrudula each one.**

- **Before commit 1 (data-shape):** show the diff of `api.mjs`, `matching.js`, and `index.html`. Run `npm run lint` and confirm zero violations. Confirm a live filter test passed.
- **Before commit 2 (`.eslintrc.cjs`):** confirm `npm run lint` still passes after deletion.
- **Before commit 3 (code map):** show the diff of `docs/my-code-map-v2-additions.md`. Confirm no duplicate questions remain.
- **Before commit 4 (README):** show the diff of `README.md`.

**Commit message style.** Match her existing pattern (part-numbered, descriptive). Examples:

- `Week 4 cleanup - synthesize genre and mood from TMDb genre_ids`
- `Week 4 cleanup - remove legacy .eslintrc.cjs`
- `Week 4 cleanup - fix duplicate entries in code map`
- `Week 4 cleanup - add live Netlify URL to README`

**When to stop and ask Mrudula instead of deciding for her.**

- The TMDb genre-ID list is incomplete and she cannot pull the canonical version.
- The mood filter values in `index.html` do not include the categories you would derive from the genres ("lighthearted", "thoughtful", "exciting", etc.).
- After the data-shape fix, the live filter test does not produce filtered results.
- You find code in `matching.js`, `views.js`, or `app.js` that looks broken in a way unrelated to this issue. Flag it; do not fix it as part of this work.

**What you do not do.**

- You do not write the reflection sentence about dropping the filters. Mrudula writes that herself in `docs/reflections/week-4-reflection.md` Q5. You can suggest a sentence; you do not commit one without her explicit approval of the wording.
- You do not push to the remote. Mrudula pushes when she is satisfied with each commit.
- You do not close this GitHub issue. Mrudula closes it after the final verification on her live site.

## Checklist

- [ ] Read this issue in full
- [ ] Run `npm install` and then `npm audit fix` (see class-wide note at the bottom)
- [ ] Delete `.eslintrc.cjs` from the project root
- [ ] Add a genre-ID-to-name map and a genre-to-mood map to `netlify/functions/api.mjs`; include `genre` and `mood` in the transformed show object
- [ ] Decide what to do about the `episodeLength` and `platforms` filters (drop them; see "Step-by-step fix" below)
- [ ] Verify on the live site: pick a specific genre or mood in the form and confirm shows actually filter
- [ ] Fix the duplicate/incomplete entries near the end of `docs/my-code-map-v2-additions.md`
- [ ] Add the live Netlify URL (`https://what-should-i-watch-mrudula.netlify.app/`) to the README
- [ ] Commit and push
- [ ] Close this issue

## What's working

Your Week 4 timeline shifted dramatically — Week 3 PR merged May 3, Week 4 PR merged May 4, and the substantive code landed May 8. Once you started, you moved fast and you moved cleanly. Several things on this work are right:

- **Safe code patterns are all in place.** Your `loadShows` wraps fetch in try/catch, checks `response.ok` before parsing, calls `showErrorMessage()` on failure, and shows a loading state during the fetch. None of those are obvious until you've burned an evening watching a page hang silently — and your code does not hang silently.
- **Cache wrapper with shape validation and self-heal.** `loadCache` checks both existence and `Array.isArray()` before trusting the parsed data, and self-heals with `removeItem` on parse error. That is the safe wrapper pattern from `localstorage-safe-patterns.md`.
- **Views stayed innerHTML-clean.** `createElement` + `textContent` everywhere; defensive `if (item.field)` guards before rendering each new field. Holds up under the new Week 4 unicorn rule that blocks innerHTML.
- **Live deployment.** The site is up at `what-should-i-watch-mrudula.netlify.app` and the build pipeline is configured. That is one full Part 4 deliverable already done.
- **Part-numbered commits.** Your May 8 commits name parts (Part 0 setup, TMDb serverless, Full Push Part 1, Full Push Part 2). That makes your git log readable and easy to map to the assignment.
- **Reflection muscle.** Your Q4 ("API data not always structured like old data") and Q5 ("hardest part was mapping API field names to app expectations") are exactly the right diagnosis of the problem. You named it. The fix below is the second half of that work.

## Before you start the final

The data-shape mismatch is the big item; the other two are short. Get them all done, in any order, and you are ready for the final.

### What's actually broken — the data-shape mismatch

Your `netlify/functions/api.mjs` transforms each TV show into this shape:

```js
{
  (id, title, description, rating, popularity, firstAirDate, posterPath);
}
```

But your `src/js/matching.js` checks four different fields:

```js
matchesMood(item, ...)         // reads item.mood
matchGenre(item, ...)          // reads item.genre
fitsEpisodeLength(item, ...)   // reads item.episodeLength
isOnPlatform(item, ...)        // reads item.platforms.includes(...)
```

When a user picks a specific filter value (e.g., genre = "Comedy"), the matcher checks `show.genre === 'Comedy'`. But `show.genre` is `undefined` because the transform never set it. `undefined === 'Comedy'` returns `false`. `meetsAllCriteria` ANDs all four checks, so even one undefined field zeroes the result. The page loads cards (because the default "Any genre / Any mood / Any length / Any platform" returns true), but the moment a real filter is applied, the result list goes empty with no error and no warning.

This is a silent failure. A grader picks a filter, sees nothing, assumes the API is broken — that's the first impression of your project.

### Step-by-step fix

The cleanest path is the same one Natalie (nedetample) took with Deezer: **synthesize what the API gives you, drop what it doesn't.** Natalie dropped activity and vibes filters because Deezer didn't return them, and she documented that decision in her reflection. Her instructor (me) called it forward-looking student agency. You should make the same call.

**1. Add a genre-ID map to `api.mjs`.**

TMDb returns each show's genres as `genre_ids`, an array of integers. There are about 16 stable genre IDs for TV. Add a map at the top of your serverless function:

```js
const GENRE_BY_ID = {
  10759: "Action & Adventure",
  35: "Comedy",
  18: "Drama",
  10765: "Sci-Fi & Fantasy",
  9648: "Mystery",
  80: "Crime",
  10751: "Family",
  16: "Animation",
  10762: "Kids",
  // ...add the rest from https://api.themoviedb.org/3/genre/tv/list
};
```

In your transform, look up the first ID:

```js
genre: GENRE_BY_ID[show.genre_ids?.[0]] || 'Unknown',
```

**2. Map genre to mood.**

Add a small grouping function:

```js
function moodFromGenre(genre) {
  if (["Comedy", "Family", "Kids"].includes(genre)) return "lighthearted";
  if (["Drama", "Mystery", "Crime"].includes(genre)) return "thoughtful";
  if (["Action & Adventure", "Sci-Fi & Fantasy"].includes(genre)) return "exciting";
  return "any";
}
```

Then in the transform:

```js
mood: moodFromGenre(GENRE_BY_ID[show.genre_ids?.[0]] || 'Unknown'),
```

Whatever your form's mood values are (check `index.html`), make the function return _those exact strings_ — case-sensitive equality is what `matchesMood` uses.

**3. Drop `episodeLength` and `platforms`.**

TMDb's `/tv/popular` does not return episode runtime or streaming platforms. Getting them requires a per-show call to `/tv/{id}` and `/tv/{id}/watch/providers` — which is way out of Week 4 scope. The right move is to remove those filter sections from your form and remove the matchers from `meetsAllCriteria`.

In `src/js/matching.js`, simplify:

```js
export function meetsAllCriteria(item, preferences) {
  return matchesMood(item, preferences.mood) && matchGenre(item, preferences.genre);
}
```

In `index.html`, delete the episode-length and platform `<select>` blocks (or the equivalent inputs) so the form only collects mood and genre. Document the decision in your `docs/reflections/week-4-reflection.md` Q5 — append a sentence like: "After landing the TMDb integration, I dropped the episodeLength and platforms filters because TMDb's popular endpoint does not return those fields, and adding per-show enrichment calls was out of scope for Week 4."

That's the whole fix. Roughly 30 minutes if you go cleanly.

### `.eslintrc.cjs` is still in the tree

Open the project root. You'll find both:

- `eslint.config.js` — the new flat config, delivered with the Week 4 PR.
- `.eslintrc.cjs` — the legacy config from earlier weeks.

ESLint 9 reads the flat config first, so functionally **nothing breaks today.** Your linter runs against `eslint.config.js` and the legacy file is dormant. The Week 4 starter PR specifically asked you to delete `.eslintrc.cjs` and the cleanup item is unchecked.

The fix is one delete:

```bash
git rm .eslintrc.cjs
git commit -m "Remove legacy .eslintrc.cjs (replaced by eslint.config.js)"
git push
```

Two configs is the kind of state that bites later — during the final, an agent helping you may write rules into the legacy file because it sees `.eslintrc.cjs` first. Two minutes of cleanup now is worth the half hour you would have spent debugging the wrong file.

### `docs/my-code-map-v2-additions.md` has duplicate entries

Near the end of the file, the localStorage cache section has duplicate questions:

```text
- Where is your `saveCache` function? [DUPLICATE — appears twice]
- When does your app use the cache?      [DUPLICATE — appears twice]
```

Delete the duplicates so each question appears once with its answer. The file should end cleanly after the last fully-answered question. Two minutes.

### Add the live URL to the README

Your site is already deployed at `https://what-should-i-watch-mrudula.netlify.app/`. The URL is not in your `README.md` yet, which means a grader (or your future self) has to look up the Netlify dashboard to find it. Add a "Live site" line near the top of the README. Two minutes.

## Class-wide note — npm audit warnings on `npm i`

After you run `npm i`, you'll see audit warnings like "6 vulnerabilities (2 low, 2 moderate, 2 high)." They are not blocking the final.

- **Run `npm audit fix` first (no `--force`).** That command only installs upgrades that stay within the same major version range — it cannot break your build. On this assignment's `package.json`, it drops 6 vulnerabilities to 2 in one command. Commit the resulting `package-lock.json` change.
- **For anything left, ask your AI agent to investigate, not to fix.** A useful prompt: "Read `package-lock.json` and `npm audit` output. For each remaining advisory, write a short report — which package, dev-only or runtime, what the actual exploit requires, what the suggested upgrade is, and what the breakage risk of that upgrade is. End with a recommendation per advisory: act now, defer, or ignore."
- **Do not run `npm audit fix --force` on `main`.** It is allowed to install major-version-breaking upgrades. If you want to try it, do it on a branch (`git checkout -b try-audit-fix-force`) and verify `npm run dev`, `npm run lint`, and `npm run build` still pass before merging.

> [!NOTE]
> Close this issue once the data-shape fix is in place, the filters work on the live site, `.eslintrc.cjs` is deleted, the code map is fixed, and the README has the live URL. Your instructor monitors closed issues to track who's wrapped up Week 4 cleanup. If you hit a wall on any of the steps above, send me a message on Teams — but heads up: every minute spent asking is a minute not coding, and you are on a tighter clock than the rest of the cohort. Try the fix yourself first; reach out only when you are stuck, not when you are unsure.
