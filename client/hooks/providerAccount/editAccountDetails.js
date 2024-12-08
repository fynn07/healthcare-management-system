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


export async function fetchProviderDetails(){
    const provider_data = await fetchProvider();

    document.getElementById('edit-provider-name').value = provider_data.name
    document.getElementById('edit-provider-type').value = provider_data.provider_type
    document.getElementById('edit-provider-location').value = provider_data.provider_location
}

export async function fetchAccountDetails(){
    const account_data = await fetchAccount();
    
    document.getElementById('edit-account-username').value = account_data.username
    document.getElementById('edit-account-email').value = account_data.email
    
}