import React from 'react';
import { Search, Heart } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function TopBar() {
  const { searchQuery, setSearchQuery, activeView, changeView } = useMovies();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activeView !== 'home') {
      changeView('home');
    }
  };

  return (
    <header className="top-navigation-bar">
      <div className="top-search-container">
        <button className="top-search-btn" aria-label="Search">
          <Search size={18} strokeWidth={2.5} />
        </button>
        <input
          type="text"
          className="top-search-input"
          placeholder="SEARCH BY TITLE, ACTOR, DIRECTOR..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="top-bar-actions">
        <button 
          className={`top-wishlist-btn ${activeView === 'wishlist' ? 'active' : ''}`}
          onClick={() => changeView('wishlist')}
        >
          <span>WISHLIST</span>
          <Heart size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
