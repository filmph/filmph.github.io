const film = {
    title: "Vertigo",
    year: 1958,
    director: "Alfred Hitchcock",
    imdbId: "tt0052357",
    rating: "8.3 (433k)",
    note: "Sinema tarihinin en ikonik yapıtlarından biri. Takıntı ve kimlik üzerine bir başyapıt.",
    images: [
        "https://image.tmdb.org/t/p/original/768C1Yl7x299L20C6yX5L0N2z1C.jpg", // Sizin yüklediğiniz sahne
        "https://image.tmdb.org/t/p/original/m9m7vS0Xo8KkPiaY3I6zK7qL1B7.jpg",
        "https://image.tmdb.org/t/p/original/AtT7L9ubE64222p2kjG1L5a4sPA.jpg"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const images = film.images;
    let currentIndex = 0;

    function createSlides() {
        images.forEach(imageUrl => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${film.title} - Scene`;

            // Create caption container
            const caption = document.createElement('div');
            caption.className = 'caption';

            // Left side: Title, Meta, Note
            const captionLeft = document.createElement('div');
            captionLeft.className = 'caption-left';

            const title = document.createElement('div');
            title.className = 'caption-title';
            title.textContent = film.title;

            const meta = document.createElement('div');
            meta.className = 'caption-meta';
            meta.textContent = `${film.year} • ${film.director}`;

            const note = document.createElement('div');
            note.className = 'caption-note';
            note.textContent = film.note;

            captionLeft.appendChild(title);
            captionLeft.appendChild(meta);
            captionLeft.appendChild(note);

            // Right side: IMDb link
            const imdbLink = document.createElement('a');
            imdbLink.className = 'imdb-link';
            imdbLink.href = `https://www.imdb.com/title/${film.imdbId}/`;
            imdbLink.target = '_blank';
            imdbLink.rel = 'noopener noreferrer';

            const imdbLogo = document.createElement('span');
            imdbLogo.className = 'imdb-logo';
            imdbLogo.textContent = 'IMDb';

            const imdbRating = document.createElement('span');
            imdbRating.className = 'imdb-rating';
            imdbRating.textContent = film.rating;

            imdbLink.appendChild(imdbLogo);
            imdbLink.appendChild(imdbRating);

            // Assemble caption
            caption.appendChild(captionLeft);
            caption.appendChild(imdbLink);

            // Add image and caption to slide
            slide.appendChild(img);
            slide.appendChild(caption);
            sliderTrack.appendChild(slide);
        });
    }

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSliderPosition();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSliderPosition();
    }

    // Initial setup
    createSlides();
    updateSliderPosition();

    // Event Listeners
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
});
