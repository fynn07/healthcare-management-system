
const filter_dropdown_button = document.getElementById("filter_record_button");
const filter_dropdown = document.getElementById("filter_record_dropdown");

filter_dropdown_button.addEventListener("click", () => {
    filter_dropdown.classList.toggle("hidden");
    filter_dropdown.classList.toggle("opacity-0");
})

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

document.addEventListener("DOMContentLoaded", () => {
    listenCheckboxes();
    handleSelectAll();
});