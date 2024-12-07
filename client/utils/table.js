import {removeParam} from './removeParam.js';

document.addEventListener('DOMContentLoaded', function () {
    const addBtnMed = document.getElementById('add-btn');
    const addFormMed = document.getElementById('add-form');
    
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
    addBtnMed.addEventListener('click', () => {
        // show form
        addFormMed.classList.remove('invisible');
        addFormMed.classList.remove('opacity-0');
        addFormMed.classList.add('visible');
        addFormMed.classList.add('opacity-100');

        document.getElementById('delete-medication-record').classList.add('hidden');

        document.getElementById("medication-header").textContent = "Add Medication History Record";
        document.getElementById("medication-button").textContent = "Add Record";

        document.getElementById("medication-history-date-prescribed").value = "";
        document.getElementById("medication-history-generic-name").value = "";
        document.getElementById("medication-history-dosage").value = "";
        document.getElementById("medication-history-quantity").value = "";
        document.getElementById("medication-history-instructions").value = "";
    });
  
    addBtnVacc.addEventListener('click', () => {
        // show form
        addFormVacc.classList.remove('invisible');
        addFormVacc.classList.remove('opacity-0');
        addFormVacc.classList.add('visible');
        addFormVacc.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-vaccination-record').classList.add('hidden');

        document.getElementById("vaccination-header").textContent = "Add Vaccination History Record";
        document.getElementById("vaccination-button").textContent = "Add Record";

        document.getElementById("vaccine-history-date-administered").value = "";
        document.getElementById("vaccine-history-next-dose-date").value =  "";
        document.getElementById("vaccine-history-vaccine-name").value = "";
        document.getElementById("vaccine-history-brand-name").value = "";
        document.getElementById("vaccine-history-provider").value = "";
        document.getElementById("vaccine-history-site-given").value = "";
        document.getElementById("vaccine-history-dose-ml").value = "";
    });
  
    addBtnFam.addEventListener('click', () => {
        // show form
        addFormFam.classList.remove('invisible');
        addFormFam.classList.remove('opacity-0');
        addFormFam.classList.add('visible');
        addFormFam.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-family-record').classList.add('hidden');

        document.getElementById("family-header").textContent = "Add Family History Record";
        document.getElementById("family-button").textContent = "Add Record";

        document.getElementById("family-history-relationship").value = "";
        document.getElementById("family-history-condition-illness").value = "";
    });

    addBtnSocial.addEventListener('click', () => {
        // show form
        addFormSoc.classList.remove('invisible');
        addFormSoc.classList.remove('opacity-0');
        addFormSoc.classList.add('visible');
        addFormSoc.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-social-record').classList.add('hidden');

        document.getElementById("social-header").textContent = "Add Social History Record";
        document.getElementById("social-button").textContent = "Add Record";

        document.getElementById("social-history-nicotine-consumption").value = "";
        document.getElementById("social-history-alcohol-consumption").value = "";
        document.getElementById("social-history-drugs-taken").value = "";
        document.getElementById("social-history-diet").value = "";
        document.getElementById("social-history-physical-activity").value = "";
    });

    addBtnSurg.addEventListener('click', () => {
        // show form
        addFormSurg.classList.remove('invisible');
        addFormSurg.classList.remove('opacity-0');
        addFormSurg.classList.add('visible');
        addFormSurg.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-surgical-record').classList.add('hidden');

        document.getElementById("surgical-header").textContent = "Add Surgical History Record";
        document.getElementById("surgical-button").textContent = "Add Record";

        document.getElementById("surgical-history-operation-procedure").value = "";
        document.getElementById("surgical-history-indication").value = "";
        document.getElementById("surgical-history-hospital").value = "";
        document.getElementById("surgical-history-operation-date").value = "";
    });

    addBtnVital.addEventListener('click', () => {
        // show form
        addFormVital.classList.remove('invisible');
        addFormVital.classList.remove('opacity-0');
        addFormVital.classList.add('visible');
        addFormVital.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-vital-record').classList.add('hidden');

        document.getElementById("vital-header").textContent = "Add Vital Sign History Record";
        document.getElementById("vital-button").textContent = "Add Record";

        document.getElementById("vital-history-temperature").value = "";
        document.getElementById("vital-history-blood-pressure").value = "";
        document.getElementById("vital-history-pulse-rate").value = "";
        document.getElementById("vital-history-blood-glucose").value = "";
    });

    addBtnAllergy.addEventListener('click', () => {
        // show form
        addFormAllergy.classList.remove('invisible');
        addFormAllergy.classList.remove('opacity-0');
        addFormAllergy.classList.add('visible');
        addFormAllergy.classList.add('opacity-100');

        // modify form
        document.getElementById('delete-allergy-record').classList.add('hidden');

        document.getElementById("allergy-header").textContent = "Add Allergy History Record";
        document.getElementById("allergy-button").textContent = "Add Record";

        document.getElementById("allergy-history-substance").value = "";
        document.getElementById("allergy-history-description").value = "";
        document.getElementById("allergy-history-severity").value = "";
        document.getElementById("allergy-history-criticality").value = "";
    });


  // Close form listeners
    closeForm.addEventListener('click', () => {
        addFormMed.classList.remove('visible');
        addFormMed.classList.remove('opacity-100');
        addFormMed.classList.add('invisible');
        addFormMed.classList.add('opacity-0');
        removeParam();
    });
  
    closeFormVacc.addEventListener('click', () => {
        addFormVacc.classList.remove('visible');
        addFormVacc.classList.remove('opacity-100');
        addFormVacc.classList.add('invisible');
        addFormVacc.classList.add('opacity-0');
    });
  
    closeFormFam.addEventListener('click', () => {
        addFormFam.classList.remove('visible');
        addFormFam.classList.remove('opacity-100');
        addFormFam.classList.add('invisible');
        addFormFam.classList.add('opacity-0');
        removeParam();
    });

    closeFormSoc.addEventListener('click', () => {
        addFormSoc.classList.remove('visible');
        addFormSoc.classList.remove('opacity-100');
        addFormSoc.classList.add('invisible');
        addFormSoc.classList.add('opacity-0');
        removeParam();
    });

    closeFormSurg.addEventListener('click', () => {
        addFormSurg.classList.remove('visible');
        addFormSurg.classList.remove('opacity-100');
        addFormSurg.classList.add('invisible');
        addFormSurg.classList.add('opacity-0');
        removeParam();
    });

    closeFormVital.addEventListener('click', () => {
        addFormVital.classList.remove('visible');
        addFormVital.classList.remove('opacity-100');
        addFormVital.classList.add('invisible');
        addFormVital.classList.add('opacity-0');
    });
      
    closeFormAllergy.addEventListener('click', () => {
        addFormAllergy.classList.remove('visible');
        addFormAllergy.classList.remove('opacity-100');
        addFormAllergy.classList.add('invisible');
        addFormAllergy.classList.add('opacity-0');
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

  
