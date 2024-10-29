document.addEventListener("DOMContentLoaded", function() {
    const message = sessionStorage.getItem('toastMessage');
    const messageType = sessionStorage.getItem('toastType');

    if (message) {
        // Display toast
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: messageType === 'success' ? "#4CAF50" : "#FF6B6B",
            stopOnFocus: true
        }).showToast();

        // Clear the message from sessionStorage
        sessionStorage.removeItem('toastMessage');
        sessionStorage.removeItem('toastType');
    }
});
