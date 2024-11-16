document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("social-history-form")

    form.addEventListener("submit", async function(event) {
        event.preventDefault()

        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit_id');

        if (editId) {
            return;
        }

        const nicotine_consumption = document.getElementById("social-history-nicotine-consumption").value;
        const alcohol_consumption = document.getElementById("social-history-alcohol-consumption").value;
        const drugs_taken = document.getElementById("social-history-drugs-taken").value;
        const diet = document.getElementById("social-history-diet").value;
        const physical_activity = document.getElementById("social-history-physical-activity").value;

        const id = urlParams.get('id');

        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://127.0.0.1:8000/api/patient/create/${id}/social_history/`, {
                method: "POST",
                headers: {
                    'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nicotine_consumption,
                    alcohol_consumption,
                    drugs_taken,
                    diet,
                    physical_activity,
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
