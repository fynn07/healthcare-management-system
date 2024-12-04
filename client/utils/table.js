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
    });
  
    addBtnVacc.addEventListener('click', () => {
        addFormVacc.classList.remove('hidden');
    });
  
    addBtnFam.addEventListener('click', () => {
        addFormFam.classList.remove('hidden');
    });

    addBtnSocial.addEventListener('click', () => {
        addFormSoc.classList.remove('hidden');
    });

    addBtnSurg.addEventListener('click', () => {
        addFormSurg.classList.remove('hidden');
    });

    addBtnVital.addEventListener('click', () => {
        addFormVital.classList.remove('hidden'); 
    });

    addBtnAllergy.addEventListener('click', () => {
        addFormAllergy.classList.remove('hidden'); 
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

document.getElementById('download-pdf-btn').addEventListener('click', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  // Fetch patient ID from the URL
    
    const token = localStorage.getItem('token');
    const ENDPOINT = getApiEndpoint(); // Assuming you have this function to get the base URL

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

        // Create a Blob from the PDF response
        const blob = await response.blob();
        
        // Create a link element, use it to download the PDF
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `medical_records_${id}.pdf`;
        
        // Trigger the download by clicking the link
        link.click();
    } catch (error) {
        console.error("Failed to download PDF:", error);
    }
});

  
