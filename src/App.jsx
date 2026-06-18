import React from 'react';
import { MovieProvider, useMovies } from './context/MovieContext';
import LeftRail from './components/LeftRail';
import TopBar from './components/TopBar';
import { Analytics } from '@vercel/analytics/react';
import HomeView from './views/HomeView';
import MovieDetailView from './views/MovieDetailView';
import WishlistView from './views/WishlistView';
import TvShowsView from './views/TvShowsView';
import SettingsView from './views/SettingsView';
import { Info } from 'lucide-react';

function AppContent() {
  const { activeView, isMockMode } = useMovies();

  // Custom router dispatcher
  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />;
      case 'movie-details':
        return <MovieDetailView />;
      case 'wishlist':
        return <WishlistView />;
      case 'tv-shows':
        return <TvShowsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="app-container">
      {/* 1. Left Fixed Navigation Rail */}
      <LeftRail />

      {/* 2. Main display area */}
      <div className="main-viewport-wrapper">
        {isMockMode && (
          <div className="mock-banner">
            <div className="pulse-dot" />
            <Info size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            <span>
              RUNNING IN MOCK MODE. ADD A <code>VITE_TMDB_API_KEY</code> IN YOUR <code>.env</code> TO INTEGRATE LIVE DATA.
            </span>
          </div>
        )}

        <TopBar />

        <main className="main-content">
          {renderView()}
        </main>

        <footer className="brutalist-footer">
          <p>© {new Date().getFullYear()} MOVISPHERE. EDITORIAL MOVIE ARCHIVE. POWERED BY REACT & TMDB.</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <AppContent />
      <Analytics />
    </MovieProvider>
  );
}
