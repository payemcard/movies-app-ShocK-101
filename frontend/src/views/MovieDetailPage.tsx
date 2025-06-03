import React, { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchMovie } from '../hooks/useFetchMovie';
import { useImageWithFallback } from '../hooks/useImageWithFallback';
import { updateMovieWatchedStatus } from '../api/movies';

const MovieDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useFetchMovie(id ?? "");
  const { imgSrc, onError } = useImageWithFallback(movie?.thumbnail);
  const [watched, setWatched] = useState<boolean | undefined>(movie?.watched);

  useEffect(() => {
    setWatched(movie?.watched);
  }, [movie?.watched]);

  const handleImdbClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (!watched && movie) {
        try {
          await updateMovieWatchedStatus(movie.id, true);
          setWatched(true);
        } catch (err) {
          // TODO: handle error (e.g., show notification)
        }
      }
    },
    [movie, watched]
  );

  if (!id) {
    return <div className="flex justify-center items-center h-screen">Invalid movie URL.</div>;
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading movie details...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Movie not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg mt-8 p-8">
      <button
        onClick={() => navigate("/movies")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-semibold"
      >
        ← Back to Movies
      </button>
      <img
        src={imgSrc}
        alt={movie.name}
        className="w-full h-96 object-contain rounded mb-6"
        onError={onError}
      />
      <h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
      <div className="mb-2">
        <span className="font-semibold">Genre:</span> {movie.genre}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Rating:</span> {movie.rating}/5
      </div>
      <div className="mb-2">
        <span className="font-semibold">Watched:</span>{' '}
        {watched ? (
          <span className="text-green-600 font-bold">Yes</span>
        ) : (
          <span className="text-red-600 font-bold">No</span>
        )}
      </div>
      <div className="mt-4">
        <a
          href={movie.imdb_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-semibold"
          onClick={handleImdbClick}
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
};

export default MovieDetailPage;
