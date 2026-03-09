// Render Functions
function renderHome() {
    const searchTerm = document.getElementById('home-search')?.value || homeSearchTerm;
    homeSearchTerm = searchTerm;
    
    const filteredDb = filterItems(db, searchTerm);
    
    // Update search count
    const countEl = document.getElementById('home-results-count');
    if (countEl) {
        if (searchTerm) {
            countEl.textContent = `${filteredDb.length} hasil carian untuk "${searchTerm}"`;
        } else {
            countEl.textContent = '';
        }
    }
    
    // Update search input count badge
    const searchCount = document.getElementById('home-search-count');
    if (searchCount) {
        if (searchTerm && filteredDb.length > 0) {
            searchCount.textContent = `${filteredDb.length} ditemui`;
        } else if (searchTerm && filteredDb.length === 0) {
            searchCount.textContent = 'Tiada hasil';
        } else {
            searchCount.textContent = '';
        }
    }
    
    const grid = document.getElementById('home-grid');
    if (filteredDb.length === 0) {
        if (searchTerm) {
            grid.innerHTML = `
                <div class="col-span-3 text-center py-16">
                    <i class="fas fa-search text-5xl text-slate-300 dark:text-slate-700 mb-4"></i>
                    <p class="text-slate-500 dark:text-slate-400 text-lg">Tiada tutorial dijumpai untuk "${searchTerm}"</p>
                    <button onclick="clearHomeSearch()" class="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        <i class="fas fa-times mr-2"></i>Kosongkan Carian
                    </button>
                </div>
            `;
        } else {
            grid.innerHTML = '<p class="text-slate-400 italic col-span-3 text-center py-10">Tiada tutorial lagi.</p>';
        }
        return;
    }
    
    grid.innerHTML = filteredDb.slice(0,6).map(i => createCard(i, searchTerm)).join('');
}

function renderViewer(cat) {
    const searchTerm = document.getElementById('category-search')?.value || categorySearchTerm;
    categorySearchTerm = searchTerm;
    
    const data = db.filter(i => i.cat === cat);
    const filteredData = filterItems(data, searchTerm);
    
    // Update search count
    const countEl = document.getElementById('category-search-count');
    if (countEl) {
        if (searchTerm) {
            countEl.textContent = `${filteredData.length} dalam "${cat}"`;
        } else {
            countEl.textContent = '';
        }
    }
    
    const grid = document.getElementById('viewer-grid');
    if (filteredData.length === 0) {
        if (searchTerm) {
            grid.innerHTML = `
                <div class="col-span-3 text-center py-16">
                    <i class="fas fa-search text-5xl text-slate-300 dark:text-slate-700 mb-4"></i>
                    <p class="text-slate-500 dark:text-slate-400 text-lg">Tiada tutorial dalam kategori ${cat} untuk "${searchTerm}"</p>
                    <button onclick="clearCategorySearch()" class="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        <i class="fas fa-times mr-2"></i>Kosongkan Carian
                    </button>
                </div>
            `;
        } else {
            grid.innerHTML = '<p class="text-slate-400 italic col-span-3 text-center py-10">Tiada tutorial lagi.</p>';
        }
        return;
    }
    
    grid.innerHTML = filteredData.map(i => createCard(i, searchTerm)).join('');
}

function renderAdmin() {
    const filterValue = document.getElementById('admin-filter')?.value || 'all';
    const filteredDb = filterValue === 'all' ? db : db.filter(item => item.cat === filterValue);
    
    // Update count
    document.getElementById('filter-count').innerText = `${filteredDb.length} item(s)`;
    
    const body = document.getElementById('admin-table-body');
    if (filteredDb.length === 0) {
        body.innerHTML = `
            <tr>
                <td colspan="4" class="p-8 text-center text-slate-400 italic">
                    Tiada tutorial untuk kategori ini. Mula dengan menambah tutorial baru!
                </td>
            </tr>
        `;
        return;
    }
    
    body.innerHTML = filteredDb.map(i => {
        let mediaIcon = '';
        if (i.mediaType === 'image') mediaIcon = '<i class="fas fa-image text-green-500" title="Image"></i>';
        else if (i.mediaType === 'youtube') mediaIcon = '<i class="fab fa-youtube text-red-500" title="YouTube"></i>';
        else if (i.mediaType === 'video') mediaIcon = '<i class="fas fa-video text-blue-500" title="Video"></i>';
        else mediaIcon = '<i class="fas fa-minus text-slate-400" title="No Media"></i>';
        
        return `
            <tr class="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm">
                <td class="p-4 font-bold">${i.title}</td>
                <td class="p-4 uppercase text-blue-500 font-black text-[10px]">${i.cat}</td>
                <td class="p-4">${mediaIcon}</td>
                <td class="p-4 text-right">
                    <button onclick="editItem(${i.id})" class="text-blue-500 mr-3 hover:text-blue-700" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteItem(${i.id})" class="text-red-500 hover:text-red-700" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function createCard(item, searchTerm = '') {
    let mediaBadge = '';
    if (item.mediaType === 'image') {
        mediaBadge = '<span class="ml-2 text-[8px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">IMG</span>';
    } else if (item.mediaType === 'youtube') {
        mediaBadge = '<span class="ml-2 text-[8px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full">YT</span>';
    } else if (item.mediaType === 'video') {
        mediaBadge = '<span class="ml-2 text-[8px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">VID</span>';
    }
    
    // Highlight title if search term exists
    let titleHtml = item.title;
    if (searchTerm) {
        titleHtml = highlightText(item.title, searchTerm);
    }
    
    return `
        <div class="search-result-item bg-white dark:bg-darkCard p-8 rounded-[2.5rem] shadow-sm border dark:border-slate-800 hover:shadow-2xl transition group relative overflow-hidden cursor-pointer" onclick="showDetailPage(${item.id})">
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition"><i class="fas fa-wrench text-4xl"></i></div>
            <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-black bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">${item.cat}</span>
                ${mediaBadge}
            </div>
            <h4 class="text-xl font-extrabold mb-3 group-hover:text-blue-600 transition">${titleHtml}</h4>
            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed italic line-clamp-3">${item.desc.substring(0, 100)}...</p>
            
            ${item.mediaType === 'image' && item.mediaData ? 
                `<img src="${item.mediaData}" alt="${item.title}" class="mt-4 w-full h-32 object-cover rounded-xl opacity-80 group-hover:opacity-100 transition">` : ''}
            
            <div class="mt-6 flex justify-between items-center text-xs">
                <span class="text-slate-400">
                    <i class="fas fa-calendar-alt mr-1"></i>
                    ${item.date || 'N/A'}
                </span>
                <span class="text-blue-500 font-bold group-hover:translate-x-2 transition">
                    BACA LENGKAP <i class="fas fa-arrow-right ml-1"></i>
                </span>
            </div>
        </div>
    `;
}