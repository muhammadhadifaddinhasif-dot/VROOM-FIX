// Initialize on load
window.onload = () => {
    renderHome();
    if(isAdm) {
        document.getElementById('logout-btn').classList.remove('hidden');
    }
    
    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }
    
    setMediaType('none');
    
    // Event listeners
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') processChat();
    });
    
    document.getElementById('inp-youtube')?.addEventListener('input', function(e) {
        const url = e.target.value;
        if (url) {
            const videoId = extractYouTubeId(url);
            const preview = document.getElementById('preview-youtube');
            const youtubePreview = document.getElementById('youtube-preview');
            if (videoId && preview) {
                preview.src = `https://www.youtube.com/embed/${videoId}`;
            }
            if (youtubePreview) {
                youtubePreview.classList.remove('hidden');
            }
        }
    });
    
    // Add search event listeners
    document.getElementById('home-search')?.addEventListener('input', handleHomeSearch);
    document.getElementById('category-search')?.addEventListener('input', handleCategorySearch);
};