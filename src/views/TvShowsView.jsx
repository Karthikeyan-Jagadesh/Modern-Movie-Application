import React from 'react';
import { Tv } from 'lucide-react';

export default function TvShowsView() {
  return (
    <div className="tv-shows-view-container brutalist-panel">
      <div className="billboard-index">V.02</div>
      
      <div className="billboard-content">
        <div className="billboard-icon-wrapper">
          <Tv size={80} strokeWidth={1.5} />
        </div>
        
        <h1 className="billboard-title">
          TV SHOWS<br />INTEGRATION<br />COMING SOON
        </h1>
      </div>
    </div>
  );
}

