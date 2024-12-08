const showPassword = document.getElementById('show_password');
const showNewPassword = document.getElementById('show_new_password');

const passwordInput = document.getElementById('provider_password');
const newPasswordInput = document.getElementById('provider_new_password');

function togglePasswordVisibility(passwordInput) {

    // Toggle password visibility
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}
showPassword.addEventListener("click", () => togglePasswordVisibility(passwordInput));
showNewPassword.addEventListener("click", () => togglePasswordVisibility(newPasswordInput));