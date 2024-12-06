import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { forceRefresh } from '../utils/forceRefresh.js';

export async function createPatientQR(body){
        const ENDPOINT = getApiEndpoint();

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${ENDPOINT}/api/patient/create/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: body
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
}