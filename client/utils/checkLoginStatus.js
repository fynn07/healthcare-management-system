document.addEventListener("DOMContentLoaded", function() {
    const logout_status = localStorage.getItem('token');

    if (logout_status === null) {
        window.location.href = "/client/pages/login.html";
    }
});