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
