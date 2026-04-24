import { shows } from './data.js';
import { meetsAllCriteria, getPopularityBadge } from './matching.js';

const form = document.querySelector('#recommendation-form');
const results = document.querySelector('#results');

form.addEventListener('submit', (e) => {
  e.preventDefault();

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

  results.textContent = '';

  if (filtered.length === 0) {
    results.textContent =
      'No shows match all your preferences. Try adjusting your filters!';
    return;
  }

  const countDiv = document.createElement('div');
  countDiv.textContent = `Found ${filtered.length} shows that match your preferences`;
  results.appendChild(countDiv);

  filtered.forEach((show) => {
    const showDiv = document.createElement('div');
    showDiv.className = 'show-item';

    const title = document.createElement('h3');
    title.textContent = show.title;
    showDiv.appendChild(title);

    const details = document.createElement('p');
    details.textContent = `Genre: ${show.genre} | Mood: ${show.mood} | Episode Length: ${show.episodeLength} | Seasons: ${show.seasons} | Total Episodes: ${show.totalEpisodes} | Platforms: ${show.platforms.join(', ')} | ${getPopularityBadge(show.popularity)}`;
    showDiv.appendChild(details);

    results.appendChild(showDiv);
  });
});
