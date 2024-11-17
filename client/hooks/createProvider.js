document.getElementById("create-provider-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("provider-name").value;
    const provider_type = document.getElementById("provider-type").value;
    const provider_location = document.getElementById("provider-location").value;
    
    const token = localStorage.getItem("token");
    
    if (!token) {
        // Handle missing token or show error message
        Toastify({
            text: "Token not found. Please log in first.",
            duration: 3000,
            close: true,
            gravity: "top", 
            position: "center", 
            backgroundColor: "#FF6B6B", 
            stopOnFocus: true 
        }).showToast();
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/setup_provider/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}` // Add token in header if needed
            },
            body: JSON.stringify({
                name,
                provider_type,
                provider_location
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            sessionStorage.setItem('toastMessage', 'Provider created successfully!');
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
