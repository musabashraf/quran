// Logic to build the sidebar and syllabus grid dynamically from course-data.js

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

    // Build sidebar links dynamically
    let linksHtml = `<a href="index.html" class="nav-link">Introduction</a>`;
    
    QuranCourseData.chapters.forEach(ch => {
        linksHtml += `<a href="${ch.url}" class="nav-link">${ch.id}. ${ch.title}</a>`;
    });

    const sidebarTemplate = `
        <style>
            .sidebar .nav-link {
                border-radius: 0.75rem;
                font-weight: 500;
                color: #6b7280 !important;
                transition: all 0.2s ease;
                margin-bottom: 0.5rem;
                padding: 0.75rem 1rem;
            }
            .sidebar .nav-link:hover {
                background-color: rgba(6, 95, 70, 0.05);
                color: #065f46 !important;
            }
            .sidebar .nav-link.active {
                background-color: #065f46 !important;
                color: white !important;
                box-shadow: 0 4px 12px rgba(6, 95, 70, 0.2);
            }
        </style>
        <div class="p-4 h-100 d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-5 px-2">
                <div class="d-flex align-items-center gap-2">
                    <img src="assets/logo.png" alt="Logo" width="28" height="28" class="rounded-1">
                    <h1 class="h6 fw-bold mb-0 text-primary ls-tight">Quran Root Method</h1>
                </div>
                <button class="btn-close d-lg-none" onclick="toggleSidebar()"></button>
            </div>
            <nav class="nav nav-pills flex-column flex-grow-1" id="sidebar-nav">
                ${linksHtml}
            </nav>
            <div class="mt-auto px-2">
                <p class="small text-muted opacity-50 mb-0" style="font-size: 0.7rem;">&copy; 2026 Quran Root Method</p>
            </div>
        </div>`;

    sidebarElement.innerHTML = sidebarTemplate;

    // Set active link based on current URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = sidebarElement.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const path = linkPath === 'index.html' ? ['index.html', ''] : [linkPath];
        if (path.includes(currentPath)) {
            link.classList.add('active');
        }
    });
}

function loadSyllabusGrid() {
    const gridElement = document.getElementById('syllabus-grid');
    if (!gridElement) return;

    let gridHtml = '';
    QuranCourseData.chapters.forEach(ch => {
        gridHtml += `
            <div class="col-md-6 col-lg-3">
                <div class="card shadow-sm rounded-4 overflow-hidden border-0 border-top border-${ch.color} border-4 h-100">
                    <div class="card-body p-4">
                        <div class="badge bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center mb-3" style="width: 36px; height: 36px;">${ch.id}</div>
                        <h6 class="fw-bold mb-2">${ch.title}</h6>
                        <p class="small text-muted mb-0">${ch.description}</p>
                    </div>
                </div>
            </div>`;
    });

    gridElement.innerHTML = gridHtml;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    loadSyllabusGrid();
});
