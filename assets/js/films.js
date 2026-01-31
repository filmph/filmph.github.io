
const films = [
    {
        title: "Steal",
        rating: 7.1,
        poster: "assets/images/steal.jpg", // placeholder
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Sinners",
        rating: 7.5,
        poster: "assets/images/sinners.jpg",
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Başka Bir Film",
        rating: 6.8,
        poster: "assets/images/placeholder.jpg",
        watch_url: "#",
        trailer_url: "#"
    }
];

function createCard(film) {
    const tpl = document.getElementById('filmCardTemplate');
    const node = tpl.content.cloneNode(true);
    
    node.querySelector('.poster').src = film.poster || '';
    node.querySelector('.poster').alt = film.title + ' poster';
    node.querySelector('.rating').textContent = film.rating;
    node.querySelector('.film-title').textContent = film.title;
    node.querySelector('.watch-now-btn').href = film.watch_url;
    node.querySelector('.trailer-btn').href = film.trailer_url;
    
    return node;
}

function renderFilms() {
    const container = document.getElementById('filmCollection');
    container.innerHTML = '';
    films.forEach(f => {
        container.appendChild(createCard(f));
    });
}

// Initial render
renderFilms();
