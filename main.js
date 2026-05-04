// Sidebar HTML content as a string for local compatibility
const sidebarContent = `
<div class="p-4 h-100 d-flex flex-column">
    <div class="d-flex align-items-center justify-content-between mb-5">
        <div class="d-flex align-items-center gap-2">
            <img src="assets/logo.png" alt="Logo" width="24" height="24">
            <h1 class="h6 fw-bold mb-0">Quran Root Method</h1>
        </div>
        <button class="btn-close d-lg-none" onclick="toggleSidebar()"></button>
    </div>
    <nav class="nav nav-pills flex-column flex-grow-1" id="sidebar-nav">
        <a href="index.html" class="nav-link py-2 px-4 mb-2">Introduction</a>
        <a href="chapter1.html" class="nav-link py-2 px-4 mb-2">1. Classification</a>
        <a href="chapter2.html" class="nav-link py-2 px-4 mb-2">2. Basic Word Forms</a>
        <a href="chapter3.html" class="nav-link py-2 px-4 mb-2">3. Mudari Forms</a>
    </nav>
</div>`;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('d-none');
        document.body.classList.toggle('overflow-hidden');
    }
}

function loadSidebar() {
    const sidebarElement = document.getElementById('sidebar');
    if (!sidebarElement) return;

    // Inject the content
    sidebarElement.innerHTML = sidebarContent;

    // Set active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = sidebarElement.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Handle case where path is empty (home)
        const path = linkPath === 'index.html' ? ['index.html', ''] : [linkPath];
        if (path.includes(currentPath)) {
            link.classList.add('active');
        } else {
            link.classList.add('link-dark');
        }
    });
}

// Load sidebar when DOM is ready
document.addEventListener('DOMContentLoaded', loadSidebar);
