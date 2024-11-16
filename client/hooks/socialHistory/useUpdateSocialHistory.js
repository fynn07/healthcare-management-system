import { removeParam } from '../../utils/removeParam.js';

async function getSocialData(record_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/patient/fetch/${id}/social_history/${record_id}/`, {
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

export async function useUpdateSocialHistory(record_id) {
    const social_data = await getSocialData(record_id);
    const addFormSoc = document.getElementById('add-formsocial');

    addFormSoc.classList.remove('hidden'); 
    
    document.getElementById("social-history-nicotine-consumption").value = social_data.nicotine_consumption;
    document.getElementById("social-history-alcohol-consumption").value = social_data.alcohol_consumption;
    document.getElementById("social-history-drugs-taken").value = social_data.drugs_taken;
    document.getElementById("social-history-diet").value = social_data.diet;
    document.getElementById("social-history-physical-activity").value = social_data.physical_activity;

    const form = document.getElementById("social-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nicotine_consumption = document.getElementById("social-history-nicotine-consumption").value;
        const alcohol_consumption = document.getElementById("social-history-alcohol-consumption").value;
        const drugs_taken = document.getElementById("social-history-drugs-taken").value;
        const diet = document.getElementById("social-history-diet").value;
        const physical_activity = document.getElementById("social-history-physical-activity").value;

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
                nicotine_consumption,
                alcohol_consumption,
                drugs_taken,
                diet,
                physical_activity, 
            };

            const response = await fetch(`http://127.0.0.1:8000/api/patient/update/${id}/social_history/${record_id}/`, {
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
