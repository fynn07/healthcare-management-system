export function removeParam(){
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.delete('edit_id');  // Remove the edit_id parameter
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    
    window.history.pushState({}, '', newUrl);
}