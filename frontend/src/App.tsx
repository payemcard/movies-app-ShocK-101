import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MoviesPage from './views/MoviesPage';
import MovieDetailPage from './views/MovieDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
