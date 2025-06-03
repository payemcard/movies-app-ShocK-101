import React from 'react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="border rounded-lg overflow-hidden shadow-lg m-2">
      <img src={movie.thumbnail} alt={movie.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.name}</h3>
      </div>
    </Link>
  );
});

export default MovieCard; 