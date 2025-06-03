import { LOCAL_STORAGE_KEY } from '../constants';
import { Movie } from '../types/movie';

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch('http://localhost:5001/api/movies');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data;
}

export async function getMovie(id: string): Promise<Movie> {
  const response = await fetch(`http://localhost:5001/api/movies/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie with id ${id}`);
  }
  const data = await response.json();
  return data;
}

export async function updateMovieWatchedStatus(id: string, watched: boolean): Promise<Movie> {
  const response = await fetch(`http://localhost:5001/api/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ watched }),
  });
  if (!response.ok) {
    throw new Error('Failed to update watched status');
  }
  const updatedMovie = await response.json();

  // Update localStorage with updated movie
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const movies: Movie[] = JSON.parse(stored);
      const index = movies.findIndex(m => m.id === updatedMovie.id);
      if (index !== -1) {
        movies[index] = updatedMovie;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
      }
    }
  } catch {
    // ignore localStorage errors
  }

  return updatedMovie;
}
