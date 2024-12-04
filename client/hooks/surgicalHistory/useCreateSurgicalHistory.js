import { getApiEndpoint } from "../../utils/getApiEndpoint.js";
import { UtcTimeValidifier } from '../../utils/UtcTimeValidifier.js';
import { forceRefresh } from '../../utils/forceRefresh.js';

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("surgical-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit_id');

        const ENDPOINT = getApiEndpoint();

        if (editId) {
            return;
        }

        const operation_procedure = document.getElementById("surgical-history-operation-procedure").value;
        const indication = document.getElementById("surgical-history-indication").value;
        const hospital = document.getElementById("surgical-history-hospital").value;
        let operation_date = document.getElementById("surgical-history-operation-date").value;

        operation_date = UtcTimeValidifier(operation_date);

        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${ENDPOINT}/api/patient/create/${id}/surgical_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    operation_procedure,
                    indication,
                    hospital,
                    operation_date,
                })
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                sessionStorage.setItem('toastMessage', 'Record Successfully Added');
                sessionStorage.setItem('toastType', 'success');
                forceRefresh();
                
            } else {
                sessionStorage.setItem('toastMessage', 'Failed to Add Record');
                sessionStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
