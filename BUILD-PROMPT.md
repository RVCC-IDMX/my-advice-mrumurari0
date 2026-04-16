# BUILD-PROMPT: What Should I Watch?

## Project Overview

This is a TV show recommendation tool that helps users discover what to watch based on their mood and genre preferences. Users fill out a form with their preferences, and the app returns matching TV show recommendations with detailed information about each show.

**Original concept from:** My first JavaScript assignment  
**Purpose:** Recreate as a personalized recommendation tool with custom design decisions

---

## Design Decisions

These are the planning decisions made for this version of the site:

### Content Domain
- **Focus:** TV shows only (not movies)
- **Number of shows:** 30-50 titles across multiple genres

### User Preferences / Filter Criteria
Users will filter by:
1. **Mood** — Emotional tone/vibe (lighthearted, comfort, funny, wholesome, thoughtful, thrilling, mind-bending, adventurous, intense, emotional, focused, spooky, slow-burn, dark)
2. **Genre** — Category of show (comedy, drama, sci-fi, action, thriller, mystery, crime, adventure, romance, documentary, animation)
3. **Episode Length** — How long each episode is (15-30 min, 30-45 min, 45-60 min, 60+ min)
4. **Platform** — Where the show is available (Netflix, Peacock, Disney+, Hulu, Max, Apple TV+, Paramount+, Prime Video, HBO)

### Results Display Format
- **Layout:** List format (text-based with show name and key details)
- **Information shown:** Title, genre, mood, episode length, number of seasons, total episodes, platform availability, and popularity indicator
- **Popularity feature:** "Fans love this!" or "World-renowned" badges for highly-rated shows to help users discover lesser-known gems

### Visual Style & Branding
- **Color palette:** Boho aesthetic with earthy greens and pinks
- **Vibe:** Warm, welcoming, natural aesthetic with a touch of modern elegance
- **Approach:** Clean typography and breathing room with subtle boho-inspired patterns and textures

### Data Structure
Each show object in the `options` array has these properties:

```javascript
{
  title: "Show Name",
  genre: "genre-name",
  mood: "mood-descriptor",
  episodeLength: "15-30 min|30-45 min|45-60 min|60+ min",
  seasons: 3,
  totalEpisodes: 45,
  platforms: ["Platform1", "Platform2"],
  popularity: "fans-love|world-renowned|cult-classic|hidden-gem"
}
```

---

## Matching Functions

The app needs at least 4 matching functions that use different JavaScript concepts:

### 1. Single Criteria Match (Simple Conditional)
**Function:** `matchesMood(item, desiredMood)`
- Returns `true` if item's mood matches the desired mood
- Returns `true` if user hasn't selected a mood preference (empty/null)

### 2. Range Check (Comparison Operators)
**Function:** `fitsEpisodeLength(item, desiredLength)`
- Returns `true` if the show's episode length matches the desired range
- Returns `true` if user hasn't selected a length preference

### 3. Multiple Criteria Match (Logical Operators: &&)
**Function:** `meetsAllCriteria(item, preferences)`
- Combines multiple matching checks with `&&` 
- Returns `true` only if item matches mood AND genre AND episode length AND platform
- This function should use at least 3 other matching functions joined with `&&`

### 4. Classification Function (If/Else Chain)
**Function:** `getPopularityBadge(popularity)`
- Takes the `popularity` property and returns a user-friendly message
- Example outputs: "Fans love this!", "World-renowned", "Cult classic", "Hidden gem"

### Additional Matching Functions Needed
- `matchGenre(item, chosenGenre)` — Check if genre matches
- `isOnPlatform(item, platformName)` — Check if show is available on desired platform

---

## Form & UI Requirements

### Form Fields
These correspond to the filter criteria:

1. **Mood Selection** (dropdown)
   - Options: lighthearted, comfort, funny, wholesome, thoughtful, thrilling, mind-bending, adventurous, intense, emotional, focused, spooky, slow-burn, dark
   - Default: "Any mood"

2. **Genre** (dropdown)
   - Options: comedy, drama, sci-fi, action, thriller, mystery, crime, adventure, romance, documentary, animation
   - Default: "Any genre"

3. **Episode Length** (dropdown)
   - Options: 15-30 min, 30-45 min, 45-60 min, 60+ min
   - Default: "Any length"

4. **Platform** (dropdown)
   - Options: Netflix, Peacock, Disney+, Hulu, Max, Apple TV+, Paramount+, Prime Video, HBO
   - Default: "Any platform"

### Results Display
- List format showing matches
- Each result displays: Title, Genre, Mood, Episode Length, Seasons, Total Episodes, Platforms, Popularity Badge
- If no matches found: Display helpful message like "No shows match all your preferences. Try adjusting your filters!"
- If data loads: Show number of results found (e.g., "Found 12 shows that match your preferences")

---

## Styling & Branding

### Color Palette (Boho Aesthetic)
- **Primary earthy greens:** Sage green, Forest green, Olive tones
- **Primary pinks:** Dusty rose, Blush pink, Mauve undertones
- **Warm yellows:** Mustard, Golden yellow, Warm beige
- **Neutral/background:** Cream, Off-white, Warm beige
- **Accents:** Can include warm gold, muted terracotta

### Visual Style
- Warm, inviting, natural aesthetic
- Clean typography and breathing room
- Subtle boho-inspired elements (think woven textures, organic shapes)
- Avoid harsh colors or stark contrast; keep soft and welcoming

### Branding Elements
- Page title: "What Should I Watch?"
- Subtitle: "Discover your next favorite show" (or similar)
- Keep the vibe cohesive throughout the site

---

## Technical Notes for the Build Agent

- **File structure:** Create separate files for HTML, CSS, and JavaScript
- **DOM interaction:** Use `getElementById()` and standard DOM methods
- **Event handling:** Attach event listeners to the form (submit event)
- **Data access:** Data and matching functions will be provided as global variables
- **No frameworks:** Vanilla JavaScript only (no React, Vue, etc.)
- **Responsive design:** Should work on mobile, tablet, and desktop</content>
<parameter name="filePath">c:\Users\mrumu\OneDrive\Documents\Spring 2026\my-advice-mrumurari0\BUILD-PROMPT.md