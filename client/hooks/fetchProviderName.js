import { getApiEndpoint } from "../utils/getApiEndpoint.js";

async function fetchProviderName(){
    const ENDPOINT = getApiEndpoint();

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/fetch_provider/`, {
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
    const provider_type = document.getElementById('provider-type')

    const provider_data = await fetchProviderName();

    const type = `${provider_data.provider_type} (${provider_data.provider_location})`;
    provider_type.insertAdjacentHTML('beforeend', type);

    Array.from(provider_names).forEach(provider_name => {
        const row = `${provider_data.name}`;
        provider_name.insertAdjacentHTML('beforeend', row);
    });
});

