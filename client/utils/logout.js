export function logout(){
    localStorage.removeItem('token');
    window.location.reload();
}

window.logout = logout;