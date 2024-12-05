import { removeParam } from '../../utils/removeParam.js';
import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

async function getVaccinationData(record_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/${id}/vaccination_history/${record_id}/`, {
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

export async function useUpdateVaccinationHistory(record_id) {
    const vaccination_data = await getVaccinationData(record_id);
    const addFormVacc = document.getElementById('add-formvacc');

    const ENDPOINT = getApiEndpoint();

    addFormVacc.classList.remove('hidden'); 

    document.getElementById("vaccination-header").textContent = "Edit Vaccination History Record";
    document.getElementById("vaccination-button").textContent = "Edit Record";
    
    document.getElementById("vaccine-history-date-administered").value = vaccination_data.date_administered;
    document.getElementById("vaccine-history-next-dose-date").value = vaccination_data.next_dose_date; 
    document.getElementById("vaccine-history-vaccine-name").value = vaccination_data.vaccine_name;
    document.getElementById("vaccine-history-brand-name").value = vaccination_data.brand_name;
    document.getElementById("vaccine-history-provider").value = vaccination_data.provider;
    document.getElementById("vaccine-history-site-given").value = vaccination_data.site_given;
    document.getElementById("vaccine-history-dose-ml").value = vaccination_data.dose_ml;

    const form = document.getElementById("vaccination-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        let date_administered = document.getElementById("vaccine-history-date-administered").value;
        let next_dose_date = document.getElementById("vaccine-history-next-dose-date").value;
        const vaccine_name = document.getElementById("vaccine-history-vaccine-name").value;
        const brand_name = document.getElementById("vaccine-history-brand-name").value;
        const provider = document.getElementById("vaccine-history-provider").value;
        const site_given = document.getElementById("vaccine-history-site-given").value;
        const dose_ml = document.getElementById("vaccine-history-dose-ml").value;

        date_administered = UtcTimeValidifier(date_administered);
        next_dose_date = UtcTimeValidifier(next_dose_date);

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
                date_administered,
                next_dose_date,
                vaccine_name,
                brand_name,
                provider,
                site_given,
                dose_ml,
            };

            const response = await fetch(`${ENDPOINT}/api/patient/update/${id}/vaccination_history/${record_id}/`, {
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
