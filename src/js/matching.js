export function matchesMood(item, desiredMood) {
  if (!desiredMood || desiredMood === 'Any mood') {
    return true;
  }
  return item.mood === desiredMood;
}

export function matchGenre(item, chosenGenre) {
  if (!chosenGenre || chosenGenre === 'Any genre') {
    return true;
  }
  return item.genre === chosenGenre;
}

export function meetsAllCriteria(item, preferences) {
  return (
    matchesMood(item, preferences.mood) && matchGenre(item, preferences.genre)
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
