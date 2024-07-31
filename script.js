const carousel = document.querySelector('.carousel');
const buttons = document.querySelectorAll('.carousel-button');
const cardWidth = document.querySelector('.topic-card').offsetWidth;
const cards = Array.from(document.querySelectorAll('.topic-card'));
let offset = 0;
let isMouseDown = false;
let startX;
let scrollLeft;

// Clone the carousel items for infinite loop effect
cards.forEach(card => {
    carousel.appendChild(card.cloneNode(true));
});

const totalWidth = cards.length * cardWidth;
const updateCarousel = () => {
    if (offset <= -totalWidth) {
        offset = 0;
    } else if (offset >= 0) {
        offset = -totalWidth;
    }

    carousel.style.transform = `translateX(${offset}px)`;
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.classList.contains('left') ? -1 : 1;
        offset += direction * cardWidth * 2;
        updateCarousel();
    });
});

const autoScroll = () => {
    offset -= cardWidth / 200; // Smaller step for slower movement (half speed)
    updateCarousel();
};

let autoScrollInterval = setInterval(autoScroll, 16); // Approximately 60fps for smooth animation

carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(autoScroll, 16);
});

carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = offset;
    clearInterval(autoScrollInterval);
});

carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
    autoScrollInterval = setInterval(autoScroll, 16);
});

carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    offset = scrollLeft - walk;
    updateCarousel();
});

// Add event listeners for arrow key navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        offset -= cardWidth;
    } else if (e.key === 'ArrowLeft') {
        offset += cardWidth;
    }
    updateCarousel();
});

// Add event listener for mouse wheel scrolling
carousel.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        offset -= cardWidth;
    } else {
        offset += cardWidth;
    }
    updateCarousel();
});


document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    function showSlide(index) {
        const totalSlides = slides.length;
        if (index >= totalSlides) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = totalSlides - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
});
let currentIndex = 0;
        const containerp = document.querySelector('.courses-container');
        const cardsp = document.querySelectorAll('.course-cardp');
        const cardWidthp = cardsp[0].clientWidth + 20; // Account for margin
        const prevBtn1 = document.getElementById('prev-btn');
        const nextBtn1 = document.getElementById('next-btn');

        function updateNavButtons() {
            prevBtn1.classList.toggle('hidden', currentIndex === 0);
            nextBtn1.classList.toggle('hidden', currentIndex >= cardsp.length - Math.floor(containerp.clientWidth / cardWidthp));
        }

        function moveSlider(direction) {
            const maxIndex = cardsp.length - Math.floor(containerp.clientWidth / cardWidthp);
            currentIndex = Math.min(Math.max(currentIndex + direction, 0), maxIndex);
            containerp.style.transform = `translateX(-${currentIndex * cardWidthp}px)`;
            updateNavButtons();
        }

        // Initialize button visibility
        updateNavButtons();









document.addEventListener('DOMContentLoaded', function () {
    

    // Function to show the first slide
    function showFirstSlide() {
        document.getElementById('firstContainer_g').classList.remove('hidden');
        document.getElementById('nextContainer_g').classList.add('hidden');
        document.getElementById('next_next_Container_g').classList.add('hidden');
        document.getElementById('backBtn_g').style.display = 'none';
        document.getElementById('nextBtn2_g').style.display = 'none';
        document.getElementById('nextBtn_g').style.display = 'block';
    }

    // Function to show the second slide
    function showSecondSlide() {
        document.getElementById('firstContainer_g').classList.add('hidden');
        document.getElementById('nextContainer_g').classList.remove('hidden');
        document.getElementById('next_next_Container_g').classList.add('hidden');
        document.getElementById('backBtn_g').style.display = 'block';
        document.getElementById('nextBtn2_g').style.display = 'block';
        document.getElementById('nextBtn_g').style.display = 'none';
    }

    // Function to show the third slide
    function showThirdSlide() {
        document.getElementById('firstContainer_g').classList.add('hidden');
        document.getElementById('nextContainer_g').classList.add('hidden');
        document.getElementById('next_next_Container_g').classList.remove('hidden');
        document.getElementById('backBtn_g').style.display = 'block';
        document.getElementById('nextBtn2_g').style.display = 'none';
        document.getElementById('nextBtn_g').style.display = 'none';
    }

    // Add event listeners to the buttons
    document.getElementById('nextBtn_g').addEventListener('click', showSecondSlide);
    document.getElementById('nextBtn2_g').addEventListener('click', showThirdSlide);
    document.getElementById('backBtn_g').addEventListener('click', function() {
        if (!document.getElementById('nextContainer_g').classList.contains('hidden')) {
            showFirstSlide();
        } else if (!document.getElementById('next_next_Container_g').classList.contains('hidden')) {
            showSecondSlide();
        }
    });

    // Initially hide the buttons that should not be visible
    document.getElementById('backBtn_g').style.display = 'none';
    document.getElementById('nextBtn2_g').style.display = 'none';

    // Initially show the first slide
    showFirstSlide();
});







