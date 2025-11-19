document.addEventListener('DOMContentLoaded', function () {
    const contentDiv = document.querySelector('.content');
    const loadingDiv = document.querySelector('.loading');
    const changingWord = document.getElementById('changing-word');
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    // --- Dark Mode Logic ---
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Initialize theme: use saved preference, otherwise respect system preference
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Text Cycling Logic ---
    if (changingWord) {
        const words = ['film', 'müzik', 'fotoğraf', 'kitap'];
        let currentIndex = 0;

        function updateWord() {
            // Fade out using class
            changingWord.classList.add('fade');

            setTimeout(() => {
                changingWord.textContent = words[currentIndex];
                currentIndex = (currentIndex + 1) % words.length;
                // Fade in by removing class
                changingWord.classList.remove('fade');
            }, 300); // Wait for fade out transition
        }

        // Start cycling
        setInterval(updateWord, 2000);
    }

    // --- Dynamic Content Loading ---
    // Load music preview
    async function loadMusicPreview() {
        try {
            const response = await fetch('music.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Get the first 2 collection items
            const items = doc.querySelectorAll('.collection-item');
            const musicPreview = document.getElementById('music-preview');

            if (musicPreview && items.length > 0) {
                // Clear existing content
                musicPreview.innerHTML = '';

                // Add the first 2 items (or all if less than 2)
                const itemsToShow = Math.min(2, items.length);
                for (let i = 0; i < itemsToShow; i++) {
                    musicPreview.appendChild(items[i].cloneNode(true));
                }
            }
        } catch (error) {
            console.error('Error loading music preview:', error);
        }
    }

    // Load today preview
    async function loadTodayPreview() {
        try {
            const response = await fetch('today.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Get today's content sections
            const songSection = doc.querySelector('.today-section:nth-of-type(1)');
            const todayPreview = document.getElementById('today-preview');

            if (todayPreview && songSection) {
                // Create a simplified version of today's content
                todayPreview.innerHTML = '';

                // Clone the song of the day section
                const songClone = songSection.cloneNode(true);
                todayPreview.appendChild(songClone);
            }
        } catch (error) {
            console.error('Error loading today preview:', error);
        }
    }

    // Load about/interviews preview
    async function loadAboutPreview() {
        try {
            const response = await fetch('interviews.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Get the first paragraph from interviews
            const collectionList = doc.querySelector('.collection-list');
            const firstParagraph = collectionList ? collectionList.querySelector('p') : null;
            const aboutPreview = document.getElementById('about-preview');

            if (aboutPreview && firstParagraph) {
                aboutPreview.innerHTML = '';
                aboutPreview.appendChild(firstParagraph.cloneNode(true));
            }
        } catch (error) {
            console.error('Error loading about preview:', error);
        }
    }

    // Load all dynamic content only on homepage
    if (document.getElementById('music-preview')) {
        loadMusicPreview();
        loadTodayPreview();
        loadAboutPreview();
    }

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});
