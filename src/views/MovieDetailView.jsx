import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import { 
  getMovieDetails, 
  getMovieVideos, 
  getMovieCredits, 
  getMovieRecommendations,
  getMovieReviews
} from '../services/tmdb';
import Backdrop from '../components/Backdrop';
import Sidebar from '../components/Sidebar';
import CastList from '../components/CastList';
import MovieCard from '../components/MovieCard';
import { 
  ChevronLeft, 
  Heart, 
  Calendar, 
  Clock, 
  Languages, 
  Star, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function MovieDetailView() {
  const { selectedMovieId, changeView, toggleWishlist, isInWishlist } = useMovies();

  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFav = movie ? isInWishlist(movie.id) : false;

  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!selectedMovieId) return;
      setLoading(true);
      try {
        const [movieData, videoData, creditData, recData, reviewData] = await Promise.all([
          getMovieDetails(selectedMovieId),
          getMovieVideos(selectedMovieId),
          getMovieCredits(selectedMovieId),
          getMovieRecommendations(selectedMovieId),
          getMovieReviews(selectedMovieId)
        ]);

        setMovie(movieData);
        setVideos(videoData);
        setCast(creditData);
        setRecommendations(recData);
        setReviews(reviewData);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [selectedMovieId]);

  if (loading) {
    return (
      <div className="brutalist-loading-box">
        <div className="brutalist-spinner" />
        <span>LOADING CINEMATIC EXPERIENCE...</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="no-results-brutalist">
        <div className="no-results-title">00 MOVIE NOT FOUND</div>
        <p>We couldn't retrieve the details for this movie. It might have been deleted or doesn't exist.</p>
        <button className="clear-filters-btn" style={{ marginTop: '1rem' }} onClick={() => changeView('home')}>
          BACK TO HOME
        </button>
      </div>
    );
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const displayRating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="detail-view-container">
      {/* Dynamic blurred backdrop */}
      <Backdrop backdropPath={movie.backdrop_path} />

      <div className="detail-content-wrapper">
        {/* Left Column: Poster + Sidebar (Trailer & OTT) */}
        <div className="movie-poster-column">
          <div className="movie-poster-card-wrapper">
            <img 
              src={movie.poster_path} 
              alt={movie.title} 
              className="movie-detail-poster"
            />
            <Sidebar movieId={movie.id} videos={videos} />
          </div>
        </div>

        {/* Right Column: Meta Info, Synopsis, Cast, Reviews, Recommendations */}
        <div className="movie-info-column">
          {/* Back button */}
          <button 
            onClick={() => changeView('home')}
            className="brutalist-back-btn"
          >
            <ChevronLeft size={16} />
            <span>BACK TO BROWSE</span>
          </button>

          {/* Title and Tagline */}
          <div>
            <div className="movie-detail-title-row">
              <h1 className="movie-detail-title">{movie.title}</h1>
              
              {/* Wishlist toggle button */}
              <button
                onClick={() => toggleWishlist(movie)}
                className={`brutalist-detail-wishlist-btn ${isFav ? 'active' : ''}`}
                title={isFav ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
              </button>
            </div>
            {movie.tagline && <p className="movie-detail-tagline">"{movie.tagline}"</p>}
          </div>

          {/* Meta Information Row */}
          <div className="movie-detail-meta-row">
            <div className="meta-item rating-accent-text">
              <Star size={16} fill="currentColor" />
              <span className="rating-font-bold">{displayRating} rating</span>
            </div>

            <div className="meta-item">
              <Calendar size={16} />
              <span>{movie.release_date || 'N/A'}</span>
            </div>

            <div className="meta-item">
              <Clock size={16} />
              <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
            </div>

            <div className="meta-item" style={{ textTransform: 'uppercase' }}>
              <Languages size={16} />
              <span>{movie.original_language}</span>
            </div>

            <div className="detail-genres">
              {movie.genres.map(g => (
                <span key={g.id} className="genre-badge">{g.name}</span>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          <div>
            <h3 className="detail-section-title">Synopsis</h3>
            <p className="detail-overview">{movie.overview}</p>
          </div>

          {/* Cast Members Section */}
          <div>
            <h3 className="detail-section-title">Top Billed Cast</h3>
            <CastList cast={cast} />
          </div>

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <div>
              <h3 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MessageSquare size={18} />
                <span>User Reviews</span>
              </h3>
              <div style={{ marginTop: '0.8rem' }}>
                {reviews.map((r, idx) => (
                  <div key={idx} className="review-item">
                    <div className="review-author-row">
                      <span className="review-author">Review by {r.author}</span>
                      {r.rating && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--rating-mid)', fontSize: '0.8rem', fontWeight: 700 }}>
                          <Star size={12} fill="currentColor" />
                          <span>{r.rating}/10</span>
                        </div>
                      )}
                    </div>
                    <p className="review-text">
                      {r.content.length > 250 ? `${r.content.slice(0, 250)}...` : r.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Section */}
          {recommendations.length > 0 && (
            <div>
              <h3 className="detail-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <Sparkles size={18} />
                <span>People Also Liked</span>
              </h3>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '1.5rem'
                }}
              >
                {recommendations.slice(0, 4).map(rec => (
                  <MovieCard key={rec.id} movie={rec} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
