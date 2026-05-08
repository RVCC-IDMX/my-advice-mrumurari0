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
      return {
        id: show.id,
        title: show.name,
        description: show.overview,
        rating: show.vote_average,
        popularity: show.popularity,
        firstAirDate: show.first_air_date,
        posterPath: show.poster_path,
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
