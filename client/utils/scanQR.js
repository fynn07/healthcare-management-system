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

        html5QrCode
        .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            async (decodedText, decodedResult) => {
                if (window.isProcessingQR) {
                    console.warn("QR processing already in progress...");
                    return;
                }
    
                window.isProcessingQR = true; // Prevent double execution
                try {
                    console.log("QR Code Scanned:", decodedText);
                    await createPatientQR(decodedText);
                } catch (error) {
                    console.error("Error during patient creation:", error);
                } finally {
                    window.isProcessingQR = false; // Reset the flag
                    stopScanner();
                }
            },
            (error) => console.warn("QR Code scan error:", error)
        )
        .catch((err) => console.error("Failed to start scanner:", err));
    
    
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
