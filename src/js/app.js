import { shows } from './data.js';
import { filterShows } from './matching.js';

const form = document.querySelector('form');
const input = document.querySelector('input');
const results = document.querySelector('#results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const filtered = filterShows(shows, input.value);

  results.innerHTML = '';

  if (filtered.length === 0) {
    results.textContent = 'No shows found';
    return;
  }

  filtered.forEach((show) => {
    const div = document.createElement('div');
    div.textContent = `${show.title} (${show.genre}) - Rating: ${show.rating}`;
    results.appendChild(div);
  });

  input.value = '';
});
