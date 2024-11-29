import { getApiEndpoint } from "./getApiEndpoint.js";

export async function checkProvider(){
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
            return false;
        }
        
        return true;
    } catch (error) {
        console.error("Error fetching provider:", error);
        return [];
    }
}