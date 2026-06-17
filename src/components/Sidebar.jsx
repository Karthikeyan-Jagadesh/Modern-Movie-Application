import React, { useState, useEffect } from 'react';
import { Play, Tv, Globe } from 'lucide-react';
import { getMovieWatchProviders } from '../services/tmdb';
import { useMovies } from '../context/MovieContext';

export default function Sidebar({ movieId, videos }) {
  const { trendingRegion, setTrendingRegion } = useMovies();
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(false);

  // Find the official trailer or first teaser
  const trailer = videos.find(v => v.type === 'Trailer') || videos[0];

  useEffect(() => {
    const fetchProviders = async () => {
      if (!movieId) return;
      setLoadingProviders(true);
      try {
        const data = await getMovieWatchProviders(movieId, trendingRegion);
        setProviders(data);
      } catch (err) {
        console.error('Failed to load watch providers:', err);
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchProviders();
  }, [movieId, trendingRegion]);

  const handleCountryChange = (e) => {
    setTrendingRegion(e.target.value);
  };

  return (
    <div className="sidebar-panel">
      {/* 1. YouTube Trailer */}
      <div>
        <h3 
          className="detail-section-title"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}
        >
          <Play size={18} fill="currentColor" />
          <span>Official Trailer</span>
        </h3>
        
        <div className="video-player-container">
          {trailer ? (
            <iframe
              className="video-iframe"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=0`}
              title="Movie Trailer"
              allowFullScreen
            />
          ) : (
            <div 
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                textAlign: 'center',
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.4)'
              }}
            >
              No video trailer available.
            </div>
          )}
        </div>
      </div>

      {/* 2. Streaming Providers (OTT) */}
      <div className="ott-provider-section">
        <div className="ott-title-row">
          <h3 
            className="detail-section-title"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}
          >
            <Tv size={18} />
            <span>Where to Watch</span>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Globe size={14} className="text-muted" />
            <select
              className="ott-country-select"
              value={trendingRegion}
              onChange={handleCountryChange}
              title="Select region for streaming options"
            >
              <option value="US">United States (US)</option>
              <option value="IN">India (IN)</option>
              <option value="GB">United Kingdom (UK)</option>
            </select>
          </div>
        </div>

        {loadingProviders ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0' }}>
            <div className="pulse-dot" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Checking availability...</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '0.5rem' }}>
            
            {/* Flatrate Streaming */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Subscription Stream
              </p>
              {providers && providers.flatrate && providers.flatrate.length > 0 ? (
                <div className="ott-grid">
                  {providers.flatrate.map(p => (
                    <div key={p.provider_id} className="ott-provider-item">
                      <img 
                        src={p.logo_path ? (p.logo_path.startsWith('http') ? p.logo_path : `https://image.tmdb.org/t/p/original${p.logo_path}`) : 'https://via.placeholder.com/100?text=OTT'} 
                        alt={p.provider_name} 
                        className="ott-logo"
                      />
                      <span className="ott-provider-name-tooltip">{p.provider_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Not streaming under subscription in this region.
                </p>
              )}
            </div>

            {/* Rent/Buy Options */}
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Rent / Buy
              </p>
              {providers && providers.rent && providers.rent.length > 0 ? (
                <div className="ott-grid">
                  {providers.rent.map(p => (
                    <div key={p.provider_id} className="ott-provider-item">
                      <img 
                        src={p.logo_path ? (p.logo_path.startsWith('http') ? p.logo_path : `https://image.tmdb.org/t/p/original${p.logo_path}`) : 'https://via.placeholder.com/100?text=OTT'} 
                        alt={p.provider_name} 
                        className="ott-logo"
                      />
                      <span className="ott-provider-name-tooltip">{p.provider_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  No digital rental options listed in this region.
                </p>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
