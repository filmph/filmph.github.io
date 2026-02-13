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
        film.images.map((image) => ({
            film,
            image
        }))
    );

    let currentIndex = 0;

    function createSlides() {
        images.forEach((imageItem) => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const imageFrame = document.createElement('div');
            imageFrame.className = 'image-frame';

            const img = document.createElement('img');
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
