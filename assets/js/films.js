
const films = [
    {
        title: "Birth",
        year: 2004,
        director: "Jonathan Glazer",
        description: "A young boy attempts to convince a woman that he is her dead husband reincarnated.",
        image: "https://www.themoviedb.org/t/p/w1280/A5E0K1rStSg1d1v32S4d3nB2W3t.jpg",
    },
    {
        title: "The Killing of a Sacred Deer",
        year: 2017,
        director: "Yorgos Lanthimos",
        description: "A surgeon's seemingly perfect life starts to unravel when a teenage boy he has taken under his wing begins to exhibit sinister behavior.",
        image: "https://www.themoviedb.org/t/p/w1280/vV3ANs23j1d2V0M2iZz85bZJ5gA.jpg",
    },
    {
        title: "The Lobster",
        year: 2015,
        director: "Yorgos Lanthimos",
        description: "In a dystopian near future, single people are taken to The Hotel, where they are obliged to find a romantic partner in forty-five days or are transformed into beasts and sent off into The Woods.",
        image: "https://www.themoviedb.org/t/p/w1280/2G0AJr2t5m2uoXnsQ3a2e2aSAuC.jpg",
    },
    {
        title: "Dogtooth",
        year: 2009,
        director: "Yorgos Lanthimos",
        description: "Three teenagers live in isolation, believing that they can only leave their parents' compound when their dogtooth falls out.",
        image: "https://www.themoviedb.org/t/p/w1280/8JTM9u1bSbg8iV4e62d4k2i5b1.jpg",
    },
    {
        title: "Poor Things",
        year: 2023,
        director: "Yorgos Lanthimos",
        description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.",
        image: "https://www.themoviedb.org/t/p/w1280/kCGlIMrgKHyydA2aI4a923a1wIu.jpg",
    },
    {
        title: "The Favourite",
        year: 2018,
        director: "Yorgos Lanthimos",
        description: "In early 18th century England, a frail Queen Anne occupies the throne and her close friend, Lady Sarah, governs the country in her stead. When a new servant, Abigail, arrives, her charm endears her to Sarah.",
        image: "https://www.themoviedb.org/t/p/w1280/gMKi2i5Uv5vBzB4sHxGAn2xSt1I.jpg",
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const filmCollection = document.getElementById('filmCollection');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = lightbox.querySelector('.close-btn');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = films[currentIndex].image;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + films.length) % films.length;
        lightboxImg.src = films[currentIndex].image;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % films.length;
        lightboxImg.src = films[currentIndex].image;
    }

    films.forEach((film, index) => {
        const tpl = document.getElementById('filmCardTemplate');
        const node = tpl.content.cloneNode(true);
        const galleryItem = node.querySelector('.gallery-item');
        const galleryImage = node.querySelector('.gallery-image');

        galleryImage.src = film.image;
        galleryImage.alt = film.title;

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
