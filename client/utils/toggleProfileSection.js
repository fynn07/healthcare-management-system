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


// Get buttons and the container
const btnInformation = document.getElementById("btn-information");
const btnAuthentication = document.getElementById("btn-authentication");
const formContainer = document.getElementById("form-container");

// Define the HTML for each form
const informationFormHTML = `
    <form id="provider-information-form" class="flex flex-col gap-8 text-gray-600">
        <div class="flex flex-col gap-4 sm:gap-6">
            <div class="w-full">
                <label for="edit_provider_name" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Name</label>
                <input type="text" name="edit_provider_name" id="edit_provider_name"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Enter provider name" required>
            </div>
            <div class="w-full">
                <label for="edit_provider_type" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Provider Type</label>
                <input type="text" name="edit_provider_type" id="edit_provider_type"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Enter provider type" required>
            </div>
            <div class="w-full">
                <label for="edit_provider_location" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Location</label>
                <input type="text" name="edit_provider_location" id="edit_provider_location"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Enter provider location" required>
            </div>
        </div>
        <div class="flex justify-between mt-8 sm:mt-6">
            <button type="button" id="close-information-form" class="flex min-w-[144px] justify-center px-4 py-2 bg-white hover:bg-blue_light text-blue_main border border-blue_main rounded-lg transition-all hover:font-medium">
                Cancel
            </button>
            <button type="submit" id="save-information-button" class="flex min-w-[144px] justify-center px-4 py-2 bg-blue_cta hover:bg-blue_main text-white rounded-lg transition-all ml-4">
                Save Details
            </button>
        </div>
    </form>
`;

const authenticationFormHTML = `
    <form id="provider-authentication-form" class="flex flex-col gap-8 text-gray-600 grow justify-between">
        <div class="flex flex-col gap-4 sm:gap-6">
            <div class="w-full">
                <label for="edit_provider_email" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Email</label>
                <input type="email" name="edit_provider_email" id="edit_provider_email"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Enter provider email" required>
            </div>
            <div class="w-full">
                <label for="edit_provider_password" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Password</label>
                <input type="password" name="edit_provider_password" id="edit_provider_password"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Enter provider password" required>
            </div>
            <div class="w-full">
                <label for="edit_provider_re_password" class="block mb-2 ml-1 text-sm font-medium dark:text-white">Re-password</label>
                <input type="password" name="edit_provider_re_password" id="edit_provider_re_password"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Repeat provider password" required>
            </div>
        </div>
        <div class="flex justify-between mt-8 sm:mt-6">
            <button type="button" id="close-authentication-form" class="flex min-w-[144px] justify-center px-4 py-2 bg-white hover:bg-blue_light text-blue_main border border-blue_main rounded-lg transition-all hover:font-medium">
                Cancel
            </button>
            <button type="submit" id="save-authentication-button" class="flex min-w-[144px] justify-center px-4 py-2 bg-blue_cta hover:bg-blue_main text-white rounded-lg transition-all ml-4">
                Save Details
            </button>
        </div>
    </form>
`;

// Add click event listener for General Information button
btnInformation.addEventListener("click", () => {
    // Highlight General Information button
    btnInformation.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnAuthentication.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = informationFormHTML;
});

// Add click event listener for Authentication button
btnAuthentication.addEventListener("click", () => {
    btnAuthentication.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnInformation.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = authenticationFormHTML;
});

// Initialize the page with information form by default
document.addEventListener("DOMContentLoaded", () => {
    btnInformation.classList.add("border-b-[3px]", "text-blue_main", "border-blue_main");
    btnAuthentication.classList.remove("border-b-[3px]", "text-blue_main", "border-blue_main");

    formContainer.innerHTML = informationFormHTML;
});
