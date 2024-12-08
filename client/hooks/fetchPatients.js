import { getApiEndpoint } from "../utils/getApiEndpoint.js";

async function fetchPatients() {
    const ENDPOINT = getApiEndpoint();

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/patient/fetch/`, {
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
        console.error("Error fetching patients:", error);
        return [];
    }
}

function formatData(item) {
    const fullName = `${item.first_name} ${item.last_name}`;
    const gender = item.gender === 'M' ? 'Male' : item.gender === 'F' ? 'Female' : 'N/A';
    const birthday = new Date(item.birthday).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
    const age = new Date().getFullYear() - new Date(item.birthday).getFullYear();

    return {
        id: item.id,
        fullName,
        gender,
        birthday,
        age
    };
}

function renderPatients(patients) {
    const digIdTable = document.getElementById('digId-body');
    digIdTable.innerHTML = ''; // Clear the table before rendering

    if (patients.length === 0) {
        digIdTable.innerHTML = `<tr><td colspan="4" class="text-center py-3">No patients found</td></tr>`;
        return;
    }

    patients.forEach(item => {
        const { id, fullName, gender, birthday, age } = formatData(item);
        const row = `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" data-id="${id}">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              ${fullName}
            </th>
            <td class="px-6 py-4">${gender}</td>
            <td class="px-6 py-4">${birthday}<br>${age} Years Old</td>
            <td class="px-6 py-4 text-right">
              <a href="../pages/dashboard.html?id=${id}" class="font-medium text-blue-600 dark:text-blue_main hover:underline">View</a>
            </td>
          </tr>
        `;
        digIdTable.insertAdjacentHTML('beforeend', row);
    });
}

document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.querySelector('input[name="search-patient"]');
    let patients = await fetchPatients();
    renderPatients(patients);

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredPatients = patients.filter(patient =>
            `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(query)
        );
        renderPatients(filteredPatients);
    });
});

/* TODO: Merge with above
// Function to populate data into the appropriate view
async function populateData() {
    const digIdTable = document.getElementById('digId-body');
    const digIdList = document.getElementById('digId-list');
    const digIDdata = await fetchPatients();

    digIDdata.forEach(item => {
        const { id, fullName, gender, birthday, age } = formatData(item);

        const row = `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" data-id="${id}">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${fullName}
                </th>
                <td class="px-6 py-4">${gender}</td>
                <td class="px-6 py-4">${birthday}<br>${age} Years Old </td>
                <td class="px-6 py-4 text-right">
                    <a href="../pages/dashboard.html?id=${id}" class="font-medium text-blue-600 dark:text-blue_main hover:underline">View</a>
                </td>
            </tr>
        `;

        const card = `
            <a href="../pages/dashboard.html?id=${id}" class="flex w-full gap-4 items-center px-6 pr-4 py-4 border-b border-[#DAE3E5]">
                <div class="flex flex-col w-full gap-0.5">
                    <span class="text-lg font-bold text-blue_cta">${fullName}</span>
                    <div class="flex gap-1 text-sm">
                        <span>${gender}</span>
                        <span>•</span>
                        <span>${age}y</span>
                        <span>•</span>
                        <span>${birthday}</span>
                    </div>
                </div>
                <button class="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </a>
        `;

        if (window.innerWidth >= 1024 && digIdTable) {
            digIdTable.insertAdjacentHTML('beforeend', row);
        } else if (digIdList) {
            digIdList.insertAdjacentHTML('beforeend', card);
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', renderView);

// Update view on window resize IF reaches certain range
function changeView() {
    if (window.innerWidth <= 1000 || window.innerWidth >= 1048) return;
    renderView();
}
window.addEventListener('resize', changeView);

* */
