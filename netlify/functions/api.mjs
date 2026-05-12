const GENRE_BY_ID = {
  10759: 'Action & Adventure',
  35: 'Comedy',
  18: 'Drama',
  10765: 'Sci-Fi & Fantasy',
  9648: 'Mystery',
  80: 'Crime',
  10751: 'Family',
  16: 'Animation',
  10762: 'Kids',
  // Partial map — extend from /genre/tv/list when needed
};

function moodFromGenre(genre) {
  if (['comedy', 'family', 'kids', 'animation'].includes(genre))
    return 'lighthearted';
  if (['drama', 'mystery', 'crime'].includes(genre)) return 'thoughtful';
  if (['action & adventure', 'sci-fi & fantasy'].includes(genre))
    return 'exciting';
  return 'any';
}

export default async () => {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'TMDb request failed',
        }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const json = await response.json();

    const transformedShows = json.results.map((show) => {
      const genre = (
        GENRE_BY_ID[show.genre_ids?.[0]] || 'Unknown'
      ).toLowerCase();
      return {
        id: show.id,
        title: show.name,
        description: show.overview,
        rating: show.vote_average,
        popularity: show.popularity,
        firstAirDate: show.first_air_date,
        posterPath: show.poster_path,
        genre,
        mood: moodFromGenre(genre),
      };
    });

    return new Response(JSON.stringify(transformedShows), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
