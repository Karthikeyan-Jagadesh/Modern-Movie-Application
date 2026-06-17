import React from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Heart, Compass } from 'lucide-react';

export default function WishlistView() {
  const { wishlist, changeView } = useMovies();

  return (
    <div>
      <div className="grid-section-header">
        <h2 className="grid-header-title">↗ MY WISHLIST</h2>
        {wishlist.length > 0 && (
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
            {wishlist.length} {wishlist.length === 1 ? 'MOVIE' : 'MOVIES'} SAVED
          </span>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="no-results-brutalist">
          <div className="brutalist-wishlist-empty-heart">
            <Heart size={32} fill="currentColor" />
          </div>
          <div className="no-results-title">00 YOUR WISHLIST IS EMPTY</div>
          <p style={{ maxWidth: '400px', margin: '0.5rem 0' }}>
            Explore our trending lists and search catalog. When you find a movie you'd like to watch later, bookmark it to save it here!
          </p>
          <button 
            className="brutalist-back-btn active-lime-btn" 
            onClick={() => changeView('home')}
            style={{ display: 'flex', gap: '0.6rem', padding: '0.8rem 1.8rem', marginTop: '1.5rem', color: '#000' }}
          >
            <Compass size={18} />
            <span>DISCOVER MOVIES</span>
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
