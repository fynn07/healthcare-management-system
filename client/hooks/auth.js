import { checkProvider } from "../utils/checkProviderPresent.js";
import { getApiEndpoint } from "../utils/getApiEndpoint.js";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ENDPOINT = getApiEndpoint();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${ENDPOINT}/api/login/ `, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Handle successful login
            localStorage.setItem("token", data.token);

            Toastify({
                text: "Login successful! Redirecting...",
                duration: 3000,
                close: true,
                gravity: "top", 
                position: "center", 
                backgroundColor: "#4CAF50", 
                stopOnFocus: true 
            }).showToast();
            
            const provider_is_present = await checkProvider();

            if(provider_is_present){
                setTimeout(() => {
                    window.location.href = "/client/pages/digitalid.html";
                }, 3000); 
            }
            else{
                setTimeout(() => {
                    window.location.href = "/client/pages/test.html";
                }, 3000); 
            }

        } else {
            // Handle errors
            Toastify({
                text: "Login Failed. Please check your credentials.",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center", 
                backgroundColor: "#FF6B6B",
                stopOnFocus: true 
            }).showToast();
            console.log("Wrong Credentials")
        }
    } catch (error) {
        Toastify({
            text: "Login Failed. Please check your credentials.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center", 
            backgroundColor: "#FF6B6B",
            stopOnFocus: true 
        }).showToast();
        console.error("Error:", error);
    }
});