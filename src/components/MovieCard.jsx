import React from 'react';
import { Heart, Play } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function MovieCard({ movie, rank }) {
  const { toggleWishlist, isInWishlist, changeView } = useMovies();

  const isFav = isInWishlist(movie.id);
  const rating = movie.vote_average || 0;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
  };

  const handleCardClick = () => {
    changeView('movie-details', movie.id);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      {/* Absolute Bookmark Pin */}
      <button 
        className={`bookmark-btn ${isFav ? 'active' : ''}`}
        onClick={handleBookmarkClick}
        aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={16} fill={isFav ? 'currentColor' : 'none'} strokeWidth={2.5} />
      </button>

      <div className="movie-poster-wrapper">
        {/* Numerical Rank Card */}
        {rank !== undefined && (
          <div className="movie-card-rank">
            {String(rank).padStart(2, '0')}
          </div>
        )}

        <img 
          src={movie.poster_path} 
          alt={movie.title} 
          className="movie-card-poster"
          loading="lazy"
        />



        {/* Title bar at the bottom of poster */}
        <div className="movie-card-title-bar">
          {movie.title}
        </div>
      </div>

      {/* Footer Year & Rating info */}
      <div className="movie-card-footer">
        <div className="movie-footer-year">
          {releaseYear}
        </div>
        <div className={`movie-footer-rating ${rating >= 7.5 ? 'rating-high' : rating > 0 ? 'rating-low' : ''}`}>
          {rating > 0 ? rating.toFixed(1) : 'NR'}
        </div>
      </div>
    </div>
  );
}
