// Sample movie data
const movies = [
    {
        title: "Inception",
        image: "C:\Users\hithe\Desktop\Web_Tech\frontend\images\dark_knight.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology."
    },
    {
        title: "The Dark Knight",
        image: "C:\Users\hithe\Desktop\Web_Tech\frontend\images\fight_club.jpg",
        description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham."
    },
    {
        title: "Interstellar",
        image: "C:\Users\hithe\Desktop\Web_Tech\frontend\images\inception.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        title: "The Matrix",
        image: "C:\Users\hithe\Desktop\Web_Tech\frontend\images\interstellar.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
        title: "Parasite",
        image: "C:\Users\hithe\Desktop\Web_Tech\frontend\images\matrix.jpg",
        description: "A poor family schemes to become employed by a wealthy family by posing as unrelated, highly qualified individuals."
    }
];

// Function to display movies
function displayMovies() {
    const movieList = document.getElementById('movieList');
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <h2>${movie.title}</h2>
            <img src="${movie.image}" alt="${movie.title}" />
            <p>${movie.description}</p>
        `;
        movieList.appendChild(movieItem);
    });
}

// Call the function to display movies
displayMovies();
