import React from 'react';

export default function Backdrop({ backdropPath }) {
  if (!backdropPath) return null;

  return (
    <div 
      className="movie-backdrop-bg"
      style={{ backgroundImage: `url(${backdropPath})` }}
      aria-hidden="true"
    />
  );
}
