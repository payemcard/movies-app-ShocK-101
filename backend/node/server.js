const express = require('express');
const { loadMovies } = require('./dbUtils');
const cors = require('cors');
const fs = require('fs');
const dbPath = './db.json';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/movies", (req, res) => {
    try {
        const movies = loadMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/api/movies/:id", (req, res) => {
    try {
        const movies = loadMovies();
        const movie = movies.find(m => m.id === parseInt(req.params.id));
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.put('/api/movies/:id', (req, res) => {
    try {
        const movies = loadMovies();
        const movieId = parseInt(req.params.id);
        const movieIndex = movies.findIndex(m => m.id === movieId);

        if (movieIndex === -1) {
            return res.status(404).json({ error: "Movie not found" });
        }

        if (typeof req.body.watched === 'boolean') {
            movies[movieIndex].watched = req.body.watched;
        }

        fs.writeFileSync(dbPath, JSON.stringify(movies, null, 2));

        res.json(movies[movieIndex]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/movies/load-more', (req, res) => {
  try {
    const movies = loadMovies();

    if (movies.length === 0) {
      return res.status(400).json({ error: "No movies to clone from" });
    }

    const lastId = movies[movies.length - 1].id;
    const newMoviesCount = 5;
    const newMovies = [];
    for (let i = 0; i < newMoviesCount; i++) {
      const baseMovie = movies[i % movies.length];
      const newId = lastId + i + 1;
      const cloned = { ...baseMovie, id: newId };
      newMovies.push(cloned);
    }

    const updatedMovies = [...movies, ...newMovies];

    fs.writeFileSync(dbPath, JSON.stringify(updatedMovies, null, 2));
    res.json(newMovies);
  } catch (error) {
    console.error('Error generating movies:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5001, () => console.log('Server running on port 5001'));
