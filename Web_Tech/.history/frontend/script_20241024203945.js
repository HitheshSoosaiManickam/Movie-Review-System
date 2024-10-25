// script.js

// Register Function
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
});

// Login Function
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);

    if (data.success) {
        window.location.href = 'movies.html'; // Redirect to movies page on successful login
    }
});

// Fetch and display movies
async function fetchMovies() {
    try {
        const response = await fetch('/api/movies');
        const movies = await response.json();

        const movieListDiv = document.getElementById('movieList');
        movieListDiv.innerHTML = ''; // Clear existing content

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}" style="width:250px;height:auto;">
                <p>${movie.description}</p>
                <a href="movie.html?id=${movie._id}">View Details</a>
            `;
            movieListDiv.appendChild(movieItem);
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Call fetchMovies when the movies.html page loads
if (window.location.pathname === '/movies.html') {
    fetchMovies();
}

// Function to submit a review
document.getElementById('reviewForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const movieId = new URLSearchParams(window.location.search).get('id');
    const review = document.getElementById('reviewInput').value;
    const username = 'currentUsername'; // Replace with the actual username from your session

    const response = await fetch(`http://localhost:3000/api/movies/${movieId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, review }),
    });

    const data = await response.json();
    alert(data.message);
    if (data.success) {
        loadMovieDetails(movieId); // Refresh movie details after submitting the review
    }
});

// Function to load movie details
async function loadMovieDetails(movieId) {
    const response = await fetch(`http://localhost:3000/api/movies/${movieId}`);
    const movie = await response.json();
    const movieDetailContainer = document.getElementById('movieDetail');

    movieDetailContainer.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title} Poster">
        <p>${movie.description}</p>
        <h3>User Reviews:</h3>
        <div id="reviews"></div>
        <form id="reviewForm">
            <textarea id="reviewInput" placeholder="Write your review..." required></textarea>
            <button type="submit">Submit Review</button>
        </form>
    `;

    const reviewsContainer = document.getElementById('reviews');
    movie.reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<strong>${review.username}:</strong> ${review.review}`;
        reviewsContainer.appendChild(reviewItem);
    });
}

// Call loadMovieDetails if on movie page
if (window.location.pathname === '/movie.html') {
    const movieId = new URLSearchParams(window.location.search).get('id');
    loadMovieDetails(movieId);
}
