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
    });

    closeFormSurg.addEventListener('click', () => {
        addFormSurg.classList.add('hidden');
    });

    closeFormVital.addEventListener('click', () => {
        addFormVital.classList.add('hidden');
    });
      
    closeFormAllergy.addEventListener('click', () => {
        addFormAllergy.classList.add('hidden');
        removeParam();
    });
});
  