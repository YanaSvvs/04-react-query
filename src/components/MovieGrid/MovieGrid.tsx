
import React from 'react';
import type { Movie } from '../../types/movie';
import './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className="grid">
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <h4>{movie.title}</h4>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
