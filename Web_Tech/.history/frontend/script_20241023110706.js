// Fetch and display movies
async function fetchMovies() {
    console.log('Fetching movies...'); // Debugging line
    try {
        const response = await fetch('/api/movies');
        
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const movies = await response.json();

        const movieListDiv = document.getElementById('movieList');
        movieListDiv.innerHTML = ''; // Clear existing content

        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}" style="width:100px;height:auto;">
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
