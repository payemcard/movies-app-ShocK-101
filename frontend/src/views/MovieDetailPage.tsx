import React from 'react';
import { useParams } from 'react-router-dom';

function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Movie Detail Page</h1>
      <p>This is the placeholder for the movie detail page.</p>
      {id && <p>Movie ID: {id}</p>}
    </div>
  );
}

export default MovieDetailPage; 