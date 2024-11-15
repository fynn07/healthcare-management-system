import {removeParam} from '../../utils/removeParam.js';

async function getAllergyData(record_id){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/patient/fetch/${id}/allergy_history/${record_id}/`, {
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

export async function useUpdateAllergyHistory(record_id){
    const allergy_data = await getAllergyData(record_id);
    const addFormAllergy = document.getElementById('add-formallergy');

    addFormAllergy.classList.remove('hidden'); 
    
    document.getElementById("allergy-history-substance").value = allergy_data.substance;
    document.getElementById("allergy-history-description").value = allergy_data.description;
    document.getElementById("allergy-history-severity").value = allergy_data.severity;
    document.getElementById("allergy-history-criticality").value = allergy_data.criticality;

    const form = document.getElementById("allergy-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const substance = document.getElementById("allergy-history-substance").value;
        const description = document.getElementById("allergy-history-description").value;
        const severity = document.getElementById("allergy-history-severity").value;
        const criticality = document.getElementById("allergy-history-criticality").value;

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
                substance,
                description,
                severity,
                criticality,
            };

            const response = await fetch(`http://127.0.0.1:8000/api/patient/update/${id}/allergy_history/${record_id}/`, {
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