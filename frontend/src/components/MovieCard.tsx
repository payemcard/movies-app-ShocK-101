import React from 'react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="border rounded-lg overflow-hidden shadow-lg bg-surface block">
      <img src={movie.thumbnail} alt={movie.name} className="w-full object-contain" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-text">{movie.name}</h3>
      </div>
    </Link>
  );
});

export default MovieCard; 