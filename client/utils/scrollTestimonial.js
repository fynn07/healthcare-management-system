document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.testimonial-carousel');
    const buttonLeft = document.getElementById('testimonial-button-left');
    const buttonRight = document.getElementById('testimonial-button-right');

    const scrollAmount = 300; // Adjust the amount to scroll per click

    buttonLeft.addEventListener('click', () => {
        console.log('Left button clicked');
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    buttonRight.addEventListener('click', () => {
        console.log('Right button clicked');
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
});