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

const heading = document.querySelector('h1');
heading.textContent = 'My Advice — Personalized TV Show Recommendations';

const button = document.querySelector('button');
button.textContent = 'Search Shows';

const experimentParagraph = document.createElement('p');
experimentParagraph.textContent =
  'Describe what you want to watch, then use the filters to narrow your results.';
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

async function loadShows(prompt = '') {
  const cacheKey = `shows-${prompt || 'default'}`;
  const cached = loadCache(cacheKey);

  if (cached) {
    allShows = cached;
    lastResults = allShows;
    showResults(allShows, results);
    return;
  }

  showLoadingMessage();

  try {
    const response = await fetch(
      `/.netlify/functions/api?prompt=${encodeURIComponent(prompt)}`
    );

    if (!response.ok) {
      throw new Error('Could not load shows from the API.');
    }

    const data = await response.json();

    if (data.refused) {
      showErrorMessage(data.refusal_reason);
      return;
    }

    allShows = data;
    lastResults = allShows;
    saveCache(cacheKey, allShows);
    showResults(allShows, results);
  } catch {
    showErrorMessage(
      'Sorry, the show recommendations could not load right now. Please try again later.'
    );
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const promptInput = document.querySelector('#prompt-input');
  const moodSelect = document.querySelector('#mood-select');
  const genreSelect = document.querySelector('#genre-select');

  const prompt = promptInput.value.trim();

  await loadShows(prompt);

  const preferences = {
    mood: moodSelect.value,
    genre: genreSelect.value,
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
