import { removeParam } from '../../utils/removeParam.js';
import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

async function getMedicationData(record_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/${id}/medication_history/${record_id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
    }
}

export async function useUpdateMedicationHistory(record_id) {
    const medication_data = await getMedicationData(record_id);
    const addFormMed = document.getElementById('add-form');

    const ENDPOINT = getApiEndpoint();

    addFormMed.classList.remove('hidden'); 

    document.getElementById("medication-header").textContent = "Edit Medication History Record";
    document.getElementById("medication-button").textContent = "Edit Record";
    
    document.getElementById("medication-history-date-prescribed").value = medication_data.date_prescribed;
    document.getElementById("medication-history-generic-name").value = medication_data.generic_name;
    document.getElementById("medication-history-dosage").value = medication_data.dosage;
    document.getElementById("medication-history-quantity").value = medication_data.quantity;
    document.getElementById("medication-history-instructions").value = medication_data.instructions;

    const form = document.getElementById("medication-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        let date_prescribed = document.getElementById("medication-history-date-prescribed").value;
        const generic_name = document.getElementById("medication-history-generic-name").value;
        const dosage = document.getElementById("medication-history-dosage").value;
        const quantity = document.getElementById("medication-history-quantity").value;
        const instructions = document.getElementById("medication-history-instructions").value;

        date_prescribed = UtcTimeValidifier(date_prescribed);

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const editId = urlParams.get('edit_id');  // Check for edit_id

        if (!editId) {
            return;
        }

        removeParam();

        try {
            const token = localStorage.getItem('token');
            const requestData = {
                date_prescribed,
                generic_name,
                dosage,
                quantity,
                instructions, 
            };

            const response = await fetch(`${ENDPOINT}/api/patient/update/${id}/medication_history/${record_id}/`, {
                method: "PUT",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                sessionStorage.setItem('toastMessage', 'Record Successfully Updated');
                sessionStorage.setItem('toastType', 'success');
                forceRefresh();
            } else {
                sessionStorage.setItem('toastMessage', 'Failed to Update Record');
                sessionStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
            sessionStorage.setItem('toastMessage', 'Error occurred while processing the request');
            sessionStorage.setItem('toastType', 'error');
        }

    });
}
