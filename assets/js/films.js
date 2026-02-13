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
            },
            {
                alt: "Vertigo still 3",
                sources: [
                    "https://image.tmdb.org/t/p/original/AtT7L9ubE64222p2kjG1L5a4sPA.jpg"
                ]
            },
            {
                alt: "Vertigo still 4",
                sources: [
                    "https://image.tmdb.org/t/p/original/su12xJp28Zf5R8s8i8zN8h8p2k.jpg"
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

document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const slidesData = films.flatMap((film) =>
        film.images.map((image) => ({
            film,
            image
        }))
    );

    let currentIndex = 0;

    function createSlides() {
        slidesData.forEach(({ film, image }) => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const imageFrame = document.createElement('div');
            imageFrame.className = 'image-frame';

            const img = document.createElement('img');
            const sources = Array.isArray(image && image.sources) ? image.sources : [image];
            let sourceIndex = 0;

            img.src = sources[sourceIndex];
            img.alt = (image && image.alt) || `${film.title} - Scene`;
            img.loading = 'eager';
            img.decoding = 'async';

            img.addEventListener('error', () => {
                sourceIndex += 1;
                if (sourceIndex < sources.length) {
                    img.src = sources[sourceIndex];
                    return;
                }

                imageFrame.classList.add('image-frame--error');
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
