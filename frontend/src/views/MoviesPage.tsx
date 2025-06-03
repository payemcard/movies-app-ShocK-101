import React from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import MovieCard from '../components/MovieCard';

function MoviesPage() {
  const { movies, loading, error } = useFetchMovies();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading movies...</div>; // Basic loading indicator
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>; // Basic error display
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MoviesPage; 