document.getElementById('delete-patient-button').addEventListener('click', (event) => {
    // Show the modal
    const modal = document.getElementById('confirm-deletion-modal');

    modal.classList.remove('hidden');

    // const record_id = new URLSearchParams(window.location.search).get('edit_id');

    // Handle confirmation
    document.getElementById('confirm-delete-btn').onclick = async () => {
        // await deleteSurgicalData(record_id);

        sessionStorage.setItem('toastMessage', 'Record Successfully Deleted');
        sessionStorage.setItem('toastType', 'success');

        surgical_form.classList.remove('blur-sm', 'pointer-events-none', 'opacity-50')
        modal.classList.add('hidden');

        location.reload();
    };

    // Handle cancellation
    document.getElementById('cancel-delete-btn').onclick = () => {
        modal.classList.add('hidden');
    };
});