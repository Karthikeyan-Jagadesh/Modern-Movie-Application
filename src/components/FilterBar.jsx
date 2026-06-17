import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export default function FilterBar() {
  const { filters, genres, updateFilters, clearAllFilters } = useMovies();

  // Generate release years from current year down to 1990
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

  const handleGenreChange = (e) => {
    updateFilters({ genre: e.target.value });
  };

  const handleRatingChange = (e) => {
    updateFilters({ rating: parseFloat(e.target.value) });
  };

  const handleYearChange = (e) => {
    updateFilters({ year: e.target.value });
  };

  const hasActiveFilters = filters.genre || filters.rating > 0 || filters.year;

  return (
    <div className="brutalist-filter-grid">
      <div className="filter-group">
        <label className="filter-label">GENRE SELECTOR</label>
        <select 
          className="filter-select"
          value={filters.genre}
          onChange={handleGenreChange}
        >
          <option value="">ALL GENRES</option>
          {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">MINIMUM RATING</label>
        <div className="rating-range-container">
          <input
            type="range"
            className="rating-slider"
            min="0"
            max="10"
            step="0.5"
            value={filters.rating}
            onChange={handleRatingChange}
          />
          <span className="rating-value-badge">
            {filters.rating > 0 ? filters.rating.toFixed(1) : 'ANY'}
          </span>
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">RELEASE YEAR</label>
        <select
          className="filter-select"
          value={filters.year}
          onChange={handleYearChange}
        >
          <option value="">ANY YEAR</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters-btn" onClick={clearAllFilters}>
          <RotateCcw size={14} style={{ marginRight: '0.4rem', display: 'inline-block', verticalAlign: 'middle' }} />
          <span>RESET FILTERS</span>
        </button>
      )}
    </div>
  );
}
