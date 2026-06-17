import React, { useState, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import { Settings, Trash2, Shield, Sun, Moon } from 'lucide-react';

export default function SettingsView() {
  const { 
    theme, 
    toggleTheme, 
    accent,
    setAccent,
    trendingRegion, 
    setTrendingRegion, 
    isMockMode, 
    wishlist,
    toggleWishlist
  } = useMovies();

  const [opacity, setOpacity] = useState(() => {
    return parseFloat(localStorage.getItem('noise-opacity') || '0.08');
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--noise-opacity', opacity.toString());
    localStorage.setItem('noise-opacity', opacity.toString());
  }, [opacity]);

  const handleClearWishlist = () => {
    if (wishlist.length === 0) {
      alert('Wishlist is already empty!');
      return;
    }
    const confirm = window.confirm('Are you sure you want to clear all movies from your watchlist? This action cannot be undone.');
    if (confirm) {
      // Make a copy of wishlist and toggle each item off
      const itemsToToggle = [...wishlist];
      itemsToToggle.forEach(movie => {
        toggleWishlist(movie);
      });
    }
  };

  return (
    <div className="settings-view-container brutalist-panel">
      <div className="settings-header">
        <Settings size={28} className="settings-header-icon" />
        <h2>SYSTEM SETTINGS</h2>
      </div>

      <div className="settings-grid">
        {/* Theme Settings Block */}
        <div className="settings-card">
          <h3>01 / VISUAL THEME</h3>
          <p>Toggle system interface theme mode.</p>
          <div className="theme-toggle-row">
            <button 
              className={`theme-select-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => theme !== 'light' && toggleTheme()}
            >
              <Sun size={16} />
              <span>LIGHT BRUTALIST</span>
            </button>
            <button 
              className={`theme-select-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => theme !== 'dark' && toggleTheme()}
            >
              <Moon size={16} />
              <span>DARK CYBER-PULP</span>
            </button>
          </div>
        </div>

        {/* Accent Color Settings Block */}
        <div className="settings-card">
          <h3>01.5 / BRAND COLOR ACCENT</h3>
          <p>Choose various accent color schemes for highlights, tags, and borders.</p>
          <div className="accent-toggle-row">
            <button 
              className={`accent-select-btn ${accent === 'cyber-pulp' ? 'active' : ''}`}
              style={{ borderLeft: '8px solid #FF5500' }}
              onClick={() => setAccent('cyber-pulp')}
            >
              <span>CYBER-PULP (ORANGE/CYAN)</span>
            </button>
            <button 
              className={`accent-select-btn ${accent === 'swiss-retro' ? 'active' : ''}`}
              style={{ borderLeft: '8px solid #FF0055' }}
              onClick={() => setAccent('swiss-retro')}
            >
              <span>RETRO-SWISS (FUCHSIA/COBALT)</span>
            </button>
            <button 
              className={`accent-select-btn ${accent === 'toxic-terminal' ? 'active' : ''}`}
              style={{ borderLeft: '8px solid #d4ff00' }}
              onClick={() => setAccent('toxic-terminal')}
            >
              <span>TOXIC TERMINAL (LIME/CYAN)</span>
            </button>
            <button 
              className={`accent-select-btn ${accent === 'monochrome' ? 'active' : ''}`}
              style={{ borderLeft: '8px solid #ffffff' }}
              onClick={() => setAccent('monochrome')}
            >
              <span>MONOCHROME (WHITE/BLACK)</span>
            </button>
          </div>
        </div>

        {/* Concrete Noise Opacity */}
        <div className="settings-card">
          <h3>02 / CONCRETE TEXTURE OPACITY</h3>
          <p>Adjust the density of the brutalist noise overlay.</p>
          <div className="slider-wrapper">
            <input 
              type="range" 
              min="0" 
              max="0.2" 
              step="0.01" 
              value={opacity} 
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="brutalist-slider"
            />
            <div className="slider-value-display">
              {(opacity * 100).toFixed(0)}% OPACITY
            </div>
          </div>
        </div>

        {/* Watch Region Settings */}
        <div className="settings-card">
          <h3>03 / DEFAULT WATCH REGION</h3>
          <p>Set preference for localized trending and OTT availability.</p>
          <div className="region-select-row">
            {['GLOBAL', 'US', 'IN', 'GB'].map(region => (
              <button 
                key={region}
                className={`region-select-btn ${trendingRegion === region ? 'active' : ''}`}
                onClick={() => setTrendingRegion(region)}
              >
                {region === 'GB' ? 'UK' : region}
              </button>
            ))}
          </div>
        </div>

        {/* API Status Indicator */}
        <div className="settings-card">
          <h3>04 / TMDB DATA CONNECTION</h3>
          <p>Current backend integration mode.</p>
          <div className={`api-status-badge ${isMockMode ? 'mock' : 'live'}`}>
            <Shield size={18} />
            <span>{isMockMode ? 'OFFLINE // MOCK FALLBACK MODE' : 'ONLINE // TMDB API ACTIVE'}</span>
          </div>
        </div>

        {/* Wishlist management */}
        <div className="settings-card warning-card">
          <h3>05 / ARCHIVE OPERATIONS</h3>
          <p>Reset local database and clear all active items.</p>
          <div className="wishlist-status-row">
            <span>SAVED ITEMS: {wishlist.length}</span>
            <button 
              className="brutalist-btn warning-btn"
              onClick={handleClearWishlist}
            >
              <Trash2 size={16} />
              <span>CLEAR WISHLIST</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
