import React, { useState } from 'react';
import { X, Calendar, MapPin } from 'lucide-react';
import { getPersonDetails, getPersonMovieCredits } from '../services/tmdb';
import { useMovies } from '../context/MovieContext';

export default function CastList({ cast }) {
  const { changeView } = useMovies();
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorDetails, setActorDetails] = useState(null);
  const [actorMovies, setActorMovies] = useState([]);
  const [loadingActor, setLoadingActor] = useState(false);

  const handleActorClick = async (actor) => {
    setSelectedActor(actor);
    setLoadingActor(true);
    try {
      const details = await getPersonDetails(actor.id);
      const movies = await getPersonMovieCredits(actor.id);
      setActorDetails(details);
      setActorMovies(movies);
    } catch (error) {
      console.error('Error loading actor info:', error);
    } finally {
      setLoadingActor(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedActor(null);
    setActorDetails(null);
    setActorMovies([]);
  };

  const handleFilmographyMovieClick = (movieId) => {
    handleCloseModal();
    changeView('movie-details', movieId);
  };

  if (!cast || cast.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No cast information available.</p>;
  }

  return (
    <>
      <div className="cast-slider-container">
        {cast.map((actor) => (
          <div 
            key={actor.id} 
            className="cast-profile-card"
            onClick={() => handleActorClick(actor)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={actor.profile_path} 
              alt={actor.name} 
              className="cast-avatar"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/185x278?text=No+Photo';
              }}
            />
            <div className="cast-name" title={actor.name}>{actor.name}</div>
            <div className="cast-character" title={actor.character}>{actor.character}</div>
          </div>
        ))}
      </div>

      {/* Actor Detail Modal */}
      {selectedActor && (
        <div className="brutalist-modal-overlay" onClick={handleCloseModal}>
          <div className="brutalist-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="brutalist-modal-close" onClick={handleCloseModal} aria-label="Close details">
              <X size={18} strokeWidth={2.5} />
            </button>

            {loadingActor ? (
              <div className="brutalist-loading-box" style={{ border: 'none', background: 'transparent', padding: '3rem 0' }}>
                <div className="brutalist-spinner" />
                <span>LOADING ACTOR PROFILE...</span>
              </div>
            ) : (
              <>
                <div className="brutalist-modal-header">
                  <img 
                    src={selectedActor.profile_path} 
                    alt={selectedActor.name}
                    className="brutalist-modal-avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/185x278?text=No+Photo';
                    }}
                  />
                  <div className="brutalist-modal-actor-info">
                    <h2 className="brutalist-modal-actor-name">{selectedActor.name}</h2>
                    <p className="brutalist-modal-actor-character">
                      AS {selectedActor.character ? selectedActor.character.toUpperCase() : 'N/A'}
                    </p>
                    {actorDetails && (
                      <div className="brutalist-modal-meta-grid">
                        {actorDetails.birthday && (
                          <div className="brutalist-modal-meta-item">
                            <Calendar size={13} style={{ marginRight: '4px', flexShrink: 0 }} />
                            <span>BORN: {actorDetails.birthday}</span>
                          </div>
                        )}
                        {actorDetails.place_of_birth && (
                          <div className="brutalist-modal-meta-item">
                            <MapPin size={13} style={{ marginRight: '4px', flexShrink: 0 }} />
                            <span>{actorDetails.place_of_birth.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {actorDetails && actorDetails.biography && (
                  <div className="brutalist-modal-bio-section">
                    <h4 className="brutalist-modal-section-subtitle">BIOGRAPHY</h4>
                    <p className="brutalist-modal-bio-text">
                      {actorDetails.biography}
                    </p>
                  </div>
                )}

                <div className="brutalist-modal-known-section">
                  <h4 className="brutalist-modal-section-subtitle">KNOWN FOR</h4>
                  {actorMovies.length === 0 ? (
                    <p className="brutalist-modal-empty-text">No filmography available.</p>
                  ) : (
                    <div className="brutalist-modal-filmography-grid">
                      {actorMovies.slice(0, 4).map(m => (
                        <div 
                          key={m.id} 
                          className="brutalist-modal-film-card"
                          onClick={() => handleFilmographyMovieClick(m.id)}
                        >
                          <div className="brutalist-modal-film-poster-wrapper">
                            <img 
                              src={m.poster_path} 
                              alt={m.title}
                              className="brutalist-modal-film-poster"
                            />
                          </div>
                          <div className="brutalist-modal-film-title" title={m.title}>
                            {m.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
