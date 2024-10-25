// Register Logic
document.getElementById('authForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message;

    if (data.success) {
        window.location.href = 'movies.html'; // Redirect to movie list on successful registration
    }
});

// Login Logic
document.getElementById('authForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    document.getElementById('message').innerText = data.message;

    if (data.success) {
        window.location.href = 'movies.html'; // Redirect to movie list on successful login
    }
});

// Fetch Movies Logic
async function fetchMovies() {
    const response = await fetch('http://localhost:3000/api/movies');
    const movies = await response.json();
    const moviesContainer = document.getElementById('movies');

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.name}">
            <h3>${movie.name}</h3>
            <p>${movie.description}</p>
            <button onclick="window.location.href='movie.html?id=${movie._id}'">View Details</button>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

if (document.getElementById('movies')) {
    fetchMovies();
}

// Fetch Movie Details Logic
async function fetchMovieDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const response = await fetch(`http://localhost:3000/api/movies/${id}`);
    const movie = await response.json();
    document.getElementById('movieName').innerText = movie.name;
    document.getElementById('moviePoster').src = movie.poster;
    document.getElementById('movieDescription').innerText = movie.description;

    const reviewsContainer = document.getElementById('reviews');
    movie.reviews.forEach(review => {
        const reviewElement = document.createElement('p');
        reviewElement.innerText = `${review.username}: ${review.content}`;
        reviewsContainer.appendChild(reviewElement);
    });
}

if (document.getElementById('movieDetails')) {
    fetchMovieDetails();

    document.getElementById('submitReview').addEventListener('click', async () => {
        const reviewContent = document.getElementById('reviewContent').value;
        const username = prompt("Enter your username:");
        
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        await fetch(`http://localhost:3000/api/movies/${id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, content: reviewContent }),
        });

        window.location.reload();
    });
}

// Logout Logic
document.getElementById('logout')?.addEventListener('click', () => {
    // Implement logout logic (clear session or token)
    alert('You have logged out.');
});
