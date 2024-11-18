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
    const provider_names = document.getElementsByClassName('provider_name_field');
    const provider_data = await fetchProviderName();

    Array.from(provider_names).forEach(provider_name => {
        const row = `${provider_data.name}`;
        provider_name.insertAdjacentHTML('beforeend', row);
    });
});

