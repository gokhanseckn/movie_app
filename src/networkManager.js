const baseUrl = 'https://api.themoviedb.org/3';
export const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
export const baseBackdropImageUrl = 'https://image.tmdb.org/t/p/w1280';
const apiKey = '9f856681c9163f666d3789c63c4b482e';
const adult = false;
const language = 'en-US';
const page = 1;

export const getMovies = async endpoint => {
  const result = await fetch(
    `${baseUrl}${endpoint}?api_key=${apiKey}&language=${language}&page=${page}`,
  );
  const res = await result.json();
  return res.results;
};

export const getMovieDetail = async movieId => {
  const result = await fetch(
    `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=${language}`,
  );
  const res = await result.json();
  return res;
};

export const getCredits = async movieId => {
  const result = await fetch(
    `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`,
  );
  const res = await result.json();
  return res.cast;
};

export const multiSearch = async searchText => {
  const result = await fetch(
    `${baseUrl}/search/multi?api_key=${apiKey}&language=${language}&query=${searchText}&page=${page}&include_adult=${adult}`,
  );
  const res = await result.json();
  return res.results;
};
