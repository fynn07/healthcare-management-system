import { getApiEndpoint } from "./getApiEndpoint.js";

async function fetchProvider() {
    const ENDPOINT = getApiEndpoint();

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/fetch_provider/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch provider data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching provider:", error);
        return null;
    }
}

let qrCanvas;

document.getElementById("profile_generate_qr").addEventListener("click", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();

    const provider = await fetchProvider();
    if (!provider) {
        alert("Failed to fetch provider data.");
        return;
    }

    const json_url = `${ENDPOINT}/api/patient/fetch/${id}/generate_patient_json/${provider.account}/`;
    console.log(json_url);

    // Generate QR code
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = ''; // Clear any existing QR code
    const qrCode = new QRCode(qrContainer, {
        text: json_url,
        width: 256, // QR code width
        height: 256, // QR code height
    });

    // Wait for the QR code to be generated
    setTimeout(() => {
        const canvas = qrContainer.querySelector('canvas');
        if (canvas) {
            qrCanvas = canvas; // Save the canvas for downloading
        }
    }, 100);

    // Display the modal
    document.getElementById("generatedQRModal").classList.remove("hidden");
});

document.getElementById("downloadQR").addEventListener("click", () => {
    if (qrCanvas) {
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = qrCanvas.toDataURL('image/png');
        link.click();
    } else {
        alert("QR code is not ready for download. Please try again.");
    }
});

// Close modal functionality
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("generatedQRModal").classList.add("hidden");
});

document.getElementById("exitQR").addEventListener("click", () => {
    document.getElementById("generatedQRModal").classList.add("hidden");
});
