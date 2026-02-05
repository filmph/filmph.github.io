const film = {
    title: "Vertigo",
    year: 1958,
    director: "Alfred Hitchcock",
    imdbId: "tt0052357",
    rating: "8.3 (433k)",
    images: [
        "https://www.themoviedb.org/t/p/original/mIdYq2M2vC0C628W8SInL6k5D8p.jpg", // Çan kulesi sahnesi
        "https://www.themoviedb.org/t/p/original/2L9SdfvV6P9Ym0X6ZfM2fX8kFqR.jpg",
        "https://www.themoviedb.org/t/p/original/m9m7vS0Xo8KkPiaY3I6zK7qL1B7.jpg",
        "https://www.themoviedb.org/t/p/original/8k9K8i8Vv8n9v8n9v8n9v8n9v8n.jpg", // Placeholder
        "https://www.themoviedb.org/t/p/original/7k9K8i8Vv8n9v8n9v8n9v8n9v8n.jpg"  // Placeholder
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

            // Create film title
            const title = document.createElement('div');
            title.className = 'caption-title';
            title.textContent = film.title;

            // Create IMDb link
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

            // Assemble caption
            imdbLink.appendChild(imdbLogo);
            imdbLink.appendChild(imdbRating);
            caption.appendChild(title);
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
