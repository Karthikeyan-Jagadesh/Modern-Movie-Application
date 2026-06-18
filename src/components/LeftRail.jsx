import React, { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { Menu, X } from 'lucide-react';

export default function LeftRail() {
  const { 
    activeView, 
    changeView, 
    clearAllFilters, 
    showFiltersDrawer, 
    setShowFiltersDrawer,
    viewMode 
  } = useMovies();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (link) => {
    setMobileOpen(false);
    if (link.view === 'home') {
      if (link.mode === 'explore') {
        setShowFiltersDrawer(true);
      } else {
        setShowFiltersDrawer(false);
        clearAllFilters();
      }
      changeView('home', null, link.mode);
    } else {
      changeView(link.view);
    }
  };

  const handleFiltersClick = () => {
    setMobileOpen(false);
    changeView('home', null, 'explore');
    setShowFiltersDrawer(!showFiltersDrawer);
  };

  const navLinks = [
    { label: 'HOME', view: 'home', mode: 'trending' },
    { label: 'EXPLORE', view: 'home', mode: 'explore' },
    { label: 'TRENDING', view: 'home', mode: 'trending' },
    { label: 'WATCHLIST', view: 'wishlist' },
    { label: 'COLLECTIONS', view: 'home', mode: 'collections' },
    { label: 'GENRES', view: 'home', mode: 'explore' },
    { label: 'MOVIES', view: 'home', mode: 'trending' },
    { label: 'TV SHOWS', view: 'tv-shows' },
    { label: 'MY LIST', view: 'wishlist' },
    { label: 'SETTINGS', view: 'settings' }
  ];

  return (
    <>
      {/* Mobile Sticky Navbar Header */}
      <div className="mobile-header-bar">
        <div className="mobile-header-logo" onClick={() => handleLinkClick({ view: 'home', mode: 'trending' })}>
          MOVISPHERE
        </div>
        <button className="mobile-hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for closing mobile rail when clicked outside */}
      {mobileOpen && <div className="mobile-rail-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`left-navigation-rail ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="nav-rail-logo" onClick={() => handleLinkClick({ view: 'home', mode: 'trending' })}>
          MOVISPHERE
        </div>

        <nav className="nav-rail-links">
          {navLinks.map((link, idx) => {
            let isActive = false;
            if (link.view === 'home') {
              isActive = (activeView === 'home' && viewMode === link.mode);
            } else {
              isActive = (activeView === link.view);
            }
            
            return (
              <div 
                key={idx}
                className={`nav-rail-item ${isActive ? 'active' : ''}`}
                onClick={() => handleLinkClick(link)}
              >
                <span>{link.label}</span>
                {isActive && <span className="nav-rail-active-dot">▪</span>}
              </div>
            );
          })}
        </nav>

        {/* Embedded Filter Trigger Block in Rail */}
        <div className="nav-rail-filters-trigger" onClick={handleFiltersClick}>
          <span>FILTERS</span>
          <span className="plus-sign">{showFiltersDrawer ? '−' : '+'}</span>
        </div>
      </aside>
    </>
  );
}

