// Search Functions
function filterItems(items, searchTerm) {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase().trim();
    return items.filter(item => {
        return item.title.toLowerCase().includes(term) ||
               item.cat.toLowerCase().includes(term) ||
               item.desc.toLowerCase().includes(term) ||
               (item.tools && item.tools.toLowerCase().includes(term));
    });
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    
    const term = searchTerm.toLowerCase().trim();
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function handleHomeSearch() {
    const searchInput = document.getElementById('home-search');
    homeSearchTerm = searchInput.value;
    
    const clearBtn = document.getElementById('home-clear-search');
    if (homeSearchTerm) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
    
    renderHome();
}

function clearHomeSearch() {
    document.getElementById('home-search').value = '';
    homeSearchTerm = '';
    document.getElementById('home-clear-search').classList.add('hidden');
    renderHome();
}

function handleCategorySearch() {
    const searchInput = document.getElementById('category-search');
    categorySearchTerm = searchInput.value;
    
    const clearBtn = document.getElementById('category-clear-search');
    if (categorySearchTerm) {
        clearBtn.classList.remove('hidden');
    } else {
        clearBtn.classList.add('hidden');
    }
    
    if (currentCategory) {
        renderViewer(currentCategory);
    }
}

function clearCategorySearch() {
    document.getElementById('category-search').value = '';
    categorySearchTerm = '';
    document.getElementById('category-clear-search').classList.add('hidden');
    
    if (currentCategory) {
        renderViewer(currentCategory);
    }
}