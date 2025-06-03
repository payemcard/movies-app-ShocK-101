import React from 'react';
import { Movie } from '../types/movie';
import { Link } from 'react-router-dom';
import { useImageWithFallback } from '../hooks/useImageWithFallback';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie }) => {
    const { imgSrc, onError } = useImageWithFallback(movie.thumbnail);

  return (
    <Link to={`/movies/${movie.id}`} className="border rounded-lg overflow-hidden shadow-lg bg-surface block h-full">
      <div className="flex flex-col justify-between h-full">
        <img
      src={imgSrc}
      alt={movie.name}
      className="w-full h-64 object-contain"
      onError={onError}
    />
        <div className="p-4 flex justify-center items-center">
          <h3 className="text-lg font-bold text-text text-center">{movie.name}</h3>
        </div>
      </div>
    </Link>
  );
});

export default MovieCard;
