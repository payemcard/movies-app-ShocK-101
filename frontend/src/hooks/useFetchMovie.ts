import { useState, useEffect } from 'react';
import { getMovie } from '../api/movies';
import { Movie } from '../types/movie';

export function useFetchMovie(id: string) {
  const [movie, setMovie] = useState<Movie | null>(() => {
    try {
      const stored = localStorage.getItem(`movie-${id}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(movie === null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (movie) {
      setLoading(false);
      return; // We already have the movie cached
    }

    const fetchMovie = async () => {
      try {
        const data = await getMovie(id);
        setMovie(data);
        localStorage.setItem(`movie-${id}`, JSON.stringify(data));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, movie]);

  return { movie, loading, error, setMovie };
}
