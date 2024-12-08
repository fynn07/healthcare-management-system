const basic_tab = document.getElementById('provider_basic_tab');
const password_tab = document.getElementById('provider_password_tab');

const basic_submit = document.getElementById('provider_basic_submit');
const form_back = document.getElementById('provider_form_back');
const password_submit = document.getElementById('provider_password_submit');

const carousel = document.getElementById('regis-form-carousel');

basic_submit.addEventListener('click', () => {
    const scrollAmount = window.innerWidth; // Width of each slide

    password_tab.classList.add("border-b-4", "text-blue_main", "border-blue_main", "font-medium");
    basic_tab.classList.remove("border-b-4", "text-blue_main", "border-blue_main", "font-medium");

    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
    });
});

form_back.addEventListener('click', () => {
    const scrollAmount = window.innerWidth; // Width of each slide

    basic_tab.classList.add("border-b-4", "text-blue_main", "border-blue_main", "font-medium");
    password_tab.classList.remove("border-b-4", "text-blue_main", "border-blue_main", "font-medium");

    carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
    });
})