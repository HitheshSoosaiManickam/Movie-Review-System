const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

// Sample Movies
const sampleMovies = [
    {
        name: 'Inception',
        poster: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    },
    {
        name: 'The Shawshank Redemption',
        poster: 'https://image.tmdb.org/t/p/w500/6hEcb7b2jbc8V8e9AhaDk8OrDTh.jpg',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    },
    {
        name: 'The Godfather',
        poster: 'https://image.tmdb.org/t/p/w500/sY3iOdVmyZQr0yEgoQDPy8p2ef7.jpg',
        description: 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.',
    },
    {
        name: 'Pulp Fiction',
        poster: 'https://image.tmdb.org/t/p/w500/r1cC7m0V41NLc4wh0YeX8xL8X9b.jpg',
        description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    },
    {
        name: 'The Dark Knight',
        poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4SJn2r1ZTnEM.jpg',
        description: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    },
];

// Fetch Movies
router.get('/', async (req, res) => {
    const movies = await Movie.find();
    if (movies.length === 0) {
        await Movie.insertMany(sampleMovies);
    }
    res.json(movies);
});

// Add Review
router.post('/:id/reviews', async (req, res) => {
    const { username, content } = req.body;
    const movie = await Movie.findById(req.params.id);
    movie.reviews.push({ username, content });
    await movie.save();
    res.json({ success: true, message: 'Review added!' });
});

// Fetch Movie Details
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});

module.exports = router;
