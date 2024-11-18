document.addEventListener('DOMContentLoaded', function () {
  // Determine the current page based on the URL or any identifier you use
  const currentPage = window.location.pathname; // Example: Use the path from the URL

  // Get all the list items (tabs) in the page_tag_list
  const tabs = document.querySelectorAll('#page_tag_list li');

  // Loop through each tab
  tabs.forEach(tab => {
    // Check if the current tab's ID matches the current page (you can adjust logic)
    if (currentPage.includes(tab.id)) {
      // Add active classes to the current tab
      tab.classList.add('bg-blue_super_light', 'text-blue_main');
    } else {
      // Remove the active classes from other tabs
      tab.classList.remove('bg-blue_super_light', 'text-blue_main');
    }
  });
});
