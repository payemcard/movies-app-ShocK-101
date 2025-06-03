import React, { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { loadMoreMovies } from '../api/movies';
import MovieCard from '../components/MovieCard';
import { LOCAL_STORAGE_KEY } from '../constants';

const MoviesPage = () => {
  const { movies, loading, error, setMovies } = useMovies();
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const newMovies = await loadMoreMovies();
      setMovies(prevMovies => {
        const updatedMovies = [...prevMovies, ...newMovies];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMovies));
        return updatedMovies;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading movies...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loadingMore ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}

export default MoviesPage;
