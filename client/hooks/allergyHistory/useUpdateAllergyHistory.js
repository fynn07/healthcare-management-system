async function getAllergyData(record_id){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/patient/fetch/${id}/allergy_history/${record_id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
    }

}

export async function useUpdateAllergyHistory(record_id){
    const allergy_data = await getAllergyData(record_id);
    const addFormAllergy = document.getElementById('add-formallergy');
    addFormAllergy.classList.remove('hidden'); 

    

    document.getElementById("allergy-history-substance").value = allergy_data.substance;
    document.getElementById("allergy-history-description").value = allergy_data.description;
    document.getElementById("allergy-history-severity").value = allergy_data.severity;
    document.getElementById("allergy-history-criticality").value = allergy_data.criticality;


}