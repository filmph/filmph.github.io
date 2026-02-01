const film = {
    title: "Birth",
    year: 2004,
    director: "Jonathan Glazer",
    description: "A young boy attempts to convince a woman that he is her dead husband reincarnated.",
    images: [
        "https://www.themoviedb.org/t/p/original/u5f5pCh3d23xT5f1s2Oik2j0s63.jpg",
        "https://www.themoviedb.org/t/p/original/tL9dpof26IqwS8skd2G3a1s0i8.jpg",
        "https://www.themoviedb.org/t/p/original/q4FQy2GKoTfYV21lD91Q5aRN3k.jpg",
        "https://www.themoviedb.org/t/p/original/9fntJIz2e8PCDBsl26uV9i1lZ3.jpg",
        "https://www.themoviedb.org/t/p/original/r09C2yN2F11w9yB2lFtvDAsC5Iu.jpg"
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Populate film info
    document.getElementById('filmTitle').textContent = film.title;
    document.getElementById('filmMeta').textContent = `${film.year} • Directed by ${film.director}`;


    const filmCollection = document.getElementById('filmCollection');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = lightbox.querySelector('.close-btn');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');

    let currentIndex = 0;
    const images = film.images; 

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }

    // Populate the gallery with images for the single film
    images.forEach((imageUrl, index) => {
        const tpl = document.getElementById('filmCardTemplate');
        const node = tpl.content.cloneNode(true);
        const galleryItem = node.querySelector('.gallery-item');
        const galleryImage = node.querySelector('.gallery-image');

        galleryImage.src = imageUrl;
        galleryImage.alt = `${film.title} - scene ${index + 1}`;

        galleryItem.addEventListener('click', () => openLightbox(index));

        filmCollection.appendChild(node);
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            }
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
            if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
});