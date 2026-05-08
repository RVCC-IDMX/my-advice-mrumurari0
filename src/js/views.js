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
    showDiv.dataset.id = show.id;

    const title = document.createElement('h3');
    title.textContent = show.title;
    showDiv.append(title);

    const genre = document.createElement('p');
    genre.textContent = `Genre: ${show.genre}`;
    showDiv.append(genre);

    const description = document.createElement('p');
    description.textContent = show.description || 'No description available';
    description.className = 'show-description';
    showDiv.append(description);

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
  title.textContent = item.title || 'Untitled';
  detailDiv.append(title);

  if (item.genre) {
    const genre = document.createElement('p');
    genre.textContent = `Genre: ${item.genre}`;
    detailDiv.append(genre);
  }

  if (item.mood) {
    const mood = document.createElement('p');
    mood.textContent = `Mood: ${item.mood}`;
    detailDiv.append(mood);
  }

  if (item.episodeLength) {
    const length = document.createElement('p');
    length.textContent = `Episode Length: ${item.episodeLength}`;
    detailDiv.append(length);
  }

  if (item.seasons) {
    const seasons = document.createElement('p');
    seasons.textContent = `Seasons: ${item.seasons}`;
    detailDiv.append(seasons);
  }

  if (item.totalEpisodes) {
    const episodes = document.createElement('p');
    episodes.textContent = `Total Episodes: ${item.totalEpisodes}`;
    detailDiv.append(episodes);
  }

  if (item.platforms && Array.isArray(item.platforms)) {
    const platforms = document.createElement('p');
    platforms.textContent = `Platforms: ${item.platforms.join(', ')}`;
    detailDiv.append(platforms);
  }

  if (item.popularity) {
    const popularity = document.createElement('p');
    popularity.textContent = getPopularityBadge(item.popularity);
    detailDiv.append(popularity);
  }

  if (item.description) {
    const description = document.createElement('p');
    description.textContent = item.description;
    description.className = 'show-description';
    detailDiv.append(description);
  }

  if (item.rating) {
    const rating = document.createElement('p');
    rating.textContent = `Rating: ${item.rating.toFixed(1)}/10`;
    detailDiv.append(rating);
  }

  if (item.firstAirDate) {
    const airDate = document.createElement('p');
    airDate.textContent = `First Air Date: ${item.firstAirDate}`;
    detailDiv.append(airDate);
  }

  const backButton = document.createElement('button');
  backButton.type = 'button';
  backButton.className = 'back-button';
  backButton.textContent = 'Back to results';
  detailDiv.append(backButton);

  container.append(detailDiv);
}

export { showResults, showNoResults, showDetail };
