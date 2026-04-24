export function matchesMood(item, desiredMood) {
  if (!desiredMood || desiredMood === 'Any mood') {
    return true;
  }
  return item.mood === desiredMood;
}

export function fitsEpisodeLength(item, desiredLength) {
  if (!desiredLength || desiredLength === 'Any length') {
    return true;
  }
  return item.episodeLength === desiredLength;
}

export function matchGenre(item, chosenGenre) {
  if (!chosenGenre || chosenGenre === 'Any genre') {
    return true;
  }
  return item.genre === chosenGenre;
}

export function isOnPlatform(item, platformName) {
  if (!platformName || platformName === 'Any platform') {
    return true;
  }
  return item.platforms.includes(platformName);
}

export function meetsAllCriteria(item, preferences) {
  return (
    matchesMood(item, preferences.mood) &&
    matchGenre(item, preferences.genre) &&
    fitsEpisodeLength(item, preferences.episodeLength) &&
    isOnPlatform(item, preferences.platform)
  );
}

export function getPopularityBadge(popularity) {
  switch (popularity) {
    case 'fans-love':
      return 'Fans love this!';
    case 'world-renowned':
      return 'World-renowned';
    case 'cult-classic':
      return 'Cult classic';
    case 'hidden-gem':
      return 'Hidden gem';
    default:
      return '';
  }
}
