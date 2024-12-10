import { getApiEndpoint } from "../utils/getApiEndpoint.js";

async function deletePatient(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/delete/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete patient");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting patient details:", error);
        return null;
    }

}

document.getElementById('delete-patient-button').addEventListener('click', (event) => {
    // close patient dropdown
    const dropdown = document.getElementById("patient_dropdown");
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("opacity-0");

    // Show the modal
    const modal = document.getElementById('confirm-deletion-modal');

    modal.classList.remove('hidden');

    // Handle confirmation
    document.getElementById('confirm-delete-btn').onclick = async () => {
        await deletePatient();

        sessionStorage.setItem('toastMessage', 'Patient Successfully Deleted');
        sessionStorage.setItem('toastType', 'success');

        modal.classList.add('hidden');

        window.location.href = "/client/pages/digitalid.html";

    };

    // Handle cancellation
    document.getElementById('cancel-delete-btn').onclick = () => {
        modal.classList.add('hidden');
    };
});