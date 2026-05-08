import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Cache functions with try/catch wrappers for safe localStorage access
function loadCache(key) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function saveCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* quota exceeded or private browsing — safe to ignore */
  }
}

// Heading update
const heading = document.querySelector('h1');
heading.textContent = 'My Advice — Personalized TV Show Recommendations';

// Button text update
const button = document.querySelector('button');
button.textContent = 'Search Shows';

// Helpful paragraph under form
const experimentParagraph = document.createElement('p');
experimentParagraph.textContent =
  'Use the filters above to discover your next favorite show.';
document.querySelector('main').append(experimentParagraph);

const form = document.querySelector('#recommendation-form');
const results = document.querySelector('#results');

let allShows = [];
let lastResults = [];

function showLoadingMessage() {
  results.textContent = 'Loading shows...';
}

function showErrorMessage(message) {
  results.textContent = message;
}

async function loadShows() {
  // Check cache first
  const cached = loadCache('shows');
  if (cached) {
    allShows = cached;
    lastResults = allShows;
    showResults(allShows, results);
    return;
  }

  // If cache is empty, fetch from API
  showLoadingMessage();

  try {
    const response = await fetch('/.netlify/functions/api');

    if (!response.ok) {
      throw new Error('Could not load shows from the API.');
    }

    allShows = await response.json();
    lastResults = allShows;

    // Save the fetched data to cache
    saveCache('shows', allShows);

    showResults(allShows, results);
  } catch {
    showErrorMessage(
      'Sorry, the show recommendations could not load right now. Please try again later.'
    );
  }
}

// This form handler stops the page from refreshing, reads the selected filters,
// filters the fetched show data, and sends matching shows to the view functions.
function handleFormSubmit(event) {
  event.preventDefault();

  const moodSelect = document.querySelector('#mood-select');
  const genreSelect = document.querySelector('#genre-select');
  const lengthSelect = document.querySelector('#length-select');
  const platformSelect = document.querySelector('#platform-select');

  const preferences = {
    mood: moodSelect.value,
    genre: genreSelect.value,
    episodeLength: lengthSelect.value,
    platform: platformSelect.value,
  };

  const filtered = allShows.filter((show) =>
    meetsAllCriteria(show, preferences)
  );
  lastResults = filtered;

  if (filtered.length === 0) {
    showNoResults(results);
    return;
  }

  showResults(filtered, results);
}

function handleCardClick(event) {
  const card = event.target.closest('.advice-card');

  if (!card) {
    return;
  }

  const selectedShow = allShows.find(
    (show) => String(show.id) === card.dataset.id
  );

  if (!selectedShow) {
    return;
  }

  showDetail(selectedShow, results);
}

function handleBackClick(event) {
  if (!event.target.classList.contains('back-button')) {
    return;
  }

  showResults(lastResults, results);
}

form.addEventListener('submit', handleFormSubmit);
results.addEventListener('click', handleCardClick);
results.addEventListener('click', handleBackClick);

loadShows();
