import { useState, useEffect } from 'react';
import { getMovies } from '../api/movies';
import { Movie } from '../types/movie';

const LOCAL_STORAGE_KEY = 'movies';

export function useFetchMovies() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState<boolean>(movies.length === 0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movies.length]);

  return { movies, loading, error, setMovies };
}