const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const signInButton = document.getElementById('signInButton');


signInButton.addEventListener('click', function(event) {
    event.preventDefault();
    
   
    window.location.href = '../dashboard.html';
});
