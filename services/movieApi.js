export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async (query, genreId) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : genreId
    ? `/discover/movie?sort_by=popularity.desc&with_genres=${genreId}`
    : "/discover/movie?sort_by=popularity.desc";

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("failed to fetch movies!", response.statusText);
  }

  const data = await response.json();

  return data.results.slice(0, 15);
};

export const fetchMovieDetails = async (movieId) => {
  const endpoint = `/movie/${movieId}`;

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("failed to fetch movie details!", response.statusText);
  }

  const data = await response.json();

  return data;
};

export const fetchWishlistMovies = async (movieIds) => {
  const requests = movieIds.map((movieId) => {
    const endpoint = `/movie/${movieId}`;

    return fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch movie with ID: ${movieId}`);
      }
      return response.json();
    });
  });

  return Promise.all(requests);
};
