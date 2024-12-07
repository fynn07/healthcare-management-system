import { getApiEndpoint } from "../utils/getApiEndpoint.js";
import { forceRefresh } from "../utils/forceRefresh.js";

export async function createPatientQR(body) {
    const ENDPOINT = getApiEndpoint();
    const token = localStorage.getItem("token"); 
    let qr_json, patient_id;

    try {
        const response = await fetch(body, {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch QR data");
        }

        qr_json = await response.json();
        console.log(qr_json.patient);
    } catch (error) {
        console.error("Error fetching QR data:", error);
        return;
    }

    try {
        const patientResponse = await fetch(`${ENDPOINT}/api/patient/create/`, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(qr_json.patient),
        });

        if (!patientResponse.ok) {
            throw new Error("Failed to create patient");
        }

        const patientData = await patientResponse.json();
        patient_id = patientData.id;

        const postHistory = async (historyArray, endpoint) => {
            const promises = historyArray.map((history) =>
                fetch(`${ENDPOINT}/api/patient/create/${patient_id}/${endpoint}/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(history),
                })
            );

            const results = await Promise.all(promises);
            results.forEach((res, idx) => {
                if (!res.ok) {
                    console.warn(`Failed to add history item ${idx + 1} for ${endpoint}`);
                }
            });
        };

        await Promise.all([
            postHistory(qr_json.medication_history, "medication_history"),
            postHistory(qr_json.vaccination_history, "vaccination_history"),
            postHistory(qr_json.family_history, "family_history"),
            postHistory(qr_json.social_history, "social_history"),
            postHistory(qr_json.surgical_history, "surgical_history"),
            postHistory(qr_json.vital_history, "vital_history"),
            postHistory(qr_json.allergy_history, "allergy_history"),
        ]);

        sessionStorage.setItem("toastMessage", "Patient Successfully Created");
        sessionStorage.setItem("toastType", "success");
        forceRefresh();
    } catch (error) {
        console.error("Error creating patient:", error);
        sessionStorage.setItem("toastMessage", "Patient Successfully Created");
        sessionStorage.setItem("toastType", "success");
        forceRefresh();
    }
}
