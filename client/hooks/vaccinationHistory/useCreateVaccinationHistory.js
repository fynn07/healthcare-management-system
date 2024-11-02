document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("vaccination-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const date_administered = document.getElementById("vaccine-history-date-administered").value;
        const next_dose_date = document.getElementById("vaccine-history-next-dose-date").value;
        const vaccine_name = document.getElementById("vaccine-history-vaccine-name").value;
        const brand_name = document.getElementById("vaccine-history-brand-name").value;
        const provider = document.getElementById("vaccine-history-provider").value;
        const site_given = document.getElementById("vaccine-history-site-given").value;
        const dose_ml = document.getElementById("vaccine-history-dose-ml").value;

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/vaccination_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date_administered,
                    next_dose_date,
                    vaccine_name,
                    brand_name,
                    provider,
                    site_given,
                    dose_ml,
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
