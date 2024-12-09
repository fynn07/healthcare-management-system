import { getApiEndpoint } from "../../utils/getApiEndpoint.js";

async function fetchProvider(){
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

async function fetchAccount(){
    const ENDPOINT = getApiEndpoint();

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${ENDPOINT}/api/fetch_user/`, {
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

document.addEventListener("DOMContentLoaded", async function() {
    const provider_data = await fetchProvider();
    console.log(provider_data)

    document.getElementById('provider_name').value = provider_data.name
    document.getElementById('provider_email').value = provider_data.provider_email
    document.getElementById('provider_contact_number').value = provider_data.provider_contact_number
    document.getElementById('provider_type').value = provider_data.provider_type
    document.getElementById('provider_region').value = provider_data.provider_region
    document.getElementById('provider_province').value = provider_data.provider_province
    document.getElementById('provider_city').value = provider_data.provider_city
    document.getElementById('provider_location').value = provider_data.provider_location
});
