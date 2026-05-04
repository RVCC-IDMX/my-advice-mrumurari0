import { getPopularityBadge } from './matching.js';

function clearContainer(container) {
  container.textContent = '';
}

function showResults(items, container) {
  clearContainer(container);

  const countDiv = document.createElement('div');
  countDiv.textContent = `Found ${items.length} shows that match your preferences`;
  container.append(countDiv);

  for (const show of items) {
    const showDiv = document.createElement('div');
    showDiv.className = 'show-item advice-card';
    showDiv.dataset.title = show.title;

    const title = document.createElement('h3');
    title.textContent = show.title;
    showDiv.append(title);

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${show.genre}`;
    showDiv.append(genre);

    container.append(showDiv);
  }
}

function showNoResults(container) {
  clearContainer(container);
  container.textContent =
    'No shows match all your preferences. Try adjusting your filters!';
}

function showDetail(item, container) {
  clearContainer(container);

  const detailDiv = document.createElement('div');
  detailDiv.className = 'show-detail';

  const title = document.createElement('h2');
  title.textContent = item.title;
  detailDiv.append(title);

  const genre = document.createElement('p');
  genre.textContent = `Genre: ${item.genre}`;
  detailDiv.append(genre);

  const mood = document.createElement('p');
  mood.textContent = `Mood: ${item.mood}`;
  detailDiv.append(mood);

  const length = document.createElement('p');
  length.textContent = `Episode Length: ${item.episodeLength}`;
  detailDiv.append(length);

  const seasons = document.createElement('p');
  seasons.textContent = `Seasons: ${item.seasons}`;
  detailDiv.append(seasons);

  const episodes = document.createElement('p');
  episodes.textContent = `Total Episodes: ${item.totalEpisodes}`;
  detailDiv.append(episodes);

  const platforms = document.createElement('p');
  platforms.textContent = `Platforms: ${item.platforms.join(', ')}`;
  detailDiv.append(platforms);

  const popularity = document.createElement('p');
  popularity.textContent = getPopularityBadge(item.popularity);
  detailDiv.append(popularity);

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'back-button';
  backButton.textContent = 'Back to results';
  detailDiv.append(backButton);

  container.append(detailDiv);
}

export { showResults, showNoResults, showDetail };
