import {removeParam} from '../../utils/removeParam.js';
import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

async function deleteAllergyData(record_id){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/delete/${id}/allergy_history/${record_id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete patient data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting patient details:", error);
        return null;
    }

}


document.getElementById('delete-allergy-record').addEventListener('click', (event) => {
    // Show the modal
    const modal = document.getElementById('confirm-deletion-modal');
    const allergy_form = document.getElementById('add-formallergy')

    modal.classList.remove('hidden');
    allergy_form.classList.add('blur-sm', 'pointer-events-none', 'opacity-50')

    const record_id = new URLSearchParams(window.location.search).get('edit_id');

    // Handle confirmation
    document.getElementById('confirm-delete-btn').onclick = async () => {
        await deleteAllergyData(record_id);

        sessionStorage.setItem('toastMessage', 'Record Successfully Deleted');
        sessionStorage.setItem('toastType', 'success');

        allergy_form.classList.remove('blur-sm', 'pointer-events-none', 'opacity-50')
        modal.classList.add('hidden');

        location.reload();
    };

    // Handle cancellation
    document.getElementById('cancel-delete-btn').onclick = () => {
        modal.classList.add('hidden');
        allergy_form.classList.remove('blur-sm', 'pointer-events-none', 'opacity-50')
    };
});

