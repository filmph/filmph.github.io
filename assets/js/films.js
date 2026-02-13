const films = [
    {
        title: "Vertigo",
        year: 1958,
        director: "Alfred Hitchcock",
        imdbId: "tt0052357",
        rating: "8.3 (433k)",
        note: "Sinema tarihinin en ikonik yapıtlarından biri. Takıntı ve kimlik üzerine bir başyapıt.",
        noteItalic: false,
        images: [
            {
                alt: "Vertigo still 1",
                sources: [
                    "https://image.tmdb.org/t/p/original/768C1Yl7x299L20C6yX5L0N2z1C.jpg"
                ]
            },
            {
                alt: "Vertigo still 2",
                sources: [
                    "https://image.tmdb.org/t/p/original/m9m7vS0Xo8KkPiaY3I6zK7qL1B7.jpg"
                ]
            }
        ]
    },
    {
        title: "The 39 Steps",
        year: 1935,
        director: "Alfred Hitchcock",
        imdbId: "tt0026029",
        rating: "7.6 (63k)",
        note: "Yanlış adam hikâyesinin erken ve etkili bir örneği; Hitchcock geriliminin temel taşlarından.",
        noteItalic: false,
        images: [
            {
                alt: "The 39 Steps still 1",
                sources: [
                    "https://s3.amazonaws.com/criterion-production/carousel-files/a566d98a978982ac4fcde312563abfdd.jpeg",
                    "https://criterion-production.s3.amazonaws.com/carousel-files/a566d98a978982ac4fcde312563abfdd.jpeg"
                ]
            },
            {
                alt: "The 39 Steps still 2",
                sources: [
                    "https://s3.amazonaws.com/criterion-production/carousel-files/f737b8162d3e15f935e9fc72419f3f92.jpeg",
                    "https://criterion-production.s3.amazonaws.com/carousel-files/f737b8162d3e15f935e9fc72419f3f92.jpeg"
                ]
            }
        ]
    }
];

function fallbackImageDataUri(filmTitle, sceneIndex) {
    const safeTitle = String(filmTitle).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#111827"/><stop offset="100%" stop-color="#1f2937"/></linearGradient></defs><rect width="1400" height="900" fill="url(#bg)"/><circle cx="190" cy="170" r="140" fill="rgba(220,164,69,0.18)"/><circle cx="1200" cy="730" r="170" fill="rgba(106,168,255,0.12)"/><text x="80" y="740" fill="#f9fafb" font-size="72" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safeTitle}</text><text x="82" y="800" fill="#d1d5db" font-size="34" font-family="Arial, Helvetica, sans-serif">Scene ${sceneIndex + 1} (fallback image)</text></svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
const film = {
    title: "The 39 Steps",
    year: 1935,
    director: "Alfred Hitchcock",
    imdbId: "tt0026029",
    rating: "7.6 (63k)",
    note: "Yanlış adam hikâyesinin erken ve etkili bir örneği; Hitchcock geriliminin temel taşlarından.",
    noteItalic: false,
    images: [
        "https://s3.amazonaws.com/criterion-production/carousel-files/a566d98a978982ac4fcde312563abfdd.jpeg",
        "https://s3.amazonaws.com/criterion-production/carousel-files/f737b8162d3e15f935e9fc72419f3f92.jpeg"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const slidesData = films.flatMap((film) =>
        film.images.map((image, index) => ({ film, image, index }))
        film.images.map((image) => ({
            film,
            image
        }))
    );

    let currentIndex = 0;

    function createSlides() {
        slidesData.forEach(({ film, image, index }) => {
        images.forEach((imageItem) => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const imageFrame = document.createElement('div');
            imageFrame.className = 'image-frame';

            const img = document.createElement('img');
            const sources = Array.isArray(image && image.sources) ? image.sources : [image];
            const fallbackSrc = fallbackImageDataUri(film.title, index);
            let sourceIndex = 0;

            img.src = sources[sourceIndex] || fallbackSrc;
            img.alt = (image && image.alt) || `${film.title} - Scene`;
            img.loading = 'eager';
            img.decoding = 'async';

            img.addEventListener('error', () => {
            const sources = Array.isArray(imageItem && imageItem.sources) ? imageItem.sources : [imageItem];
            let sourceIndex = 0;

            img.src = sources[sourceIndex];
            img.alt = (imageItem && imageItem.alt) || `${film.title} - Scene`;
            img.loading = "eager";

            img.addEventListener("error", () => {
                sourceIndex += 1;
                if (sourceIndex < sources.length) {
                    img.src = sources[sourceIndex];
                    return;
                }

                img.src = fallbackSrc;
                imageFrame.classList.add('image-frame--fallback');
                imageFrame.classList.add("image-frame--error");
            });

            const caption = document.createElement('div');
            caption.className = 'caption';

            const captionLeft = document.createElement('div');
            captionLeft.className = 'caption-left';

            const title = document.createElement('div');
            title.className = 'caption-title';
            title.textContent = film.title;

            const meta = document.createElement('div');
            meta.className = 'caption-meta';

            const year = document.createElement('span');
            year.className = 'meta-chip';
            year.textContent = film.year;

            const director = document.createElement('span');
            director.className = 'meta-chip';
            director.textContent = film.director;

            meta.appendChild(year);
            meta.appendChild(director);

            const note = document.createElement('div');
            note.className = 'caption-note';
            if (film.noteItalic) {
                note.classList.add('caption-note--italic');
            }
            note.textContent = film.note;

            captionLeft.appendChild(title);
            captionLeft.appendChild(meta);
            captionLeft.appendChild(note);

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

            caption.appendChild(captionLeft);
            caption.appendChild(imdbLink);

            imageFrame.appendChild(img);
            slide.appendChild(imageFrame);
            slide.appendChild(caption);
            sliderTrack.appendChild(slide);
        });
    }

    function updateActiveSlide() {
        const slides = sliderTrack.querySelectorAll('.slide');

        slides.forEach((slide, index) => {
            slide.classList.toggle('is-active', index === currentIndex);
        });
    }

    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateActiveSlide();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
        updateSliderPosition();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % slidesData.length;
        updateSliderPosition();
    }

    createSlides();
    requestAnimationFrame(updateSliderPosition);

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
