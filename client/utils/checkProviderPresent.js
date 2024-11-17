export async function checkProvider(){
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
            return false;
        }
        
        return true;
    } catch (error) {
        console.error("Error fetching provider:", error);
        return [];
    }
}