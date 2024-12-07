import { removeParam } from '../../utils/removeParam.js';
import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

async function getSurgicalData(record_id) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/${id}/surgical_history/${record_id}/`, {
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

export async function useUpdateSurgicalHistory(record_id) {
    const surgical_data = await getSurgicalData(record_id);
    const addFormSurg = document.getElementById('add-formsurgery');

    const ENDPOINT = getApiEndpoint();

    // show form to edit the data
    addFormSurg.classList.remove('invisible');
    addFormSurg.classList.remove('opacity-0');
    addFormSurg.classList.add('visible');
    addFormSurg.classList.add('opacity-100');
    
    document.getElementById("surgical-history-operation-procedure").value = surgical_data.operation_procedure;
    document.getElementById("surgical-history-indication").value = surgical_data.indication;
    document.getElementById("surgical-history-hospital").value = surgical_data.hospital;
    document.getElementById("surgical-history-operation-date").value = surgical_data.operation_date;

    const form = document.getElementById("surgical-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const operation_procedure = document.getElementById("surgical-history-operation-procedure").value;
        const indication = document.getElementById("surgical-history-indication").value;
        const hospital = document.getElementById("surgical-history-hospital").value;
        let operation_date = document.getElementById("surgical-history-operation-date").value;

        operation_date = UtcTimeValidifier(operation_date);

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
                operation_procedure,
                indication,
                hospital,
                operation_date,
            };

            const response = await fetch(`${ENDPOINT}/api/patient/update/${id}/surgical_history/${record_id}/`, {
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


// TODO: add function to fetch surgery record either added by you or added by all
const btnAll = document.getElementById('btn-surgery-by-all');
const btnYou = document.getElementById('btn-surgery-by-you');

// Class to toggle
const activeClasses = ['border-b-2', 'text-blue_main', 'border-blue_main', 'font-medium'];

btnAll.addEventListener('click', () => {
    activeClasses.forEach(cls => btnYou.classList.remove(cls));
    activeClasses.forEach(cls => btnAll.classList.add(cls));

    // Perform action for "Added by all"
    console.log('Showing surgery added by all.');
});

btnYou.addEventListener('click', () => {
    activeClasses.forEach(cls => btnAll.classList.remove(cls));
    activeClasses.forEach(cls => btnYou.classList.add(cls));

    // Perform action for "Added by you"
    console.log('Showing surgery added by you.');
});
