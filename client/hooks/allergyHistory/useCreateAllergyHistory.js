document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("allergy-history-form");

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit_id');

    if (editId) {
        return;
    }

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const substance = document.getElementById("allergy-history-substance").value;
        const description = document.getElementById("allergy-history-description").value;
        const severity = document.getElementById("allergy-history-severity").value;
        const criticality = document.getElementById("allergy-history-criticality").value;

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/allergy_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    substance,
                    description,
                    severity,
                    criticality,
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