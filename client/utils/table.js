import {removeParam} from './removeParam.js';

document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('add-btn');
    const addForm = document.getElementById('add-form');
    
    const addBtnVacc = document.getElementById('add-btnvacc');
    const addFormVacc = document.getElementById('add-formvacc');
  
    const addBtnFam = document.getElementById('add-btnfam');
    const addFormFam = document.getElementById('add-formfam');
  
    const addBtnSurg = document.getElementById('add-btnsurgery');
    const addFormSurg = document.getElementById('add-formsurgery');

    const addBtnSocial = document.getElementById('add-btnsocial');
    const addFormSoc = document.getElementById('add-formsocial');
    
    const addBtnVital = document.getElementById('add-btnvital');
    const addFormVital = document.getElementById('add-formvital');

    const addBtnAllergy = document.getElementById('add-btnallergy');
    const addFormAllergy = document.getElementById('add-formallergy');


    const closeForm = document.getElementById('close-form');
    const closeFormVacc = document.getElementById('close-formvacc');
    const closeFormFam = document.getElementById('close-formfam');
    const closeFormSoc = document.getElementById('close-formsocial');
    const closeFormSurg = document.getElementById('close-formsurgery');
    const closeFormVital = document.getElementById('close-formvital');

    const closeFormAllergy = document.getElementById('close-formallergy');

  
    // Open form listeners
    addBtn.addEventListener('click', () => {
        addForm.classList.remove('hidden');
        document.getElementById("medication-header").textContent = "Add Medication History Record";
        document.getElementById("medication-button").textContent = "Add Record";
    });
  
    addBtnVacc.addEventListener('click', () => {
        addFormVacc.classList.remove('hidden');
        document.getElementById("vaccination-header").textContent = "Add Vaccination History Record";
        document.getElementById("vaccination-button").textContent = "Add Record";
    });
  
    addBtnFam.addEventListener('click', () => {
        addFormFam.classList.remove('hidden');
        document.getElementById("family-header").textContent = "Add Family History Record";
        document.getElementById("family-button").textContent = "Add Record";
    });

    addBtnSocial.addEventListener('click', () => {
        addFormSoc.classList.remove('hidden');
        document.getElementById("social-header").textContent = "Add Social History Record";
        document.getElementById("social-button").textContent = "Add Record";
    });

    addBtnSurg.addEventListener('click', () => {
        addFormSurg.classList.remove('hidden');
        document.getElementById("surgical-header").textContent = "Add Surgical History Record";
        document.getElementById("surgical-button").textContent = "Add Record";
    });

    addBtnVital.addEventListener('click', () => {
        addFormVital.classList.remove('hidden'); 
        document.getElementById("vital-header").textContent = "Add Vital Sign History Record";
        document.getElementById("vital-button").textContent = "Add Record";
    });

    addBtnAllergy.addEventListener('click', () => {
        addFormAllergy.classList.remove('hidden'); 
        document.getElementById("allergy-header").textContent = "Add Allergy History Record";
        document.getElementById("allergy-button").textContent = "Add Record";
    });


  // Close form listeners
    closeForm.addEventListener('click', () => {
        addForm.classList.add('hidden');
        removeParam();
    });
  
    closeFormVacc.addEventListener('click', () => {
        addFormVacc.classList.add('hidden');
    });
  
    closeFormFam.addEventListener('click', () => {
        addFormFam.classList.add('hidden');
        removeParam();
    });

    closeFormSoc.addEventListener('click', () => {
        addFormSoc.classList.add('hidden');
        removeParam();
    });

    closeFormSurg.addEventListener('click', () => {
        addFormSurg.classList.add('hidden');
        removeParam();
    });

    closeFormVital.addEventListener('click', () => {
        addFormVital.classList.add('hidden');
    });
      
    closeFormAllergy.addEventListener('click', () => {
        addFormAllergy.classList.add('hidden');
        removeParam();
    });
});

// add a patient in digital ids

document.getElementById('add-patient').addEventListener('click', function () {
    document.getElementById('add-patient-form').classList.remove('hidden');
});


document.getElementById('close-form').addEventListener('click', function () {
    document.getElementById('add-patient-form').classList.add('hidden');
});


document.getElementById('patient-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const patientData = {};
    formData.forEach((value, key) => {
        patientData[key] = value;
    });
    console.log(patientData);  
    document.getElementById('add-patient-form').classList.add('hidden');
   
});

document.getElementById('download-pdf-btn').addEventListener('click', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  
    
    const token = localStorage.getItem('token');
    const ENDPOINT = getApiEndpoint(); 

    try {
        const response = await fetch(`${ENDPOINT}/api/patient/download-medical-records/${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Error downloading PDF");
        }

       
        const blob = await response.blob();
        
     
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `medical_records_${id}.pdf`;
     
        link.click();
    } catch (error) {
        console.error("Failed to download PDF:", error);
    }
});

  
