document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("vital-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit_id');

        if (editId) {
            return;
        }

        const temperature = document.getElementById("vital-history-temperature").value;
        const blood_pressure = document.getElementById("vital-history-blood-pressure").value;
        const pulse_rate = document.getElementById("vital-history-pulse-rate").value;
        const blood_glucose = document.getElementById("vital-history-blood-glucose").value;

        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/vital_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    temperature,
                    blood_pressure,
                    pulse_rate,
                    blood_glucose,
                })
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                sessionStorage.setItem('toastMessage', 'Record Successfully Added');
                sessionStorage.setItem('toastType', 'success');
                
            } else {
                sessionStorage.setItem('toastMessage', 'Failed to Add Record');
                sessionStorage.setItem('toastType', 'error');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
