# My code map

Fill out each section below by reading your actual code. Do not guess — open each file and look. This map is your reference for the rest of the assignment. When instructions say "your results container" or "your card class," they mean what you write here.

---

## Files and their purposes

For each file, write one sentence about what it does.

| File                    | What it does |
| ----------------------- | ------------ |
| `src/js/app.js`         | Handles the form submission, collects the user input, updates the page with matching results, and filters the shows. |
| `src/js/matching.js`    | Contains the function that checks if a show matches the users filters. |
| `src/js/data.js`        | Stores the dataset of the TV shows and the properties of them. |
| `src/js/experiments.js` | Contains Week 2 DOM experiments which were used to practice manipulation of elements on the page. |
| `src/css/style.css`     | Defines the visual styling and layout of the website. |
| `index.html`            | Provides the structure of the webpage, including the form and results container. |

---

## Form

Look at your `index.html` and find the form element.

- Form ID: `#recommendation-form`
- Select element ID: `#mood-select`

- What moods/options are in the select?

  - lighthearted
  - comfort
  - funny
  - wholesome
  - thrilling
  - mind-bending
  - adventurous
  - intense
  - emotional
  - focused
  - slow-burn
  - spooky
  - dark

---

## Results container

Where do results appear on the page?

- Container ID or class: `#results`
- What element type is it? (`div`, `section`, etc.): `div`

---

## Card structure

Look at how your app.js builds each result card. What elements make up one card?

- Card element type: `div`
- Card class name: `show-item`

- What is inside each card? (list the child elements and what data they show)
  -

---

## Existing event listeners

Look through your app.js for any `addEventListener` calls. List each one.

| Where in the code | Event type | What it does |
| ----------------- | ---------- | ------------ |
|'form.addEventListener('submit', ....)'|'submit'|This stops the page from refreshing, reads the selected values, filters, and sows the matching results|

If you do not see any `addEventListener` calls, write "none found" — and then look again, because the form handler uses one.

---

## Data shape

Open `src/js/data.js` and look at one item in your dataset.

- How many items total? `24`

- Properties on each item

  - title
  - genre
  - mood
  - episodeLength
  - seasons
  - totalEpisodes
  - platforms
  - popularity

---

## CSS classes for show/hide

Do you have a `.hidden` class or similar in your CSS? If so, what does it do?

- Class name: `none found`
- What CSS rule does it apply? `none yet - I will create a .hidden class this week.`

If you do not have one, you will create one this week.
