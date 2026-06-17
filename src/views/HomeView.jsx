import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import { getTrending, searchAndFilterMovies, getTopRatedMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import FilterBar from '../components/FilterBar';

export default function HomeView() {
  const { 
    searchQuery, 
    filters, 
    trendingRegion, 
    setTrendingRegion, 
    showFiltersDrawer, 
    setShowFiltersDrawer, 
    changeView,
    viewMode 
  } = useMovies();
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const isBrowsing = searchQuery || filters.genre || filters.rating > 0 || filters.year;
  const showHero = viewMode === 'trending' && !isBrowsing;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        if (viewMode === 'collections') {
          const results = await getTopRatedMovies();
          setMovies(results);
        } else if (viewMode === 'explore' || isBrowsing) {
          const results = await searchAndFilterMovies(searchQuery, filters);
          setMovies(results);
        } else {
          const results = await getTrending('day', trendingRegion);
          setMovies(results);
        }
      } catch (error) {
        console.error('Failed to load movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, filters, trendingRegion, viewMode, isBrowsing]);

  const handleTrendingToggle = (region) => {
    setTrendingRegion(region);
  };

  // Select the first movie to serve as the editorial hero visual thumbnail
  const featuredMovie = movies[0];

  const getHeaderTitle = () => {
    if (viewMode === 'collections') return '↗ TOP-RATED COLLECTIONS';
    if (viewMode === 'explore' || isBrowsing) return '↗ EXPLORE ARCHIVE';
    return '↗ TRENDING TODAY';
  };

  return (
    <div className="home-view-container">
      {/* 1. Oversized Editorial Hero Banner */}
      {showHero && (
        <section className="editorial-hero-banner">
          <div className="hero-text-block">
            <h1>DISCOVER.<br />TRACK.<br />WATCH.<br />REPEAT.</h1>
            <div className="hero-tagline-col">
              <div className="hero-vertical-divider" />
              <p className="hero-tagline-text">
                YOUR ULTIMATE<br />CINEMA<br />DESTINATION.
              </p>
            </div>
          </div>

          <div className="hero-featured-poster-block">
            {featuredMovie && (
              <>
                <div className="featured-rank-index">01</div>
                <div 
                  className="featured-poster-image"
                  style={{ backgroundImage: `url(${featuredMovie.backdrop_path || featuredMovie.poster_path})` }}
                  onClick={() => changeView('movie-details', featuredMovie.id)}
                />
              </>
            )}
          </div>
        </section>
      )}

      {/* 2. Grid Header */}
      <section className="grid-section-header">
        <h2 className="grid-header-title">
          {getHeaderTitle()}
        </h2>

        {viewMode === 'trending' && !isBrowsing && (
          <div className="trending-segment-selector">
            {['GLOBAL', 'US', 'IN', 'GB'].map((region) => (
              <button 
                key={region}
                className={`segment-btn ${trendingRegion === region ? 'active' : ''}`}
                onClick={() => handleTrendingToggle(region)}
              >
                {region === 'GB' ? 'UK' : region}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Movie Grid */}
      {loading ? (
        <div className="brutalist-loading-box">
          <div className="brutalist-spinner" />
          <span>LOADING MOVIE RELEASES...</span>
        </div>
      ) : movies.length === 0 ? (
        <div className="no-results-brutalist">
          <div className="no-results-title">00 NO RELEASES FOUND</div>
          <p>
            No matches found. Try resetting filters or updating search queries.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              rank={(viewMode === 'trending' && !isBrowsing) || viewMode === 'collections' ? index + 1 : undefined} 
            />
          ))}
        </div>
      )}

      {/* 4. Bottom Utility Filter Drawer Strip */}
      <footer className="bottom-filter-drawer-bar">
        <div className="bottom-drawer-header" onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}>
          <div className="bottom-drawer-title">
            <span>ADVANCED FILTERS</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '0.4rem' }}>{showFiltersDrawer ? '▲' : '▼'}</span>
          </div>
          
          <button className="bottom-show-filters-btn">
            <span>{showFiltersDrawer ? 'HIDE FILTERS' : 'SHOW FILTERS'}</span>
            <span className="plus-sign">{showFiltersDrawer ? '−' : '+'}</span>
          </button>
        </div>

        {showFiltersDrawer && (
          <div className="bottom-drawer-content">
            <FilterBar />
          </div>
        )}
      </footer>
    </div>
  );
}

