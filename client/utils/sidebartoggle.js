const sidebarButton = document.getElementById('sidebar_button')
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const main2 = document.getElementById('main2');

function toggleSidebar() {
    sidebar.classList.toggle('-translate-x-full');

    if (window.matchMedia('(min-width: 1280px)').matches) {
        main.classList.toggle('xl:ml-80');
        main.classList.toggle('xl:ml-0');
    } else {
        main.classList.toggle('ml-80');
        main.classList.toggle('ml-0');
    }
}

// Attach the toggleSidebar function to the button click
sidebarButton.addEventListener('click', toggleSidebar);


function updateClasses() {
    if (window.innerWidth >= 1280) {
        // Screen width is at least 1280px (matches 'xl' breakpoint)
        main.classList.add('ml-0');
        main.classList.remove('ml-80');
        main.classList.remove('xl:ml-0');
        main.classList.add('xl:ml-80');


    } else {
        // Screen width is below 1280px
        main.classList.add('ml-0');
        main.classList.remove('ml-80');
        main.classList.remove('xl:ml-0');
        main.classList.remove('xl:ml-80');
    }

    if (window.innerWidth >= 1288)
        sidebar.classList.remove('-translate-x-full');
    else
        sidebar.classList.add('-translate-x-full');

}

// Call the function initially to set the correct class on page load
updateClasses();
window.addEventListener('resize', updateClasses);
