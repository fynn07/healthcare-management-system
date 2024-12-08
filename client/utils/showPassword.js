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