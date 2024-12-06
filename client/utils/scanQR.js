import { createPatientQR } from "../hooks/createPatientQR.js";

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("qrModal");
    const openButton = document.getElementById("generate_qr");
    const closeButton = document.getElementById("closeModal");
    const stopButton = document.getElementById("stopScanner");

    let html5QrCode = null;

    // Open modal and start scanning
    openButton.addEventListener("click", () => {
        modal.classList.remove("hidden");

        if (!html5QrCode) {
            html5QrCode = new Html5Qrcode("qr-reader");
        }

        html5QrCode.start(
            { facingMode: "environment" }, // Use 'user' for front camera
            {
                fps: 10, // Frames per second
                qrbox: { width: 250, height: 250 }, // Scanner area size
            },
            (decodedText, decodedResult) => {
                console.log("QR Code Scanned:", decodedText);
                console.log("Full Decoded Result:", decodedResult);

                createPatientQR(decodedText)

                // Optionally, stop scanning after successful read
                stopScanner();
            },
            (error) => {
                // Log errors (optional)
                console.warn("QR Code scan error:", error);
            }
        ).catch((err) => console.error("Failed to start scanner:", err));
    });

    // Close modal and stop scanning
    const stopScanner = () => {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear(); // Clear the scanner area
            }).catch((err) => console.error("Failed to stop scanner:", err));
        }
        modal.classList.add("hidden");
    };

    closeButton.addEventListener("click", stopScanner);
    stopButton.addEventListener("click", stopScanner);
});
