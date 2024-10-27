async function fetchPatientDetails(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:8000/api/patient/fetch/${id}/`, {
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

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id'); 

    if (patientId) {
        const patient = await fetchPatientDetails(patientId); 
        if (patient) {
            document.getElementById('fullName').textContent = `${patient.first_name} ${patient.last_name}`;
            document.getElementById('gender').textContent = patient.gender === 'M' ? 'Male' : 'Female';
            document.getElementById('birthday').textContent = new Date(patient.birthday).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
            document.getElementById('email').textContent = patient.email;
            document.getElementById('contactNumber').textContent = patient.contact_number;
            document.getElementById('address').textContent = patient.address;
            document.getElementById('height').textContent = `${patient.height} cm`;
            document.getElementById('weight').textContent = `${patient.weight} kg`;
        } else {
            document.getElementById('fullName').textContent = 'No patient details found.';
        }
    } else {
        document.getElementById('fullName').textContent = 'No patient ID provided.';
    }
});