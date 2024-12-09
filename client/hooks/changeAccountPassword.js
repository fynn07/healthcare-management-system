
import { getApiEndpoint } from "../utils/getApiEndpoint.js";

document.getElementById("provider_password_form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const ENDPOINT = getApiEndpoint();

    const password = document.getElementById("provider_password").value;
    const confirm_password = document.getElementById("provider_confirm_password").value;
    const new_password = document.getElementById("provider_new_password").value;

    if(new_password !== confirm_password){
            Toastify({
                text: "Error changing password. Password do not match.",
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
        const response = await fetch(`${ENDPOINT}/api/change_user_password/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}` // Add token in header if needed
            },
            body: JSON.stringify({
                password,
                new_password,
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            sessionStorage.setItem('toastMessage', 'Password Successfully Changed!');
            sessionStorage.setItem('toastType', 'success');
            // localStorage.removeItem('token');
            // window.location.href = "/client/pages/login.html";
        } else {
            Toastify({
                text: "Password Incorrect.",
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
})