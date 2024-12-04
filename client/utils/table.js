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
        addForm.classList.remove('invisible');
        addForm.classList.remove('opacity-0');
        addForm.classList.add('visible');
        addForm.classList.add('opacity-100');
    });
  
    addBtnVacc.addEventListener('click', () => {
        addFormVacc.classList.remove('invisible');
        addFormVacc.classList.remove('opacity-0');
        addFormVacc.classList.add('visible');
        addFormVacc.classList.add('opacity-100');
    });
  
    addBtnFam.addEventListener('click', () => {
        addFormFam.classList.remove('invisible');
        addFormFam.classList.remove('opacity-0');
        addFormFam.classList.add('visible');
        addFormFam.classList.add('opacity-100');
    });

    addBtnSocial.addEventListener('click', () => {
        addFormSoc.classList.remove('invisible');
        addFormSoc.classList.remove('opacity-0');
        addFormSoc.classList.add('visible');
        addFormSoc.classList.add('opacity-100');
    });

    addBtnSurg.addEventListener('click', () => {
        addFormSurg.classList.remove('invisible');
        addFormSurg.classList.remove('opacity-0');
        addFormSurg.classList.add('visible');
        addFormSurg.classList.add('opacity-100');
    });

    addBtnVital.addEventListener('click', () => {
        addFormVital.classList.remove('invisible');
        addFormVital.classList.remove('opacity-0');
        addFormVital.classList.add('visible');
        addFormVital.classList.add('opacity-100');
    });

    addBtnAllergy.addEventListener('click', () => {
        addFormAllergy.classList.remove('invisible');
        addFormAllergy.classList.remove('opacity-0');
        addFormAllergy.classList.add('visible');
        addFormAllergy.classList.add('opacity-100');
    });


  // Close form listeners
    closeForm.addEventListener('click', () => {
        addForm.classList.remove('visible');
        addForm.classList.remove('opacity-100');
        addForm.classList.add('invisible');
        addForm.classList.add('opacity-0');
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
  
