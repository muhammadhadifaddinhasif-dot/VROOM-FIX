// Admin Functions
function openAdmin() {
    if(isAdm) showPage('admin');
    else document.getElementById('login-modal').classList.remove('hidden');
}

function processLogin() {
    if(document.getElementById('adm-user').value === 'admin' && document.getElementById('adm-pass').value === '1234') {
        isAdm = true;
        sessionStorage.setItem('isAdm', 'true');
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('logout-btn').classList.remove('hidden');
        showPage('admin');
    } else alert("Salah!");
}

function processLogout() {
    isAdm = false; 
    sessionStorage.removeItem('isAdm');
    document.getElementById('logout-btn').classList.add('hidden');
    showPage('home');
}

function closeLogin() { 
    document.getElementById('login-modal').classList.add('hidden'); 
}

function handleSave() {
    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('inp-title').value.trim();
    const cat = document.getElementById('inp-cat').value;
    const desc = document.getElementById('inp-desc').value.trim();
    const tools = document.getElementById('inp-tools').value.trim();
    const time = document.getElementById('inp-time').value.trim();

    if(!title || !desc) {
        alert("Isi title dan description!");
        return;
    }

    let mediaType = currentMediaType;
    let mediaData = '';
    
    if (currentMediaType === 'image') {
        if (uploadedImage) {
            mediaData = uploadedImage;
        } else {
            if (id) {
                const existingItem = db.find(i => i.id == id);
                if (existingItem && existingItem.mediaType === 'image' && existingItem.mediaData) {
                    mediaData = existingItem.mediaData;
                } else {
                    mediaType = 'none';
                }
            } else {
                mediaType = 'none';
            }
        }
    } else if (currentMediaType === 'youtube') {
        mediaData = document.getElementById('inp-youtube').value.trim();
        if (!mediaData) mediaType = 'none';
    } else if (currentMediaType === 'video') {
        mediaData = document.getElementById('inp-video').value.trim();
        if (!mediaData) mediaType = 'none';
    }

    if(id) {
        const idx = db.findIndex(i => i.id == id);
        if (idx !== -1) {
            db[idx] = { 
                ...db[idx],
                title, 
                cat, 
                desc,
                tools: tools || 'Not specified',
                time: time || 'Not specified',
                mediaType,
                mediaData,
                date: new Date().toISOString().split('T')[0]
            };
        }
    } else {
        const newItem = { 
            id: Date.now(), 
            title, 
            cat, 
            desc,
            tools: tools || 'Not specified',
            time: time || 'Not specified',
            mediaType,
            mediaData,
            date: new Date().toISOString().split('T')[0]
        };
        db.unshift(newItem);
    }

    localStorage.setItem('carMasterDB', JSON.stringify(db));
    clearForm();
    renderAdmin();
    renderHome();
    alert("Berjaya disimpan!");
}

function deleteItem(id) {
    if(confirm("SERIUS NAK PADAM?")) {
        db = db.filter(i => i.id !== id);
        localStorage.setItem('carMasterDB', JSON.stringify(db));
        renderAdmin();
        renderHome();
        alert("Item telah dipadam!");
    }
}

function editItem(id) {
    const item = db.find(i => i.id == id);
    
    if (!item) {
        alert("Item tidak ditemui!");
        return;
    }
    
    isEditing = true;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('inp-title').value = item.title || '';
    document.getElementById('inp-cat').value = item.cat || 'maintenance';
    document.getElementById('inp-desc').value = item.desc || '';
    document.getElementById('inp-tools').value = item.tools || '';
    document.getElementById('inp-time').value = item.time || '';
    
    const mediaType = item.mediaType || 'none';
    setMediaType(mediaType);
    
    if (mediaType === 'image' && item.mediaData) {
        uploadedImage = item.mediaData;
        const previewImage = document.getElementById('preview-image');
        const imagePreview = document.getElementById('image-preview');
        if (previewImage) previewImage.src = item.mediaData;
        if (imagePreview) imagePreview.classList.remove('hidden');
    } else if (mediaType === 'youtube' && item.mediaData) {
        document.getElementById('inp-youtube').value = item.mediaData;
        const videoId = extractYouTubeId(item.mediaData);
        const youtubePreview = document.getElementById('youtube-preview');
        const previewYoutube = document.getElementById('preview-youtube');
        if (previewYoutube) previewYoutube.src = `https://www.youtube.com/embed/${videoId}`;
        if (youtubePreview) youtubePreview.classList.remove('hidden');
    } else if (mediaType === 'video' && item.mediaData) {
        document.getElementById('inp-video').value = item.mediaData;
    }
    
    document.getElementById('btn-save').innerText = "KEMASKINI DATA";
    document.getElementById('btn-cancel').classList.remove('hidden');
    document.getElementById('admin-form').classList.add('edit-mode');
    
    document.getElementById('admin-form').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    clearForm();
    document.getElementById('btn-cancel').classList.add('hidden');
    document.getElementById('admin-form').classList.remove('edit-mode');
}

function clearForm() {
    document.getElementById('edit-id').value = '';
    document.getElementById('inp-title').value = '';
    document.getElementById('inp-desc').value = '';
    document.getElementById('inp-tools').value = '';
    document.getElementById('inp-time').value = '';
    document.getElementById('btn-save').innerText = "SIMPAN DATA";
    document.getElementById('btn-cancel').classList.add('hidden');
    document.getElementById('admin-form').classList.remove('edit-mode');
    
    setMediaType('none');
    uploadedImage = null;
    document.getElementById('file-input').value = '';
    document.getElementById('inp-youtube').value = '';
    document.getElementById('inp-video').value = '';
    
    document.getElementById('image-preview')?.classList.add('hidden');
    document.getElementById('youtube-preview')?.classList.add('hidden');
}