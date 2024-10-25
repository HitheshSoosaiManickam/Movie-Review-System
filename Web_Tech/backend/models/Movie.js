const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    poster: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
});

module.exports = mongoose.model('Movie', movieSchema);
