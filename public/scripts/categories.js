document.addEventListener('DOMContentLoaded', function() {

    const categoriesBtn = document.getElementById('categoriesBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    //Function to open sidebar
    function openSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }

    // Function to close sidebar
    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    // Open sidebar when categories button is clicked
    categoriesBtn.addEventListener('click', openSidebar);

    // Close sidebar when close button is clicked
    closeSidebarBtn.addEventListener('click', closeSidebar);

    // Close sidebar when overlay is clicked
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Prevent clicks inside sidebar from closing it
    sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
    });

});