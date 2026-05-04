import { shows } from './data.js';
import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

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

let lastResults = [];

// This form handler stops the page from refreshing, reads the selected filters,
// filters the show data, and sends matching shows to the view functions.
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

  const filtered = shows.filter((show) => meetsAllCriteria(show, preferences));
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

  const selectedShow = shows.find((show) => show.title === card.dataset.title);

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
