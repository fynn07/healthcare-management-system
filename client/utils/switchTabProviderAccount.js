const basic_tab = document.getElementById('provider_basic_tab');
const password_tab = document.getElementById('provider_password_tab');

const carousel = document.getElementById('regis-form-carousel');

function toggleEnableForm(type) {
    // Get form elements and buttons
    const editButton = document.getElementById(`provider_${type}_edit`);
    const saveButton = document.getElementById(`provider_${type}_save`);
    const cancelButton = document.getElementById(`provider_${type}_cancel`);

    const buttonsContainer = document.getElementById(`provider_${type}_buttons`);

    const formInputs = document.querySelectorAll(`#provider_${type}_form input`);
    const formSelects = document.querySelectorAll(`#provider_${type}_form select`);

    // Function to toggle buttons and inputs
    const toggleEditMode = (isEditing) => {
        // Toggle buttons
        editButton.classList.toggle("hidden", isEditing);
        saveButton.classList.toggle("hidden", !isEditing);
        cancelButton.classList.toggle("hidden", !isEditing);

        buttonsContainer.classList.toggle("justify-end", isEditing)

        // Enable or disable input fields
        formInputs.forEach(input => {
            input.disabled = !isEditing;
            // input.classList.toggle("bg-white", isEditing);
        });

        formSelects.forEach(select => {
            select.disabled = !isEditing;
            // select.classList.toggle("bg-white", isEditing);
        });
    };

    // Add click event listener to Edit button
    editButton.addEventListener("click", () => {
        toggleEditMode(true);
    });

    // Add click event listener to Cancel button
    cancelButton.addEventListener("click", () => {
        toggleEditMode(false);
    });

    // Save button functionality (example)
    saveButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission for demo
        console.log("Form details saved!");
        toggleEditMode(false);
    });
}



password_tab.addEventListener('click', () => {
    const scrollAmount = window.innerWidth; // Width of each slide

    password_tab.classList.add("border-b-4", "text-blue_main", "border-blue_main", "font-medium");
    basic_tab.classList.remove("border-b-4", "text-blue_main", "border-blue_main", "font-medium");

    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
    });

    toggleEnableForm('password');
});

basic_tab.addEventListener('click', () => {
    const scrollAmount = window.innerWidth; // Width of each slide

    basic_tab.classList.add("border-b-4", "text-blue_main", "border-blue_main", "font-medium");
    password_tab.classList.remove("border-b-4", "text-blue_main", "border-blue_main", "font-medium");

    carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
    });

    toggleEnableForm('basic');
})

document.addEventListener("DOMContentLoaded", () => {
    const scrollAmount = window.innerWidth; // Width of each slide

    basic_tab.classList.add("border-b-4", "text-blue_main", "border-blue_main", "font-medium");
    password_tab.classList.remove("border-b-4", "text-blue_main", "border-blue_main", "font-medium");

    carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
    });

    toggleEnableForm('basic');
})


const showPassword = document.getElementById('show_password');
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('provider_password');
    const eyeIcon = document.getElementById('eye-icon');

    // Toggle password visibility
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.add('eye-open'); // Optional: Add a class for styling changes
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('eye-open');
    }
}
showPassword.addEventListener("click", togglePasswordVisibility);
