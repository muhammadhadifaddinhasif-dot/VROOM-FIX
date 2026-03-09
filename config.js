// Data & Configuration
const langData = {
    en: { 
        nav_home: "Dashboard", nav_maint: "Maintenance", nav_prob: "Common Problems", 
        nav_tools: "Tools", nav_safety: "Safety", nav_habits: "Habits", 
        nav_know: "Knowledge", nav_admin: "Admin Center", 
        hero_t: "Mechanic in Your Pocket.", 
        hero_s: "Learn DIY car repair and maintenance with our 6 complete modules.", 
        btn_maps: "Find Workshops", latest_db: "Latest Tutorials",
        back_btn: "Back"
    },
    my: { 
        nav_home: "Utama", nav_maint: "Penyelenggaraan", nav_prob: "Masalah Lazim", 
        nav_tools: "Alatan", nav_safety: "Keselamatan", nav_habits: "Tabiat", 
        nav_know: "Pengetahuan", nav_admin: "Pusat Admin", 
        hero_t: "Mekanik Dalam Poket.", 
        hero_s: "Belajar repair dan jaga kereta secara DIY dengan 6 modul lengkap kami.", 
        btn_maps: "Cari Bengkel", latest_db: "Tutorial Terkini",
        back_btn: "Kembali"
    }
};

let currentLang = 'my';
let isChatOpen = false;
let lastPage = 'home';
let currentMediaType = 'none';
let uploadedImage = null;
let isEditing = false;

// Search State
let homeSearchTerm = '';
let categorySearchTerm = '';
let currentCategory = '';

// Database
let db = JSON.parse(localStorage.getItem('carMasterDB')) || [
    { 
        id: 1, 
        title: 'Check Minyak Hitam', 
        cat: 'maintenance', 
        desc: '1. Pastikan kereta sejuk (minimum 10 minit selepas matikan enjin).\n2. Cabut dipstick, lap dengan kain bersih.\n3. Masukkan balik dipstick sehingga penuh.\n4. Cabut semula dan periksa level minyak.\n5. Pastikan level berada antara tanda F (Full) dan L (Low).\n6. Jika rendah, tambah minyak yang sesuai dengan spesifikasi kereta anda.',
        date: '2024-01-15',
        mediaType: 'none',
        mediaData: '',
        tools: 'Dipstick, Kain Bersih, Minyak Engine',
        time: '10-15 minit'
    },
    // ... other default items
];

// Admin auth
let isAdm = sessionStorage.getItem('isAdm') === 'true';