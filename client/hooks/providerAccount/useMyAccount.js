/**
 * This JavaScript file manages the dynamic switching between two forms:
 * "General Information" and "Authentication" within a form container at
 * my_account.html.
 *
 * It handles user interaction, updates the DOM accordingly, and ensures
 * the active state of the buttons is visually reflected.
 *
 * Features:
 * - Dynamically updates the form container's content to show the
 *   selected form's HTML structure.
 * - Highlights the active button ("General Information" or "Authentication")
 *   to indicate the selected tab.
 * - Initializes the default state to display the "General Information" form
 *   on page load.
 *
 * Components:
 * 1. `btnInformation` - Button for switching to the "General Information" form.
 * 2. `btnAuthentication` - Button for switching to the "Authentication" form.
 * 3. `formContainer` - Container element where the forms are dynamically rendered.
 * 4. `informationFormHTML` - HTML structure for the "General Information" form.
 * 5. `authenticationFormHTML` - HTML structure for the "Authentication" form.
 *
 * Event Listeners:
 * - On click of `btnInformation`: Switches to the "General Information" form.
 * - On click of `btnAuthentication`: Switches to the "Authentication" form.
 * - On page load (`DOMContentLoaded`): Sets the default state to display the
 *   "General Information" form and highlights its corresponding button.
 */
import { fetchProviderDetails, fetchAccountDetails } from "./editAccountDetails.js";

// FORM SWITCH BUTTONS
const btnInformation = document.getElementById("btn-information");
const btnAuthentication = document.getElementById("btn-authentication");
const formContainer = document.getElementById("form-container");

// HTML TEMPLATES
const informationFormHTML = `
    <form id="provider-information-form" class="flex flex-col gap-8 text-gray-600">
        <div class="flex flex-col gap-4 sm:gap-6">
            <div class="w-full">
                <label for="account_name" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Provider Name</label>
                <input type="text" name="account_name" id="edit-provider-name" disabled
                    class="bg-gray-50 border-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all"
                    placeholder="Enter provider name" required>
            </div>
            <div class="w-full">
                <label for="account_type" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Provider Type</label>
                <input type="text" name="account_type" id="edit-provider-type" disabled
                    class="bg-gray-50 border border-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all"
                    placeholder="Enter provider type" required>
            </div>
            <div class="w-full">
                <label for="account_location" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Location</label>
                <input type="text" name="account_location" id="edit-provider-location" disabled
                    class="bg-gray-50 border border-gray-100 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 transition-all"
                    placeholder="Enter provider location" required>
            </div>
        </div>
        <!-- Buttons -->
        ${generateActionButtons("information")}
    </form>
`;

const authenticationFormHTML = `
    <form id="provider-authentication-form" class="flex flex-col gap-8 text-gray-600 grow justify-between">
        <div class="flex flex-col gap-4 sm:gap-6">
            <div class="w-full">
                <label for="account_username" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Username</label>
                <input type="text" name="account_username" id="edit-account-username" disabled
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
            <div class="w-full">
                <label for="account_email" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Email</label>
                <input type="email" name="account_email" id="edit-account-email" disabled
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
            <div class="w-full">
                <label for="account_password" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Password</label>
                <input type="password" name="account_password" id="account_password" disabled
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
            <div class="w-full">
                <label for="account_re_password" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Re-password</label>
                <input type="password" name="account_re_password" id="account_re_password" disabled
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            </div>
        </div>
        <!-- Buttons -->
        ${generateActionButtons("authentication")}
    </form>
`;

function generateActionButtons(type) {
    return `
        <div class="flex gap-2 mt-8 sm:mt-6">
            <button type="button" id="close-${type}-form" class="hidden min-w-[144px] px-4 py-2 bg-white hover:bg-blue_light text-blue_main border border-blue_main rounded-lg transition-all">
                Cancel
            </button>
            <button type="submit" id="save-${type}-button" class="hidden min-w-[144px] px-4 py-2 bg-blue_cta hover:bg-blue_main text-white rounded-lg transition-all ml-4">
                Save Details
            </button>
            <button type="button" id="edit-${type}-button" class="min-w-[144px] px-4 py-2 bg-blue_cta hover:bg-blue_main text-white rounded-lg transition-all">
                Edit Details
            </button>
        </div>
    `;
}

/* HANDLE WHICH FORM TO SHOW */
btnInformation.addEventListener("click", async() => {
    // Highlight General Information button
    btnInformation.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnAuthentication.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = informationFormHTML;

    await fetchProviderDetails();

    toggleEnableForm("information");
});

// Add click event listener for Authentication button
btnAuthentication.addEventListener("click", async() => {
    btnAuthentication.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnInformation.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = authenticationFormHTML;

    await fetchAccountDetails();

    toggleEnableForm("authentication");
});

// Initialize the page with information form by default
document.addEventListener("DOMContentLoaded", async() => {
    btnInformation.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnAuthentication.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = informationFormHTML;

    await fetchProviderDetails();

    toggleEnableForm("information");
});


/* HANDLE WHETHER TO ENABLE OR DISABLE FORM */
function toggleEnableForm(type) {
    // Get form elements and buttons
    const editButton = document.getElementById(`edit-${type}-button`);
    const saveButton = document.getElementById(`save-${type}-button`);
    const cancelButton = document.getElementById(`close-${type}-form`);
    const formInputs = document.querySelectorAll(`#provider-${type}-form input`);

    // Function to toggle buttons and inputs
    const toggleEditMode = (isEditing) => {
        // Toggle buttons
        editButton.classList.toggle("hidden", isEditing);
        saveButton.classList.toggle("hidden", !isEditing);
        cancelButton.classList.toggle("hidden", !isEditing);

        // Enable or disable input fields
        formInputs.forEach(input => {
            input.disabled = !isEditing;
            input.classList.toggle("bg-white", isEditing);
            input.classList.toggle("bg-gray-50", !isEditing);
            input.classList.toggle("border-gray-100", !isEditing);
            input.classList.toggle("border-gray-200", !isEditing);
        });
    };

    // Add click event listener to Edit button
    editButton.addEventListener("click", () => {
        editButton.classList.add("invisible", "opacity-0");
        toggleEditMode(true);

        cancelButton.classList.remove("invisible", "opacity-0");
        saveButton.classList.remove("invisible", "opacity-0");
    });

    // Add click event listener to Cancel button
    cancelButton.addEventListener("click", () => {
        cancelButton.classList.add("invisible", "opacity-0");
        saveButton.classList.add("invisible", "opacity-0");
        toggleEditMode(false);

        editButton.classList.remove("invisible", "opacity-0");
    });

    // Save button functionality (example)
    saveButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission for demo
        console.log("Form details saved!");

        cancelButton.classList.add("invisible", "opacity-0");
        saveButton.classList.add("invisible", "opacity-0");
        setTimeout(() => {

        })
        toggleEditMode(false);

        editButton.classList.remove("invisible", "opacity-0");
    });
}


