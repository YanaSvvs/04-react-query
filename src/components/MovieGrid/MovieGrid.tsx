
import React from 'react';
import type { Movie } from '../../types/movie';
import './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
 
  onMovieSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelect }) => {
  return (
    <ul className="grid">
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onMovieSelect(movie)}>
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