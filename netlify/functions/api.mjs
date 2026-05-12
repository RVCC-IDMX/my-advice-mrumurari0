import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async (request) => {
  try {
    const url = new URL(request.url);
    const prompt = url.searchParams.get('prompt') || 'mystery shows';

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a TV recommendation assistant. You must return only valid JSON. No markdown. No explanation.',
        },
        {
          role: 'user',
          content: `Return exactly 2 TV show recommendations for: "${prompt}"

Use this exact JSON format:
{
  "shows": [
    {
      "id": 1,
      "title": "Show Name",
      "description": "Short reason why it matches",
      "rating": 8.5,
      "popularity": 90,
      "firstAirDate": "2020-01-01",
      "posterPath": null,
      "genre": "Mystery",
      "mood": "thoughtful"
    }
  ]
}`,
        },
      ],
    });

    const text = completion.choices[0].message.content;
    const parsed = JSON.parse(text);
    const shows = parsed.shows || [];

    return Response.json(shows.slice(0, 2));
  } catch (error) {
    return Response.json([
      {
        id: 999,
        title: 'ERROR LOADING GROQ',
        description: error.message,
        rating: 0,
        popularity: 0,
        firstAirDate: '2026-01-01',
        posterPath: null,
        genre: 'Drama',
        mood: 'thoughtful',
      },
    ]);
  }
};
