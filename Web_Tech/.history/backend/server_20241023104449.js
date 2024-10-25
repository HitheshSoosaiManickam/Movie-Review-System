const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files from frontend directory

// Route to serve index.html at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Example route for movies API (you should define this)
app.get('/api/movies', (req, res) => {
    // Fetch movies from the database and return them
    res.json([]); // Replace with actual data
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
