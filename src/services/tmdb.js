import { MOCK_MOVIES, MOCK_GENRES, MOCK_LOCAL_TRENDS } from './mockData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const isUsingMock = () => !API_KEY;

// Helper to handle TMDB API requests
async function tmdbFetch(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API Key is missing. Using mock fallback.');
  }

  const headers = {
    'Accept': 'application/json',
  };
  
  const queryParams = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== null) {
      queryParams.append(key, val);
    }
  }

  const cleanKey = API_KEY.trim();

  if (cleanKey.startsWith('eyJ')) {
    headers['Authorization'] = `Bearer ${cleanKey}`;
  } else {
    queryParams.append('api_key', cleanKey);
  }

  const url = `${BASE_URL}${endpoint}?${queryParams.toString()}`;
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }
  
  return response.json();
}

// Map TMDB movie object to clean client format
function formatMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    tagline: movie.tagline || '',
    overview: movie.overview,
    release_date: movie.release_date,
    runtime: movie.runtime || 0,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    original_language: movie.original_language,
    genres: movie.genres || [],
    genre_ids: movie.genre_ids || (movie.genres ? movie.genres.map(g => g.id) : []),
    poster_path: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster',
    backdrop_path: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : 'https://via.placeholder.com/1920x1080?text=No+Backdrop',
  };
}

// 1. Get Genres
export async function getGenres() {
  if (isUsingMock()) {
    return MOCK_GENRES;
  }

  try {
    const data = await tmdbFetch('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Failed to fetch genres, falling back to mock:', error);
    return MOCK_GENRES;
  }
}

// 2. Get Trending Movies (Global or Local Country-level)
export async function getTrending(timeWindow = 'day', country = 'US') {
  if (isUsingMock()) {
    // Return mock local trends if country code is defined, otherwise all mock movies
    const localIds = MOCK_LOCAL_TRENDS[country.toUpperCase()];
    if (localIds) {
      return MOCK_MOVIES.filter(m => localIds.includes(m.id)).map(formatMovie);
    }
    return MOCK_MOVIES.map(formatMovie);
  }

  try {
    if (country && country.toUpperCase() !== 'GLOBAL') {
      // Local trends: discover popular movies specifically watched/available in this region
      const data = await tmdbFetch('/discover/movie', {
        sort_by: 'popularity.desc',
        watch_region: country.toUpperCase(),
        with_watch_monetization_types: 'flatrate|free|ads|rent|buy',
        page: 1,
      });
      return data.results.map(formatMovie);
    } else {
      // Global trends
      const data = await tmdbFetch(`/trending/movie/${timeWindow}`);
      return data.results.map(formatMovie);
    }
  } catch (error) {
    console.error(`Failed to fetch trending (${country}), falling back to mock:`, error);
    // Fallback to mock
    const localIds = MOCK_LOCAL_TRENDS[country.toUpperCase()];
    if (localIds) {
      return MOCK_MOVIES.filter(m => localIds.includes(m.id)).map(formatMovie);
    }
    return MOCK_MOVIES.map(formatMovie);
  }
}

// 3. Search and filter movies
export async function searchAndFilterMovies(query = '', filters = {}) {
  const { genre, rating, year } = filters;

  if (isUsingMock()) {
    // Filter the mock data list locally
    let results = [...MOCK_MOVIES];

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.overview.toLowerCase().includes(q)
      );
    }

    if (genre) {
      const genreId = parseInt(genre, 10);
      results = results.filter(m => m.genre_ids.includes(genreId));
    }

    if (rating) {
      const minRating = parseFloat(rating);
      results = results.filter(m => m.vote_average >= minRating);
    }

    if (year) {
      const filterYear = parseInt(year, 10);
      results = results.filter(m => {
        const releaseYear = new Date(m.release_date).getFullYear();
        return releaseYear === filterYear;
      });
    }

    return results.map(formatMovie);
  }

  try {
    let results = [];
    
    if (query) {
      // Search by query
      const data = await tmdbFetch('/search/movie', { query });
      results = data.results;
    } else {
      // If no query but filters are present, use discover endpoint
      const discoverParams = {
        sort_by: 'popularity.desc',
        page: 1
      };
      
      if (genre) discoverParams.with_genres = genre;
      if (rating) discoverParams['vote_average.gte'] = rating;
      if (year) discoverParams.primary_release_year = year;
      
      const data = await tmdbFetch('/discover/movie', discoverParams);
      results = data.results;
    }

    // Apply secondary filters on search results if query was used
    if (query) {
      if (genre) {
        const genreId = parseInt(genre, 10);
        results = results.filter(m => m.genre_ids.includes(genreId));
      }
      if (rating) {
        results = results.filter(m => m.vote_average >= parseFloat(rating));
      }
      if (year) {
        results = results.filter(m => {
          if (!m.release_date) return false;
          return new Date(m.release_date).getFullYear() === parseInt(year, 10);
        });
      }
    }

    return results.map(formatMovie);
  } catch (error) {
    console.error('Search failed, falling back to mock search:', error);
    // Local search fallback
    return searchAndFilterMovies(query, filters); // recursion will resolve to mock branch because API key configuration is static
  }
}

// 4. Get Movie Details
export async function getMovieDetails(movieId) {
  if (isUsingMock()) {
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return movie ? formatMovie(movie) : null;
  }

  try {
    const movie = await tmdbFetch(`/movie/${movieId}`);
    return formatMovie(movie);
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${movieId}, falling back to mock:`, error);
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return movie ? formatMovie(movie) : null;
  }
}

// 5. Get Movie Videos (Trailers)
export async function getMovieVideos(movieId) {
  if (isUsingMock()) {
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    if (movie && movie.trailer_key) {
      return [{
        id: 'mock_trailer',
        key: movie.trailer_key,
        name: 'Official Trailer',
        site: 'YouTube',
        type: 'Trailer',
      }];
    }
    return [];
  }

  try {
    const data = await tmdbFetch(`/movie/${movieId}/videos`);
    // Filter for YouTube trailers
    return data.results.filter(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
  } catch (error) {
    console.error(`Failed to fetch videos for ID ${movieId}:`, error);
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    if (movie && movie.trailer_key) {
      return [{ key: movie.trailer_key, site: 'YouTube', type: 'Trailer' }];
    }
    return [];
  }
}

// 6. Get Watch Providers (OTT)
export async function getMovieWatchProviders(movieId, country = 'US') {
  const cCode = country.toUpperCase();
  
  if (isUsingMock()) {
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    if (movie && movie.watch_providers && movie.watch_providers[cCode]) {
      return movie.watch_providers[cCode];
    }
    // Return a default provider if country is not explicitly mocked to keep UI populated
    if (movie && movie.watch_providers) {
      const availableCountries = Object.keys(movie.watch_providers);
      return movie.watch_providers[availableCountries[0]] || null;
    }
    return null;
  }

  try {
    const data = await tmdbFetch(`/movie/${movieId}/watch/providers`);
    const results = data.results;
    if (results && results[cCode]) {
      const providers = results[cCode];
      // Format to include flatrate (streaming) and rent options
      return {
        flatrate: (providers.flatrate || []).map(p => ({
          provider_id: p.provider_id,
          provider_name: p.provider_name,
          logo_path: p.logo_path ? `${IMAGE_BASE_URL}/original${p.logo_path}` : '',
        })),
        rent: (providers.rent || []).map(p => ({
          provider_id: p.provider_id,
          provider_name: p.provider_name,
          logo_path: p.logo_path ? `${IMAGE_BASE_URL}/original${p.logo_path}` : '',
        })),
      };
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch watch providers for ${movieId}:`, error);
    // Fallback to mock
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    if (movie && movie.watch_providers && movie.watch_providers[cCode]) {
      return movie.watch_providers[cCode];
    }
    return null;
  }
}

// 7. Get Movie Credits (Cast and Key Crew)
export async function getMovieCredits(movieId) {
  if (isUsingMock()) {
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return {
      cast: movie ? movie.cast : [],
      crew: {
        directors: movie && movie.id === 948713 ? 'Denis Villeneuve' : (movie && movie.id === 872585 ? 'Christopher Nolan' : 'Unknown Director'),
        writers: movie && movie.id === 948713 ? 'Jon Spaihts, Denis Villeneuve' : (movie && movie.id === 872585 ? 'Christopher Nolan' : 'Unknown Writer')
      }
    };
  }

  try {
    const data = await tmdbFetch(`/movie/${movieId}/credits`);
    const cast = data.cast.slice(0, 10).map(c => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profile_path: c.profile_path ? `${IMAGE_BASE_URL}/w185${c.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Photo',
    }));

    // Extract directors and key writers
    const directorsList = data.crew.filter(c => c.job === 'Director').map(c => c.name);
    const writersList = data.crew.filter(c => c.job === 'Writer' || c.job === 'Screenplay' || c.job === 'Writer (Book)').map(c => c.name);
    
    // Remove duplicates
    const uniqueDirectors = [...new Set(directorsList)].join(', ');
    const uniqueWriters = [...new Set(writersList)].join(', ');

    return {
      cast,
      crew: {
        directors: uniqueDirectors || 'N/A',
        writers: uniqueWriters || 'N/A'
      }
    };
  } catch (error) {
    console.error(`Failed to fetch credits for ${movieId}:`, error);
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return {
      cast: movie ? movie.cast : [],
      crew: {
        directors: 'N/A',
        writers: 'N/A'
      }
    };
  }
}

// 8. Get Recommendations
export async function getMovieRecommendations(movieId) {
  if (isUsingMock()) {
    // Recommend other mock movies
    return MOCK_MOVIES.filter(m => m.id !== parseInt(movieId, 10)).slice(0, 4).map(formatMovie);
  }

  try {
    const data = await tmdbFetch(`/movie/${movieId}/recommendations`);
    return data.results.slice(0, 6).map(formatMovie);
  } catch (error) {
    console.error(`Failed to fetch recommendations for ${movieId}:`, error);
    return MOCK_MOVIES.filter(m => m.id !== parseInt(movieId, 10)).slice(0, 4).map(formatMovie);
  }
}

// 9. Get Movie Reviews
export async function getMovieReviews(movieId) {
  if (isUsingMock()) {
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return movie ? movie.reviews : [];
  }

  try {
    const data = await tmdbFetch(`/movie/${movieId}/reviews`);
    return data.results.slice(0, 3).map(r => ({
      author: r.author,
      content: r.content,
      rating: r.author_details?.rating || null,
    }));
  } catch (error) {
    console.error(`Failed to fetch reviews for ${movieId}:`, error);
    const movie = MOCK_MOVIES.find(m => m.id === parseInt(movieId, 10));
    return movie ? movie.reviews : [];
  }
}

// 10. Get Person Details (Biography)
export async function getPersonDetails(personId) {
  if (isUsingMock()) {
    const bios = {
      1190668: {
        name: 'Timothée Chalamet',
        biography: 'Timothée Hal Chalamet (born December 27, 1995) is an American and French actor. He has received various accolades, including nominations for an Academy Award, two Golden Globe Awards, and three BAFTA Film Awards.',
        birthday: '1995-12-27',
        place_of_birth: 'New York City, New York, USA'
      },
      505710: {
        name: 'Zendaya',
        biography: 'Zendaya Maree Stoermer Coleman (born September 1, 1996) is an American actress and singer. She has received various accolades, including two Primetime Emmy Awards and a Golden Globe Award. Time magazine named her one of the 100 most influential people in the world in 2022.',
        birthday: '1996-09-01',
        place_of_birth: 'Oakland, California, USA'
      },
      2037: {
        name: 'Cillian Murphy',
        biography: 'Cillian Murphy (born 25 May 1976) is an Irish actor. He made his professional debut in Enda Walsh\'s 1996 play Disco Pigs, a role he later reprised in the 2001 screen adaptation. His early film credits include the horror film 28 Days Later (2002), the dark comedy Intermission (2003), the thriller Red Eye (2005), and Oppenheimer (2023) for which he won an Academy Award.',
        birthday: '1976-05-25',
        place_of_birth: 'Douglas, County Cork, Ireland'
      },
      10297: {
        name: 'Matthew McConaughey',
        biography: 'Matthew David McConaughey (born November 4, 1969) is an American actor. He had his breakout role with a supporting performance in the coming-of-age comedy Dazed and Confused (1993), and went on to star in Interstellar (2014) and Dallas Buyers Club (2013), winning the Academy Award for Best Actor.',
        birthday: '1969-11-04',
        place_of_birth: 'Uvalde, Texas, USA'
      },
      16201: {
        name: 'Michelle Yeoh',
        biography: 'Michelle Yeoh Choo Kheng (born 6 August 1962) is a Malaysian actress. Credited as Michelle Khan in her early films in Hong Kong, she rose to fame in the 1990s after starring in a series of Hong Kong action films. She won the Academy Award for Best Actress for Everything Everywhere All at Once (2022).',
        birthday: '1962-08-06',
        place_of_birth: 'Ipoh, Perak, Malaysia'
      }
    };
    
    return bios[personId] || {
      name: 'Cast Member',
      biography: 'Biography details are currently unavailable for this cast member in mock mode. Check live TMDB connection.',
      birthday: 'N/A',
      place_of_birth: 'N/A'
    };
  }

  try {
    const data = await tmdbFetch(`/person/${personId}`);
    return {
      name: data.name,
      biography: data.biography || 'No biography available.',
      birthday: data.birthday || 'N/A',
      place_of_birth: data.place_of_birth || 'N/A'
    };
  } catch (error) {
    console.error(`Failed to fetch person details for ${personId}:`, error);
    return {
      name: 'Cast Member',
      biography: 'Failed to retrieve bio from TMDB API.',
      birthday: 'N/A',
      place_of_birth: 'N/A'
    };
  }
}

// 11. Get Person Movie Credits (Filmography)
export async function getPersonMovieCredits(personId) {
  if (isUsingMock()) {
    const pId = parseInt(personId, 10);
    // Find mock movies where this person is in the cast
    const credits = MOCK_MOVIES.filter(m => m.cast.some(c => c.id === pId)).map(formatMovie);
    return credits;
  }

  try {
    const data = await tmdbFetch(`/person/${personId}/movie_credits`);
    // Return top 8 movies ordered by popularity
    const sorted = (data.cast || [])
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 8);
    return sorted.map(formatMovie);
  } catch (error) {
    console.error(`Failed to fetch movie credits for person ${personId}:`, error);
    return [];
  }
}

// 12. Get Top Rated Movies (Collections)
export async function getTopRatedMovies() {
  if (isUsingMock()) {
    // Return mock movies sorted by vote_average descending
    return [...MOCK_MOVIES]
      .sort((a, b) => b.vote_average - a.vote_average)
      .map(formatMovie);
  }

  try {
    const data = await tmdbFetch('/movie/top_rated', { page: 1 });
    return data.results.map(formatMovie);
  } catch (error) {
    console.error('Failed to fetch top rated movies, falling back to mock:', error);
    return [...MOCK_MOVIES]
      .sort((a, b) => b.vote_average - a.vote_average)
      .map(formatMovie);
  }
}


