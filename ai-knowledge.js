// AI Knowledge Base
const aiKnowledge = {
    maintenance: {
        'minyak enjin': {
            title: "Cara Check & Tukar Minyak Enjin",
            steps: [
                "🚗 <b>Persediaan:</b> Pastikan kereta sejuk (minimum 10-15 minit selepas matikan enjin). Park di permukaan rata.",
                "🔧 <b>Check Level:</b> Cabut dipstick, lap bersih, masukkan balik, cabut lagi. Level patut antara F (Full) dan L (Low).",
                "🛢️ <b>Tambah Minyak:</b> Jika rendah, buka oil cap di atas enjin. Tambah minyak sedikit-sedikit. Jangan overfill!",
                "⚙️ <b>Tukar Minyak:</b> Untuk tukar minyak: 1) Panaskan enjin 5 minit 2) Buka oil drain plug 3) Tukar oil filter 4) Isi minyak baru.",
                "📝 <b>Tips:</b> Tukar minyak setiap 5,000-10,000 km. Gunakan minyak ikut spesifikasi manual kereta."
            ],
            tools: "Dipstick, Kain, Minyak Engine, Funnel, Oil Filter Wrench",
            time: "Check: 5 minit | Tukar: 30-60 minit"
        },
        'tayar': {
            title: "Penjagaan Tayar & Tire Pressure",
            steps: [
                "📏 <b>Check Pressure:</b> Gunakan tire pressure gauge. Check ketika tayar sejuk (sebelum drive).",
                "🎯 <b>Pressure Betul:</b> Ikut recommendation di sticker driver's door atau manual. Biasanya 30-35 PSI.",
                "👀 <b>Check Condition:</b> Periksa tread depth, sidewall cracks, uneven wear, atau benda asing.",
                "🔄 <b>Tire Rotation:</b> Rotate tayar setiap 10,000 km untuk wear yang sekata.",
                "⚠️ <b>Safety:</b> Jangan underinflate atau overinflate. Check spare tyre juga!"
            ],
            tools: "Tire Pressure Gauge, Air Compressor",
            time: "5-10 minit setiap bulan"
        },
        'aircond': {
            title: "Maintenance Aircond Kereta",
            steps: [
                "🌬️ <b>Bau:</b> Jika ada bau busuk, mungkin cabin air filter kotor. Tukar setiap 15,000-30,000 km.",
                "❄️ <b>Cooling:</b> Jika kurang sejuk, check refrigerant level. Mungkin perlu recharge.",
                "🔍 <b>Check Leaks:</b> Periksa hose dan connections untuk leaks. Staining atau oli tanda ada leak.",
                "💨 <b>Ventilation:</b> Pastikan vents tak tersumbat. Clean dengan compressed air jika perlu.",
                "🛠️ <b>Professional:</b> Untuk recharge refrigerant, lebih baik bawa ke bengkel."
            ],
            tools: "Cabin Air Filter, AC Gauge Set (untuk professional)",
            time: "Tukar filter: 15-30 minit"
        }
    },
    
    problems: {
        'tak start': {
            title: "Kereta Tak Start - Diagnosis & Solution",
            steps: [
                "🔋 <b>Check Battery:</b> Bunyi 'click-click'? Battery lemah. Try jump start atau charge battery.",
                "🔌 <b>Terminals:</b> Periksa terminal battery untuk karat. Bersihkan dengan baking soda + air.",
                "⛽ <b>Fuel:</b Ada minyak? Fuel pump working? Dengarkan bunyi 'hum' ketika on ignition.",
                "⚡ <b>Spark:</b> Spark plug masalah? Periksa ignition system jika engine crank tapi tak start.",
                "🚨 <b>Warning Lights:</b> Check dashboard untuk warning lights. Scan OBD untuk error codes."
            ],
            solution: "1) Try jump start 2) Check fuel 3) Scan error codes 4) Call mechanic jika masih tak start",
            emergency: "Jika stranded, call tow truck. Jangan cuba repair di roadside jika tak berpengalaman."
        },
        'overheating': {
            title: "Kereta Overheating - Emergency Handling",
            steps: [
                "🆘 <b>STOP Driving:</b> Jangan teruskan memandu! Overheat boleh rosakkan enjin teruk.",
                "🛑 <b>Turn Off:</b> Matikan enjin segera. Jangan buka radiator cap ketika panas!",
                "❄️ <b>Cool Down:</b> Biar kereta sejuk 30-60 minit. Buka hood untuk ventilation.",
                "💧 <b>Check Coolant:</b> Setelah sejuk, check coolant level di reservoir.",
                "🔍 <b>Leaks:</b> Periksa bawah kereta untuk coolant leaks. Check hose dan radiator.",
                "🚗 <b>Drive Carefully:</b> Jika coolant rendah, tambah (50/50 coolant + air). Drive perlahan ke bengkel."
            ],
            warning: "⚠️ JANGAN buka radiator cap ketika panas! Boleh menyebabkan serious burns!",
            prevention: "Check coolant level setiap bulan. Servis cooling system setiap 2 tahun."
        },
        'bunyi pelik': {
            title: "Diagnosis Bunyi Pelik Dari Kereta",
            steps: [
                "👂 <b>Identify Sound:</b> Di mana bunyi? Depan/belakang? Ketika brake/accelerate/turning?",
                "🔊 <b>Grinding:</b> Bunyi grinding ketika brake = brake pads habis. Tukar segera!",
                "🗣️ <b>Squealing:</b> Squeal ketika start atau aircond on = belt masalah.",
                "🔨 <b>Knocking:</b> Knocking sound dari enjin = serious engine problem. Check oil level.",
                "💨 <b>Hissing:</b> Hissing = vacuum leak atau exhaust leak.",
                "📝 <b>Note:</b> Rekod bila bunyi terjadi. Video untuk tunjuk mechanic."
            ],
            action: "Bunyi dari brakes? Check segera! Bunyi dari enjin? Check oil dan bawa check mechanic."
        }
    }
    // ... continue with other categories
};

const friendlyResponses = [
    "Hai boss! 😊 Apa khabar? Saya sedia membantu dengan apa-apa soalan kereta anda!",
    "Helo! Semoga hari anda ceria! Ada apa-apa nak tanya tentang maintenance kereta?",
    "Terima kasih boss! 😄 Sama-sama! Kalau ada apa-apa lagi, tanya je ya!",
    "Bagus! Teruskan minat dalam DIY kereta! 🛠️ Learning never stops!"
];

const carTips = [
    "💡 **Tip**: Check tire pressure sekurang-kurangnya sebulan sekali untuk jimat minyak dan keselamatan!",
    "🔧 **Reminder**: Tukar minyak enjin setiap 5,000-10,000 km bergantung pada jenis minyak dan driving condition.",
    "⚠️ **Safety**: Sentiasa gunakan jack stands apabila kerja bawah kereta. JACK BOTOL SAHAJA TIDAK SELAMAT!",
    // ... other tips
];