// Core Functions
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
}

function showPage(pageId) {
    lastPage = pageId;
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));

    const cats = ['maintenance', 'problems', 'tools', 'safety', 'habits', 'knowledge'];
    if(cats.includes(pageId)) {
        currentCategory = pageId;
        document.getElementById('page-viewer').classList.add('active-section');
        document.getElementById('viewer-title').innerText = pageId;
        
        // Clear category search when changing categories
        categorySearchTerm = '';
        document.getElementById('category-search').value = '';
        document.getElementById('category-clear-search').classList.add('hidden');
        
        renderViewer(pageId);
        document.getElementById('nav-' + pageId).classList.add('active-nav');
    } else {
        document.getElementById('page-' + pageId).classList.add('active-section');
        document.getElementById('nav-' + pageId).classList.add('active-nav');
        if(pageId === 'home') renderHome();
        if(pageId === 'admin') renderAdmin();
    }
    document.getElementById('header-title').innerText = pageId;
}

function goBack() {
    showPage(lastPage);
}

function toggleLang() {
    currentLang = currentLang === 'my' ? 'en' : 'my';
    document.getElementById('lang-text').innerText = currentLang === 'my' ? "ENGLISH" : "MALAY";
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.innerText = langData[currentLang][el.getAttribute('data-i18n')];
    });
    renderHome();
}