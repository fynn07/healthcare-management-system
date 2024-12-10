const dropdown_button = document.getElementById("patient_dropdown_button");
const dropdown = document.getElementById("patient_dropdown");

dropdown_button.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("opacity-0");
})