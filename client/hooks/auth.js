document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/login/ ", {
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
  
            console.log("login successful")
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
        console.error("Error:", error);
    }
});