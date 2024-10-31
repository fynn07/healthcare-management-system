document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("medication-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()
        
        const date_prescribed = document.getElementById("medication-history-date-prescribed").value;
        const generic_name = document.getElementById("medication-history-generic-name").value;
        const dosage = document.getElementById("medication-history-dosage").value;
        const quantity = document.getElementById("medication-history-quantity").value;
        const instructions = document.getElementById("medication-history-instructions").value;

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/medication_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date_prescribed,
                    generic_name,
                    dosage,
                    quantity,
                    instructions,
                })
            });

            const data = await response.json();

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
