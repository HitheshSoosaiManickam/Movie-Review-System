const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// User model
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// Register route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ message: 'User registration failed. Username might already exist.' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

// Serve index.html at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// Assuming you have this in your server.js file to add sample movies
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    description: String,
    poster: String,
    reviews: [{ username: String, review: String }],
}));

// Example route to populate movies (run this only once or create a separate script)
app.get('/api/populateMovies', async (req, res) => {
    const sampleMovies = [
        {
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
            poster: "https://example.com/inception.jpg", // Replace with actual image URL
            reviews: []
        },
        {
            title: "The Dark Knight",
            description: "Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            poster: "https://example.com/dark_knight.jpg", // Replace with actual image URL
            reviews: []
        },
        {
            title: "Interstellar",
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            poster: "https://example.com/interstellar.jpg", // Replace with actual image URL
            reviews: []
        },
        {
            title: "The Matrix",
            description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            poster: "https://example.com/matrix.jpg", // Replace with actual image URL
            reviews: []
        },
        {
            title: "Fight Club",
            description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
            poster: "https://example.com/fight_club.jpg", // Replace with actual image URL
            reviews: []
        }
    ];

    await Movie.insertMany(sampleMovies);
    res.send('Sample movies populated!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
