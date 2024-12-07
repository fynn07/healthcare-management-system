import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { forceRefresh } from '../utils/forceRefresh.js';

export async function createPatientQR(body){
    const ENDPOINT = getApiEndpoint();
    let qr_json;
    let patient_id;

        try{
            const token = localStorage.getItem('token');

            const response = await fetch(body, {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            qr_json = data;
            console.log(data.patient)

        } catch (error){
            console.error("Error:", error);
        }

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${ENDPOINT}/api/patient/create/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(qr_json.patient)
            });

            const data = await response.json();
            patient_id = data.id;

            for (const medication_history of qr_json.medication_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/medication_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(medication_history)
                });
            }

            for (const vaccination_history of qr_json.vaccination_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/vaccination_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(vaccination_history)
                });
            }

            for (const family_history of qr_json.family_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/family_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(family_history)
                });
            }

            for (const social_history of qr_json.social_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/social_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(social_history)
                });
            }

            for (const surgical_history of qr_json.surgical_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/surgical_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(surgical_history)
                });
            }

            for (const vital_history of qr_json.vital_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/vital_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(vital_history)
                });
            }

            for (const allergy_history of qr_json.allergy_history){
                const response = await fetch(`${ENDPOINT}/api/patient/create/${patient_id}/allergy_history/`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Token ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(allergy_history)
                });
            }


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
            sessionStorage.setItem('toastMessage', 'Failed to Add Patient');
            sessionStorage.setItem('toastType', 'error');
            forceRefresh()
        }
}