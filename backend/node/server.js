const express = require('express');
const { loadMovies } = require('./dbUtils');
const cors = require('cors');

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
    res.status(200).send("PUT request received. Implement logic here, ensuring that the watched status of the movie is updated.");
});

app.listen(5001, () => console.log('Server running on port 5001'));
