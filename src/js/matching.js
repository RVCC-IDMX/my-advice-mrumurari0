export function filterShows(shows, searchTerm) {
  return shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
