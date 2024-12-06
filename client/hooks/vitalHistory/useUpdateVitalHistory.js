import { removeParam } from '../../utils/removeParam.js';
import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

async function getVitalData(record_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/${id}/vital_history/${record_id}/`, {
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

export async function useUpdateVitalHistory(record_id) {
    const vital_data = await getVitalData(record_id);
    const addFormVital = document.getElementById('add-formvital');

    const ENDPOINT = getApiEndpoint();

    addFormVital.classList.remove('hidden'); 
    document.getElementById('delete-vital-record').classList.remove('hidden');

    document.getElementById("vital-header").textContent = "Edit Vital Sign History Record";
    document.getElementById("vital-button").textContent = "Edit Record";
    
    document.getElementById("vital-history-temperature").value = vital_data.temperature;
    document.getElementById("vital-history-blood-pressure").value = vital_data.blood_pressure;
    document.getElementById("vital-history-pulse-rate").value = vital_data.pulse_rate;
    document.getElementById("vital-history-blood-glucose").value = vital_data.blood_glucose;

    const form = document.getElementById("vital-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const temperature = document.getElementById("vital-history-temperature").value;
        const blood_pressure = document.getElementById("vital-history-blood-pressure").value;
        const pulse_rate = document.getElementById("vital-history-pulse-rate").value;
        const blood_glucose = document.getElementById("vital-history-blood-glucose").value;

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
                temperature,
                blood_pressure,
                pulse_rate,
                blood_glucose,
            };

            const response = await fetch(`${ENDPOINT}/api/patient/update/${id}/vital_history/${record_id}/`, {
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
