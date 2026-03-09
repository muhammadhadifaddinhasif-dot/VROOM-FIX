// Detail Page Functions
function showDetailPage(itemId) {
    const item = db.find(i => i.id == itemId);
    if (!item) return;
    
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-category').textContent = item.cat;
    document.getElementById('detail-date').textContent = item.date || 'Tidak ditentukan';
    
    const formattedDesc = item.desc.replace(/\n/g, '<br>');
    document.getElementById('detail-description').innerHTML = formattedDesc;
    
    document.getElementById('detail-tools').innerHTML = `<p>${item.tools || 'Bergantung pada masalah spesifik. Biasanya termasuk alat asas seperti screwdriver, wrench, dan alat keselamatan.'}</p>`;
    document.getElementById('detail-time').innerHTML = `<p>${item.time || '30 minit - 2 jam (bergantung pada pengalaman)'}</p>`;
    
    const mediaContainer = document.getElementById('detail-media');
    mediaContainer.innerHTML = '';
    
    if (item.mediaType && item.mediaData && item.mediaType !== 'none') {
        if (item.mediaType === 'image') {
            mediaContainer.innerHTML = `
                <div class="mb-8">
                    <h4 class="text-lg font-bold mb-4 flex items-center gap-3">
                        <i class="fas fa-image text-blue-500"></i>
                        <span>Gambar Rujukan</span>
                    </h4>
                    <img src="${item.mediaData}" alt="${item.title}" class="w-full h-auto rounded-2xl shadow-lg media-preview">
                </div>
            `;
        } else if (item.mediaType === 'youtube') {
            const videoId = extractYouTubeId(item.mediaData);
            mediaContainer.innerHTML = `
                <div class="mb-8">
                    <h4 class="text-lg font-bold mb-4 flex items-center gap-3">
                        <i class="fab fa-youtube text-red-500"></i>
                        <span>Video Tutorial</span>
                    </h4>
                    <div class="video-container rounded-2xl overflow-hidden shadow-lg">
                        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            `;
        } else if (item.mediaType === 'video') {
            mediaContainer.innerHTML = `
                <div class="mb-8">
                    <h4 class="text-lg font-bold mb-4 flex items-center gap-3">
                        <i class="fas fa-video text-blue-500"></i>
                        <span>Video Demonstrasi</span>
                    </h4>
                    <div class="video-container rounded-2xl overflow-hidden shadow-lg">
                        <video controls class="w-full h-full">
                            <source src="${item.mediaData}" type="video/mp4">
                            Browser anda tidak support video tag.
                        </video>
                    </div>
                </div>
            `;
        }
    }
    
    const iconMap = {
        maintenance: 'fa-oil-can',
        problems: 'fa-exclamation-triangle',
        tools: 'fa-toolbox',
        safety: 'fa-user-shield',
        habits: 'fa-gauge-high',
        knowledge: 'fa-book'
    };
    document.getElementById('detail-icon').className = `fas ${iconMap[item.cat] || 'fa-wrench'} text-6xl opacity-20`;
    
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-nav'));
    document.getElementById('page-detail').classList.add('active-section');
    document.getElementById('header-title').innerText = 'Detail Tutorial';
}