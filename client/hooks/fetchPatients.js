async function fetchPatients() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/patient/fetch/', {
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

document.addEventListener('DOMContentLoaded', async function () {
    
    const digIdTable = document.getElementById('digId-body');

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
              <a href="../pages/dashboard.html?id=${id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
            </td>
          </tr>
        `;
        digIdTable.insertAdjacentHTML('beforeend', row);
      });
    

  });