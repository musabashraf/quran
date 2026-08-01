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

    // Build links
    let linksHtml = `<a href="index.html" class="nav-link">Introduction</a>`;
    QuranCourseData.chapters.forEach(ch => {
        const match = ch.title.match(/(<span.*?>.*?<\/span>)\s*(.*)/);
        if (match) {
            const arabicSpan = match[1];
            const englishPart = match[2];
            linksHtml += `
                <a href="${ch.url}" class="nav-link d-flex flex-column align-items-start">
                    <div class="d-flex align-items-center gap-1 w-100">
                        <span class="fw-bold">${ch.id}.</span>
                        <span>${arabicSpan}</span>
                    </div>
                    <span class="small text-muted ps-3" style="font-size: 0.85rem; font-weight: normal;">${englishPart}</span>
                </a>`;
        } else {
            linksHtml += `<a href="${ch.url}" class="nav-link">${ch.id}. ${ch.title}</a>`;
        }
    });

    // Master Sidebar Template
    const sidebarTemplate = `
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

    // Set active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = sidebarElement.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function loadSyllabusGrid() {
    const timelineElement = document.getElementById('syllabus-timeline');
    if (!timelineElement) return;

    let html = '';
    QuranCourseData.chapters.forEach(ch => {
        const btnColor = ch.color === 'primary' ? 'primary' : (ch.color === 'success' ? 'success' : 'danger');

        html += `
            <div class="position-relative mb-4">
                <!-- Step Badge centered horizontally on the border line, vertically aligned with card heading -->
                <div class="position-absolute start-0 translate-middle rounded-circle bg-white border border-4 border-${ch.color} d-flex align-items-center justify-content-center fw-bold text-${ch.color} shadow-sm" 
                     style="width: 48px; height: 48px; z-index: 2; top: 2.25rem;">
                    ${ch.id}
                </div>
                <!-- Chapter Card -->
                <div class="card p-4 rounded-4 shadow-sm border-0 border-top border-4 border-${ch.color} ms-4 ms-md-5">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <h4 class="h5 fw-bold mb-0 text-dark">${ch.title}</h4>
                        <a href="${ch.url}" class="btn btn-sm btn-outline-${btnColor} rounded-pill px-3 py-1 fw-bold">Open Chapter</a>
                    </div>
                    <p class="text-secondary mb-0 small" style="line-height: 1.6;">${ch.description}</p>
                </div>
            </div>`;
    });

    timelineElement.innerHTML = html;
}

function automateAyahLinks() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // Regex to match (Surah:Ayah)
    const regex = /\((\d+):(\d+)\)/g;
    
    // Target elements that usually contain these references
    const elements = mainContent.querySelectorAll('.small.text-muted, .fw-normal');
    
    elements.forEach(el => {
        // Only process if it has the pattern and doesn't already have a link
        if (regex.test(el.innerText) && !el.querySelector('a')) {
            el.innerHTML = el.innerText.replace(regex, (match, surah, ayah) => {
                return `<a href="https://quran.com/${surah}/${ayah}" 
                           target="_blank" 
                           class="text-decoration-none" 
                           style="color: #0d6efd; font-size: 0.85em; font-weight: 600; transition: all 0.2s; cursor: pointer;"
                           onmouseover="this.style.textDecoration='underline'; this.style.color='#0a58ca'"
                           onmouseout="this.style.textDecoration='none'; this.style.color='#0d6efd'"
                           title="Verify on Quran.com">${match}</a>`;
            });
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadSidebar();
    loadSyllabusGrid();
    automateAyahLinks();
});
