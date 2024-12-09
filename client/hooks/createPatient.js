import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../utils/forceRefresh.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("patient-form");

    const ENDPOINT = getApiEndpoint();

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append form fields
        formData.append("first_name", document.getElementById("patient-first-name").value);
        formData.append("middle_name", document.getElementById("patient-middle-name").value);
        formData.append("last_name", document.getElementById("patient-last-name").value);
        formData.append("contact_number", document.getElementById("patient-contact").value);
        formData.append("gender", document.getElementById("patient-gender").value);
        formData.append("birthday", document.getElementById("patient-birthdate").value);
        formData.append("email", document.getElementById("patient-email").value);
        formData.append("height", document.getElementById("patient-height").value);
        formData.append("weight", document.getElementById("patient-weight").value);
        formData.append("address", document.getElementById("patient-address").value);
    
        // Append image file
        const imageFile = document.getElementById("patient-image").files[0];

        if (imageFile) {
            const imageData = new FormData();

            imageData.append("profile_picture", imageFile);

            const token = localStorage.getItem('token');


            const response = await fetch(`${ENDPOINT}/api/upload/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: imageData
            });
    
            const result = await response.json();

            formData.append("profile_picture", result.profile_picture_url);
        }
    
    
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${ENDPOINT}/api/patient/create/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });
    
            const data = await response.json();
            console.log(data);
    
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
