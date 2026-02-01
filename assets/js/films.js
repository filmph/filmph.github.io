
const films = [
    {
        title: "Steal",
        poster: "https://image.tmdb.org/t/p/w500//1Irf5yNnIayQ421dli3sA5p5bA1.jpg", 
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Sinners",
        poster: "https://image.tmdb.org/t/p/w500//z1wLS2b22V2gwk23h0sRIr6I08.jpg",
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Birth",
        poster: "https://image.tmdb.org/t/p/w500//pQXjVt5MvSg2uhA5x6r3b7F384s.jpg",
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "The Great Dictator",
        poster: "https://www.themoviedb.org/t/p/original/bS13yK3kslfe2nS2c9yB3X200a7.jpg",
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Citizen Kane",
        poster: "https://www.themoviedb.org/t/p/original/fqPqE23ycfft7iI7vM1jG1t32p.jpg",
        watch_url: "#",
        trailer_url: "#"
    },
    {
        title: "Vertigo",
        poster: "https://www.themoviedb.org/t/p/original/9fL3kQ3b9a2vC5yD3aQjO6b2vH.jpg",
        watch_url: "#",
        trailer_url: "#"
    }
];

const gallery = document.getElementById('gallery');
const galleryImage = document.getElementById('gallery-image');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImageIndex = 0;

function openGallery(index) {
    gallery.style.display = 'block';
    galleryImage.src = films[index].poster;
    currentImageIndex = index;
}

function closeGallery() {
    gallery.style.display = 'none';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + films.length) % films.length;
    galleryImage.src = films[currentImageIndex].poster;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % films.length;
    galleryImage.src = films[currentImageIndex].poster;
}

closeBtn.addEventListener('click', closeGallery);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

function createCard(film, index) {
    const tpl = document.getElementById('filmCardTemplate');
    const node = tpl.content.cloneNode(true);
    
    const poster = node.querySelector('.poster');
    poster.src = film.poster || '';
    poster.alt = film.title + ' poster';
    poster.addEventListener('click', () => openGallery(index));

    node.querySelector('.film-title').textContent = film.title;
    node.querySelector('.watch-now-btn').href = film.watch_url;
    node.querySelector('.trailer-btn').href = film.trailer_url;
    
    return node;
}

function renderFilms() {
    const container = document.getElementById('filmCollection');
    container.innerHTML = '';
    films.forEach((f, index) => {
        container.appendChild(createCard(f, index));
    });
}

// Initial render
renderFilms();
