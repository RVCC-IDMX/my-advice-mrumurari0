# Final project suggestions for what-should-i-watch-mrudula

> [!IMPORTANT]
> Before starting the final, complete and close your "Pre-final feedback" issue.

## Your Week 4 starting point (recap)

Your Week 4 landed quickly once it landed — Week 3 PR merged May 3, Week 4 PR merged May 4, substantive code pushed May 8, live deploy at what-should-i-watch-mrudula.netlify.app. Your serverless function `netlify/functions/api.mjs` fetches TMDb's `/tv/popular` endpoint and transforms each show into your app's shape with new fields (`description`, `rating`, `firstAirDate`, `posterPath`). Your `loadCache`/`saveCache` use the safe wrapper pattern with `Array.isArray` validation and self-heal. Your views stayed `innerHTML`-clean throughout. Once your pre-final fix lands (genre and mood synthesized into the transform; episodeLength and platforms filters dropped because TMDb does not expose them), your project is on the same architectural footing as DFROSTEXD's TMDb integration — and the final builds directly on top.

## How each pattern fits your project

### Pattern A — translate input to API params

**Strong fit, by analogy to DFROSTEXD's TMDb work.** TMDb's `/discover/tv` endpoint takes rich query parameters: `with_genres`, `sort_by`, `vote_average.gte`, `with_original_language`, `first_air_date.gte`. Pattern A turns a free-text input ("a moody Scandinavian crime drama") into those params and lets TMDb do the search. Schema is small. The UX win is that natural-language description replaces the form, and the form was the part of Week 4 that gave you the most grief — the pre-final fix is dropping two filters because the API doesn't expose them. Pattern A sidesteps that whole class of problem because Groq decides the parameter shape, not you.

### Pattern B — narrate the API results

**Strong fit. Show recommendations are narrative.** TMDb returns each show's `description` (your transform calls it `description`; TMDb calls it `overview`), and your view layer already renders it. Pattern B adds a "why this show fits what you asked for" sentence per result — "this matches your request for thoughtful crime dramas because it follows a detective in a small Scandinavian town." Schema: `{ "intro": string, "show_notes": [{ "show_id": number, "why_this_show": string }], "refused": boolean, "refusal_reason": string }`. Your existing per-show rendering already has a slot for narration; you just add a render hook for `why_this_show` next to the description.

### Pattern A+B — both, chained

Worth considering, but not for your timeline. A+B means two Groq calls per request: one to translate input into TMDb params, one to narrate the results. The result feels like a real conversation with a recommender. The cost is twice the latency, twice the cost-budget, and double the prompt-engineering work. For a one-week sprint when you are already running tight, ship one pattern well rather than two patterns half.

## What carries over (and what doesn't)

- **Your TMDb transform** — stays. Pattern A produces query parameters that go into `/discover/tv` instead of `/tv/popular`, but your transform shape is the same. Add the `genre`/`mood` synthesis from your pre-final fix and you're done.
- **Your cache wrapper** — stays for show data. Decide whether to cache Groq responses too. Argument for caching: identical user inputs should return identical results. Argument against: per-request narration ages worse than show metadata. Either is defensible — name your decision in the reflection.
- **Your views.js** — keeps `createElement` + `textContent`. Add a refusal renderer for `refused: true`. For Pattern B, add a render hook for per-show `why_this_show` text.
- **Your form** — depends on pattern. Pattern A replaces the form with a single input. Pattern B keeps a simplified form (after your pre-final fix dropped episodeLength and platforms).
- **What changes** — your fetch URL. `/tv/popular` becomes `/discover/tv?with_genres=...&sort_by=...` for Pattern A, with the params filled in by Groq. The function structure is otherwise identical.

## A sketched Pattern A schema for TMDb /discover/tv

```js
{
  "with_genres": number[],                          // TMDb genre IDs from your pre-final genre map
  "sort_by": "popularity.desc" | "vote_average.desc" | "first_air_date.desc",
  "vote_average_gte": number | null,                // optional minimum rating
  "with_original_language": string | null,          // ISO 639-1 code, e.g., "ko" for Korean dramas
  "refused": boolean,
  "refusal_reason": string
}
```

The genre map you build for the pre-final fix becomes the system prompt's reference table — Groq needs to know which genre IDs are which names so it can return the right numbers. Your existing serverless function then constructs the TMDb URL from those params, fetches, and returns the transformed shows.

## My soft recommendation

If I had to pick one for you, I would pick **Pattern A**. It is the simpler architecture (one Groq call, one TMDb call, no chaining), it sidesteps the form-filter problem you wrestled with in Week 4 (Groq decides the params, not your UI), and it ships in fewer moving parts than Pattern B. Pattern B is a real fit for your project, but it requires more prompt-design work (per-show commentary needs careful prompting to avoid generic "this show is great" output), and prompt-design time is what you have least of right now.

If Pattern A ships cleanly with time to spare, you can layer Pattern B on top toward A+B. But Pattern A on its own is a complete final project, and "complete and shipped" is worth more than "ambitious and stuck."

## What to read next

- `INSTRUCTIONS.md` — the assignment overview
- `CHECKLIST.md` — concrete deliverables
- `docs/tutorials/pattern-a-translate-input.md` — Pattern A walkthrough; translate the schema to TMDb's `/discover/tv` shape
- `docs/tutorials/groq-moderation-floor.md` — the four required defenses (system prompt, JSON mode, delimited input, length cap)
