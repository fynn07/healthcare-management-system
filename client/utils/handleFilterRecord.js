
const filter_dropdown_button = document.getElementById("filter_record_button");
const filter_dropdown = document.getElementById("filter_record_dropdown");

filter_dropdown_button.addEventListener("click", () => {
    filter_dropdown.classList.toggle("hidden");
    filter_dropdown.classList.toggle("opacity-0");
})


/*
const check_medication = document.getElementById("check_medication");
const medication_card = document.getElementById("medication-history-card");

check_medication.addEventListener("click", () => {
    console.log('press')
    medication_card.classList.toggle("hidden")
})
*/


const mappings = {
    check_medication: "medication-history-card",
    check_vaccination: "vaccination-history-card",
    check_family: "family-history-card",
    check_social: "social-history-card",
    check_surgical: "surgical-history-card",
    check_vital_sign: "vital-history-card",
    check_allergy: "allergy-history-card",
};

const records = [
    "medication", "vaccination", "family", "social", "surgical", "vital", "allergy"
]

function listenCheckboxes() {
    // Add change event listeners to each checkbox
    records.forEach(record => {
        const button = document.getElementById(`check_${record}_button`);
        const checkbox = document.getElementById(`check_${record}`);
        const card = document.getElementById(`${record}-history-card`);

        button.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
        })

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                button.classList.add("bg-blue_super_light");
                card.classList.remove("hidden"); // Show the card
            } else {
                button.classList.remove("bg-blue_super_light");
                card.classList.add("hidden"); // Hide the card
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", listenCheckboxes);

function handleSelectAll() {
    const selectAllButton = document.getElementById("check_all_button");
    const selectAllCheckbox = document.getElementById("check_all");

    selectAllButton.addEventListener("click", () => {
        // Determine whether to check or uncheck all
        const isAllChecked = selectAllCheckbox.checked;
        const newCheckedState = !isAllChecked;
        selectAllCheckbox.checked = newCheckedState;

        records.forEach(record => {
            const checkbox = document.getElementById(`check_${record}`);
            const button = document.getElementById(`check_${record}_button`);
            const card = document.getElementById(`${record}-history-card`);

            // Update the checkbox state
            checkbox.checked = newCheckedState;

            // Toggle button and card visibility based on new state
            if (newCheckedState) {
                button.classList.add("bg-blue_super_light");
                card.classList.remove("hidden");
            } else {
                button.classList.remove("bg-blue_super_light");
                card.classList.add("hidden");
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", handleSelectAll);