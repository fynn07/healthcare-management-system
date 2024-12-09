import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../utils/forceRefresh.js';

async function getPatientData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const ENDPOINT = getApiEndpoint();
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/${id}/`, {
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

document.addEventListener("DOMContentLoaded", async function() {
    const form = document.getElementById("edit-patient-form");
    const patient_data = await getPatientData();


    document.getElementById('edit-patient-button').addEventListener('click', function () {
        document.getElementById('edit-patient-form').classList.remove('hidden');
    });

    document.getElementById('edit-close-form').addEventListener('click', function () {
        document.getElementById('edit-patient-form').classList.add('hidden');
    });

    document.getElementById("patient-first-name").value = patient_data.first_name;
    document.getElementById("patient-middle-name").value = patient_data.middle_name;
    document.getElementById("patient-last-name").value = patient_data.last_name;
    document.getElementById("patient-contact").value = patient_data.contact_number;
    document.getElementById("patient-gender").value = patient_data.gender;
    document.getElementById("patient-birthdate").value = patient_data.birthday;
    document.getElementById("patient-email").value = patient_data.email;
    document.getElementById("patient-height").value = patient_data.height;
    document.getElementById("patient-weight").value = patient_data.weight;
    document.getElementById("patient-address").value = patient_data.address;


    form.addEventListener("submit", async function(event) {
        event.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');

        const first_name = document.getElementById("patient-first-name").value;
        const middle_name = document.getElementById("patient-middle-name").value;
        const last_name = document.getElementById("patient-last-name").value;
        const contact_number = document.getElementById("patient-contact").value;
        const gender = document.getElementById("patient-gender").value;
        const birthday = document.getElementById("patient-birthdate").value;
        const email = document.getElementById("patient-email").value;
        const height = document.getElementById("patient-height").value;
        const weight = document.getElementById("patient-weight").value;
        const address = document.getElementById("patient-address").value;

        const ENDPOINT = getApiEndpoint();

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${ENDPOINT}/api/patient/update/${id}/`, {
                method: "PUT",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name,
                    middle_name,
                    last_name,
                    contact_number,
                    gender,
                    birthday,
                    email,
                    height,
                    weight,
                    address,
                })
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                sessionStorage.setItem('toastMessage', 'Patient Successfully Edited');
                sessionStorage.setItem('toastType', 'success');
                forceRefresh();
                
            } else {
                sessionStorage.setItem('toastMessage', 'Failed to Add Patient');
                sessionStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
