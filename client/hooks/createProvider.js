import { getApiEndpoint } from "../utils/getApiEndpoint.js";

document.getElementById("provider-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ENDPOINT = getApiEndpoint();

    const name = document.getElementById("provider_name").value;
    const provider_email = document.getElementById("provider_email").value;
    const provider_contact_number = document.getElementById("provider_contact_number").value;
    const provider_type = document.getElementById("provider_type").value;
    const provider_region = document.getElementById("provider_region").value;
    const provider_province = document.getElementById("provider_province").value;
    const provider_city = document.getElementById("provider_city").value;
    const provider_location = document.getElementById("provider_location").value;

    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    if(password !== confirm_password){
            Toastify({
                text: "Error creating provider. Password do not match.",
                duration: 3000,
                close: true,
                gravity: "top", 
                position: "center", 
                backgroundColor: "#FF6B6B", 
                stopOnFocus: true 
            }).showToast();
        return
    }
    
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${ENDPOINT}/api/setup_provider/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}` // Add token in header if needed
            },
            body: JSON.stringify({
                name,
                provider_type,
                provider_location,
                provider_email,
                provider_contact_number,
                provider_region,
                provider_province,
                provider_city,
                password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            sessionStorage.setItem('toastMessage', 'Provider created successfully!');
            sessionStorage.setItem('toastType', 'success');
            window.location.href = "/client/pages/digitalid.html";
        } else {
            Toastify({
                text: "Error creating provider. Please try again.",
                duration: 3000,
                close: true,
                gravity: "top", 
                position: "center", 
                backgroundColor: "#FF6B6B", 
                stopOnFocus: true 
            }).showToast();
        }
    } catch (error) {
        console.error("Error:", error);
        Toastify({
            text: "An error occurred. Please try again later.",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            backgroundColor: "#FF6B6B", 
            stopOnFocus: true 
        }).showToast();
    }
});
