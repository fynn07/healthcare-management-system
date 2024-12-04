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

// Insert table viw on wide screens, list view on smaller screens
const id_container = document.getElementById('id-container');

const id_table_view = `
    <table id="prescription-table"
           class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase border-b border-[#DAE3E5] dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Gender</th>
                <th scope="col" class="px-6 py-3">Birthdate</th>
                <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
            </tr>
        </thead>
        <tbody id="digId-body"></tbody>
    </table>`;

const id_list_view = `
    <div id="prescription-list" class="flex flex-col w-full text-sm text-neutral-600 dark:text-gray-400">
        <div id="digId-list" class="flex flex-col w-full"></div>
    </div>`;

// Function to render the correct view based on the screen size
function renderView() {
    id_container.innerHTML = ''; // Clear current view
    if (window.innerWidth >= 1024) {
        id_container.insertAdjacentHTML('beforeend', id_table_view);
    } else {
        id_container.insertAdjacentHTML('beforeend', id_list_view);
    }
    populateData(); // Populate data after rendering the view
}

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
