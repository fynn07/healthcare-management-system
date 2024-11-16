document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("family-history-form");

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit_id');

        if (editId) {
            return;
        }

        const relationship = document.getElementById("family-history-relationship").value;
        const condition_illness = document.getElementById("family-history-condition-illness").value;

        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/family_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    relationship,
                    condition_illness,
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
