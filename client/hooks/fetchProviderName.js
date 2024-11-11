async function fetchProviderName(){
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/api/fetch_provider/', {
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
        console.error("Error fetching provider:", error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    
    const provider_name = document.getElementById('provider_name_field');
    console.log(provider_name)

    const provider_data = await fetchProviderName();

    const row = `<span class="text-gray-600 font-medium font-inter">${provider_data.name}</span>`;
    provider_name.insertAdjacentHTML('beforeend', row);
  });
