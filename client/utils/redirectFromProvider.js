document.addEventListener("DOMContentLoaded", function() {
    const message = sessionStorage.getItem('toastMessage');

    if (message) {
        // Display toast
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            backgroundColor: "#4CAF50", 
            stopOnFocus: true 
        }).showToast();

        // Clear the message from sessionStorage
        sessionStorage.removeItem('toastMessage');

        // Redirect after success
        setTimeout(() => {
            window.location.href = "/client/pages/digitalid.html";
        }, 3000);
    }
});