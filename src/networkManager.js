const baseUrl = 'https://api.themoviedb.org/3';
export const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
export const baseBackdropImageUrl = 'https://image.tmdb.org/t/p/w1280';
export const youtubeApiKey = 'AIzaSyDiMl-ZHJQ-1vnvJH00Q6kYwOuk3kcX3vk';
const apiKey = '9f856681c9163f666d3789c63c4b482e';
const adult = false;
const language = 'en-EN';
const page = 1;

export const getMovies = async endpoint => {
  const result = await fetch(`${baseUrl}${endpoint}?api_key=${apiKey}&language=${language}&page=${page}`);
  const res = await result.json();
  return res.results;
};

export const getMovieDetail = async movieId => {
  const result = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${language}`);
  const res = await result.json();
  return res;
};

export const getPersonDetail = async personId => {
  const result = await fetch(`${baseUrl}/person/${personId}?api_key=${apiKey}&language=${language}`);
  const res = await result.json();
  return res;
};

export const getPersonImages = async personId => {
  const result = await fetch(`${baseUrl}/person/${personId}/images?api_key=${apiKey}`);
  const res = await result.json();
  return res.profiles;
};

export const getMovieCreditForAPerson = async personId => {
  const result = await fetch(`${baseUrl}/person/${personId}/movie_credits?api_key=${apiKey}&language=${language}`);
  const res = await result.json();
  return res.cast;
};

export const getCast = async movieId => {
  const result = await fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
  const res = await result.json();
  return res.cast;
};

export const getDirector = async movieId => {
  const result = await fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);
  const res = await result.json();
  return res.crew.filter(crew => crew.job === 'Director');
};

export const multiSearch = async searchText => {
  const result = await fetch(
    `${baseUrl}/search/multi?api_key=${apiKey}&language=${language}&query=${searchText}&page=${page}&include_adult=${adult}`,
  );
  const res = await result.json();
  return res.results;
};

export const getRecommendedMovies = async movieId => {
  const result = await fetch(
    `${baseUrl}/movie/${movieId}/recommendations?api_key=${apiKey}&language=${language}&page=${page}`,
  );
  const res = await result.json();
  return res.results;
};

export const videoUrl = movieId => `${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=${language}`;

export const getMoviesByGenre = async genreId => {
  const result = await fetch(
    `${baseUrl}/discover/movie?api_key=${apiKey}&language=${language}&page=${page}&with_genres=${genreId}`,
  );
  const res = await result.json();
  return res.results;
};

export const getGenres = async () => {
  const result = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=${language}`);
  const res = await result.json();
  return res.genres;
};
