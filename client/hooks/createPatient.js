import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../utils/forceRefresh.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("patient-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

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
            
            const response = await fetch(`${ENDPOINT}/api/patient/create/`, {
                method: "POST",
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
                sessionStorage.setItem('toastMessage', 'Patient Successfully Created');
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
