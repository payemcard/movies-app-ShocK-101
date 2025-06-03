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
