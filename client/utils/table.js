import {removeParam} from './removeParam.js';

document.addEventListener('DOMContentLoaded', function () {
<<<<<<< HEAD
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
  
=======
  const prescriptionTableBody = document.getElementById('prescription-body');
  const vaccinationTable = document.getElementById('vacc-body');
  const famTable = document.getElementById('fam-body');
  const socialTable = document.getElementById('social-body');
  const digIdTable = document.getElementById('digId-body');
  


  const addBtn = document.getElementById('add-btn');
  const addForm = document.getElementById('add-form');
  
  const addBtnVacc = document.getElementById('add-btnvacc');
  const addFormVacc = document.getElementById('add-formvacc');

  const addBtnFam = document.getElementById('add-btnfam');
  const addFormFam = document.getElementById('add-formfam');


  const closeForm = document.getElementById('close-form');
  const closeFormVacc = document.getElementById('close-formvacc');
  const closeFormFam = document.getElementById('close-formfam');
  const closeFormSoc = document.getElementById('close-formsocial');
  
  
  const addBtnSocial = document.getElementById('add-btnsocial');
  const addFormSoc = document.getElementById('add-formsocial');
  
  // Other existing code...
  
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

 
  // Close form listeners
  closeForm.addEventListener('click', () => {
      addForm.classList.add('hidden');
  });
  
  closeFormVacc.addEventListener('click', () => {
      addFormVacc.classList.add('hidden');
  });
  
  closeFormFam.addEventListener('click', () => {
      addFormFam.classList.add('hidden');
  });

  closeFormSoc.addEventListener('click', () => {
    addFormSoc.classList.add('hidden');
});

  
 
    
  
  prescriptionData.forEach(item => {
    const row = `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${item.datePrescribed}
        </th>
        <td class="px-6 py-4">${item.genericName}</td>
        <td class="px-6 py-4">${item.dosageForm}</td>
        <td class="px-6 py-4">${item.qty}</td>
        <td class="px-6 py-4">${item.instructions}</td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
      </tr>
    `;
    prescriptionTableBody.insertAdjacentHTML('beforeend', row);
  });
  

  
  vaccData.forEach(item => {
    const row = `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${item.dateAdded}
        </th>
        <td class="px-6 py-4">${item.vaccBrand}</td>
        <td class="px-6 py-4">${item.provider}</td>
        <td class="px-6 py-4">${item.siteGiven}</td>
        <td class="px-6 py-4">${item.dose}</td>
        <td class="px-6 py-4">${item.nextDose}</td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
      </tr>
    `;
    vaccinationTable.insertAdjacentHTML('beforeend', row);
  })

  famData.forEach(item => {
    const row = `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${item.dateAdded}
        </th>
        <td class="px-6 py-4">${item.relationship}</td>
        <td class="px-6 py-4">${item.conditionIllness}</td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
      </tr>
    `;
    famTable.insertAdjacentHTML('beforeend', row);
  })

  socialData.forEach(item => {
    const row = `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${item.dateAdded}
        </th>
        <td class="px-6 py-4">${item.nicConsumption}</td>
        <td class="px-6 py-4">${item.alcConsumption}</td>
        <td class="px-6 py-4">${item.drug}</td>
        <td class="px-6 py-4">${item.diet}</td>
        <td class="px-6 py-4">${item.physAct}</td>
        <td class="px-6 py-4 text-right">
          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
      </tr>
    `;
    socialTable.insertAdjacentHTML('beforeend', row);
  })

 

});
>>>>>>> 3362cdaf2e6a6f8682c9df6d576ea8f7dcf50cc9
