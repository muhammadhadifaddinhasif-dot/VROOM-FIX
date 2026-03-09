// Media Functions
function setMediaType(type) {
    currentMediaType = type;
    
    ['none', 'image', 'youtube', 'video'].forEach(t => {
        const btn = document.getElementById(`media-${t}`);
        if (btn) {
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        }
    });
    
    const selectedBtn = document.getElementById(`media-${type}`);
    if (selectedBtn) {
        selectedBtn.classList.remove('bg-slate-200', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        selectedBtn.classList.add('bg-blue-600', 'text-white');
    }
    
    const mediaInputs = document.getElementById('media-inputs');
    if (mediaInputs) {
        if (type === 'none') {
            mediaInputs.classList.add('hidden');
        } else {
            mediaInputs.classList.remove('hidden');
            
            ['image', 'youtube', 'video'].forEach(t => {
                const input = document.getElementById(`${t}-input`);
                const preview = document.getElementById(`${t}-preview`);
                if (input) input.classList.add('hidden');
                if (preview) preview.classList.add('hidden');
            });
            
            const selectedInput = document.getElementById(`${type}-input`);
            if (selectedInput) selectedInput.classList.remove('hidden');
        }
    }
    
    if (type !== 'image') {
        uploadedImage = null;
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        alert("File terlalu besar! Maksimum 5MB.");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result;
        const previewImage = document.getElementById('preview-image');
        const imagePreview = document.getElementById('image-preview');
        
        if (previewImage) {
            previewImage.src = uploadedImage;
        }
        if (imagePreview) {
            imagePreview.classList.remove('hidden');
        }
    }
    reader.readAsDataURL(file);
}

function removeImage() {
    uploadedImage = null;
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    
    if (fileInput) fileInput.value = '';
    if (imagePreview) imagePreview.classList.add('hidden');
}

function extractYouTubeId(url) {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
}