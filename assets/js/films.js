const film = {
    title: "The Sea Wolf",
    year: 1941,
    director: "Michael Curtiz",
    images: [
        "https://www.themoviedb.org/t/p/original/hY0oH2B3Fdlp5I05a3j54aFk3jg.jpg",
        "https://www.themoviedb.org/t/p/original/AtT7L9ubE64222p2kjG1L5a4sPA.jpg",
        "https://www.themoviedb.org/t/p/original/wzW4T1as2aV2vV4pGfnmB4HnS2w.jpg",
        "https://www.themoviedb.org/t/p/original/s4TsiA4ZqL3WbY2F6M8zNfP0x5R.jpg",
        "https://www.themoviedb.org/t/p/original/u0YtQJ8s5S2dYpG3v0jGzQzJNz.jpg"
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
            slide.appendChild(img);
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