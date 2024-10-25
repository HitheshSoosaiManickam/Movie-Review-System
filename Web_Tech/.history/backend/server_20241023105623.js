const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moviesDB', { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
}));

// Movie model
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    description: String,
    poster: String,
    reviews: [{ username: String, review: String }],
}));

// Sample Movies API Route (run this only once to populate the DB)
app.get('/api/populateMovies', async (req, res) => {
    const sampleMovies = [
        { title: "Inception", description: "A thief who steals corporate secrets through the use of dream-sharing technology.", poster: "https://example.com/inception.jpg", reviews: [] },
        { title: "The Dark Knight", description: "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", poster: "https://example.com/dark_knight.jpg", reviews: [] },
        { title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", poster: "https://example.com/interstellar.jpg", reviews: [] },
        { title: "The Matrix", description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", poster: "https://example.com/matrix.jpg", reviews: [] },
        { title: "Fight Club", description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.", poster: "https://example.com/fight_club.jpg", reviews: [] }
    ];

    await Movie.insertMany(sampleMovies);
    res.send('Sample movies populated!');
});

// Endpoint to fetch movies
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
});

// User Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

// Serve HTML file at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
