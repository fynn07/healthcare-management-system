// table.js
document.addEventListener('DOMContentLoaded', function () {
    
    const digIdTable = document.getElementById('digId-body');
    


    digIDdata.forEach(item => {
        const row = `
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              ${item.name}
            </th>
            <td class="px-6 py-4">${item.gender}</td>
            <td class="px-6 py-4">${item.bday}</td>
            <td class="px-6 py-4 text-right">
              <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
          </tr>
        `;
        digIdTable.insertAdjacentHTML('beforeend', row);
      });
    

  });
  