import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGenres, isUsingMock } from '../services/tmdb';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [wishlist, setWishlist] = useState([]);
  const [activeView, setActiveView] = useState('home'); // 'home' | 'movie-details' | 'wishlist'
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [viewMode, setViewMode] = useState('trending'); // 'trending' | 'explore' | 'collections'
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('accent') || 'cyber-pulp';
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.setAttribute('data-accent', accent);
    localStorage.setItem('accent', accent);
  }, [accent]);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    rating: 0,
    year: '',
  });
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Country settings for Trending & OTT Watch Providers
  const [trendingRegion, setTrendingRegion] = useState('US');

  // Metadata/Genres State
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockMode, setIsMockMode] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('movie_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse saved wishlist:', e);
      }
    }

    // Determine mock mode
    setIsMockMode(isUsingMock());

    // Fetch genres
    const fetchGenres = async () => {
      try {
        const list = await getGenres();
        setGenres(list);
      } catch (err) {
        console.error('Failed to load genres:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenres();
  }, []);

  // Sync wishlist to localStorage
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('movie_wishlist', JSON.stringify(newWishlist));
  };

  // Toggle wishlist item
  const toggleWishlist = (movie) => {
    const exists = wishlist.some(m => m.id === movie.id);
    let updated;
    if (exists) {
      updated = wishlist.filter(m => m.id !== movie.id);
    } else {
      updated = [...wishlist, movie];
    }
    saveWishlist(updated);
  };

  const isInWishlist = (movieId) => {
    return wishlist.some(m => m.id === parseInt(movieId, 10));
  };

  // Router View Navigation helper
  const changeView = (view, movieId = null, mode = null) => {
    setActiveView(view);
    if (movieId) {
      setSelectedMovieId(parseInt(movieId, 10));
    } else {
      setSelectedMovieId(null);
    }
    if (mode) {
      setViewMode(mode);
    }
    // Scroll back to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update filters helper
  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Clear all search and filter conditions
  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      genre: '',
      rating: 0,
      year: '',
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <MovieContext.Provider
      value={{
        theme,
        toggleTheme,
        accent,
        setAccent,
        wishlist,
        activeView,
        selectedMovieId,
        viewMode,
        setViewMode,
        searchQuery,
        filters,
        trendingRegion,
        genres,
        isLoading,
        isMockMode,
        toggleWishlist,
        isInWishlist,
        changeView,
        setSearchQuery,
        updateFilters,
        clearAllFilters,
        setTrendingRegion,
        showFiltersDrawer,
        setShowFiltersDrawer,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
