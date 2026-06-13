const demoAccounts = {
        'admin': { password: 'admin123',  name: 'Admin' },
        'lando':     { password: 'lando123',  name: 'Lando' },
        'christopher':      { password: 'christopher123',   name: 'Christopher' }
    };

const venuesDB = [
        // ─── REGION CILEDUG ───
        { id: 'v1', name: 'Puri Beta Futsal', sport: 'futsal', lat: -6.230, lng: 106.720, loc: 'Puri Beta, Ciledug', rating: 4.6, price: 130000, grad: 'linear-gradient(135deg, #0D5B2B, #16A34A)', emoji: '⚽', region: 'ciledug' },
        { id: 'v2', name: 'CBD Ciledug Sport', sport: 'futsal basket volly badminton', lat: -6.225, lng: 106.710, loc: 'CBD Ciledug', rating: 4.5, price: 150000, grad: 'linear-gradient(135deg, #15803D, #22C55E)', emoji: '🏟️', region: 'ciledug' },
        { id: 'v3', name: 'Gor Bulutangkis Ciledug', sport: 'badminton', lat: -6.235, lng: 106.715, loc: 'Ciledug Indah', rating: 4.8, price: 60000, grad: 'linear-gradient(135deg, #1f2937, #374151)', emoji: '🏸', region: 'ciledug' },
        { id: 'v4', name: 'Padel Ciledug Raya', sport: 'padel', lat: -6.238, lng: 106.725, loc: 'Jl. Ciledug Raya', rating: 4.9, price: 200000, grad: 'linear-gradient(135deg, #0D3B21, #15803D)', emoji: '🎾', region: 'ciledug' },
        
        // ─── REGION UPJ / BINTARO ───
        // Futsal
        { id: 'v5', name: 'Kick Off Futsal Bintaro', sport: 'futsal', lat: -6.270, lng: 106.715, loc: 'Sektor 9, Bintaro', rating: 4.7, price: 180000, grad: 'linear-gradient(135deg, #0D5B2B, #16A34A)', emoji: '⚽', region: 'upj' },
        { id: 'v6', name: 'MM Futsal Bintaro', sport: 'futsal', lat: -6.275, lng: 106.720, loc: 'Bulevar Bintaro', rating: 4.5, price: 150000, grad: 'linear-gradient(135deg, #0D5B2B, #16A34A)', emoji: '⚽', region: 'upj' },
        { id: 'v7', name: 'Super Shoot Futsal', sport: 'futsal', lat: -6.280, lng: 106.718, loc: 'Bintaro Jaya', rating: 4.6, price: 140000, grad: 'linear-gradient(135deg, #0D5B2B, #16A34A)', emoji: '⚽', region: 'upj' },
        
        // Basket
        { id: 'v8', name: 'BXHoops Basketball', sport: 'basket', lat: -6.285, lng: 106.728, loc: 'Bintaro Xchange', rating: 4.9, price: 250000, grad: 'linear-gradient(135deg, #15803D, #22C55E)', emoji: '🏀', region: 'upj' },
        { id: 'v9', name: 'AM Bintaro Court', sport: 'basket', lat: -6.280, lng: 106.725, loc: 'Sektor 2, Bintaro', rating: 4.8, price: 150000, grad: 'linear-gradient(135deg, #15803D, #22C55E)', emoji: '🏀', region: 'upj' },
        { id: 'v10', name: 'British School Jakarta', sport: 'basket', lat: -6.290, lng: 106.700, loc: 'Parigi, Bintaro', rating: 4.8, price: 300000, grad: 'linear-gradient(135deg, #15803D, #22C55E)', emoji: '🏀', region: 'upj' },
        
        // Badminton
        { id: 'v11', name: 'GOR PB Jaya Raya', sport: 'badminton', lat: -6.286, lng: 106.732, loc: 'Sawah Baru, Bintaro', rating: 4.9, price: 80000, grad: 'linear-gradient(135deg, #1f2937, #374151)', emoji: '🏸', region: 'upj' },
        { id: 'v12', name: 'Chandra Wijaya IBC', sport: 'badminton', lat: -6.275, lng: 106.690, loc: 'Serpong Bintaro', rating: 4.8, price: 100000, grad: 'linear-gradient(135deg, #1f2937, #374151)', emoji: '🏸', region: 'upj' },
        { id: 'v13', name: 'Gor Nawa Tunggal', sport: 'badminton', lat: -6.282, lng: 106.715, loc: 'Bintaro Jaya', rating: 4.5, price: 60000, grad: 'linear-gradient(135deg, #1f2937, #374151)', emoji: '🏸', region: 'upj' },
        { id: 'v14', name: 'Gor Oscar', sport: 'badminton', lat: -6.278, lng: 106.722, loc: 'Bintaro Sektor 7', rating: 4.6, price: 50000, grad: 'linear-gradient(135deg, #1f2937, #374151)', emoji: '🏸', region: 'upj' },
        
        // Padel
        { id: 'v15', name: 'Centro Padel Bintaro', sport: 'padel', lat: -6.278, lng: 106.718, loc: 'Bintaro Jaya', rating: 4.9, price: 250000, grad: 'linear-gradient(135deg, #0D3B21, #15803D)', emoji: '🎾', region: 'upj' },
        { id: 'v16', name: 'Nako Padel Club', sport: 'padel', lat: -6.295, lng: 106.725, loc: 'Sawah Lama, Bintaro', rating: 4.8, price: 200000, grad: 'linear-gradient(135deg, #0D3B21, #15803D)', emoji: '🎾', region: 'upj' },
        { id: 'v17', name: 'Padel Core Bintaro', sport: 'padel', lat: -6.290, lng: 106.720, loc: 'Ciputat, Bintaro', rating: 4.7, price: 220000, grad: 'linear-gradient(135deg, #0D3B21, #15803D)', emoji: '🎾', region: 'upj' }
    ];

    // Mabar Events Data
    const defaultMabarEvents = [
        // CILEDUG
        { id: 'm_cil_1', title: 'Futsal Santai Ciledug', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'CBD Ciledug Sport', city: 'Ciledug', date: 'Jumat, 19 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Newbie'], price: 25000, currentPlayers: 5, maxPlayers: 12, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_cil_2', title: 'Ciledug Futsal League', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'CBD Ciledug Sport', city: 'Ciledug', date: 'Sabtu, 20 Jun 2026', time: '16:00 - 18:00 WIB', level: ['Beginner'], price: 30000, currentPlayers: 8, maxPlayers: 14, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_cil_3', title: 'Pro Futsal Ciledug', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'CBD Ciledug Sport', city: 'Ciledug', date: 'Minggu, 21 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Intermediate'], price: 35000, currentPlayers: 9, maxPlayers: 10, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_cil_3b', title: 'Futsal Malam Ciledug', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Ciledug Arena', city: 'Ciledug', date: 'Selasa, 23 Jun 2026', time: '21:00 - 23:00 WIB', level: ['Intermediate'], price: 35000, currentPlayers: 5, maxPlayers: 12, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_cil_4', title: 'Basket Sore Ciledug', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'GOR Ciledug', city: 'Ciledug', date: 'Kamis, 18 Jun 2026', time: '16:00 - 18:00 WIB', level: ['Newbie', 'Beginner'], price: 30000, currentPlayers: 4, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { id: 'm_cil_4b', title: 'Basket Ciledug Pro', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'GOR Ciledug', city: 'Ciledug', date: 'Sabtu, 20 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Intermediate'], price: 35000, currentPlayers: 6, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { id: 'm_cil_6', title: 'Badminton Ciledug', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Ciledug Badmin Hall', city: 'Ciledug', date: 'Rabu, 24 Jun 2026', time: '19:00 - 22:00 WIB', level: ['Intermediate'], price: 40000, currentPlayers: 2, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm_cil_7', title: 'Padel Ciledug', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Ciledug Padel Center', city: 'Ciledug', date: 'Jumat, 26 Jun 2026', time: '17:00 - 19:00 WIB', level: ['Intermediate'], price: 90000, currentPlayers: 1, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },

        // BINTARO
        { id: 'm_bin_1', title: 'Fun Futsal Night', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'AM Bintaro Court', city: 'Bintaro', date: 'Sabtu, 13 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Beginner', 'Newbie'], price: 35000, currentPlayers: 4, maxPlayers: 14, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_bin_1b', title: 'Futsal Bintaro Inter', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'AM Bintaro Court', city: 'Bintaro', date: 'Minggu, 14 Jun 2026', time: '16:00 - 18:00 WIB', level: ['Intermediate'], price: 40000, currentPlayers: 8, maxPlayers: 14, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_bin_4', title: 'Padel Kuy', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Centro Padel Bintaro', city: 'Bintaro', date: 'Jumat, 19 Jun 2026', time: '18:00 - 20:00 WIB', level: ['Newbie'], price: 75000, currentPlayers: 2, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm_bin_4b', title: 'Padel Bintaro Jago', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Padel Core Bintaro', city: 'Bintaro', date: 'Rabu, 24 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Intermediate'], price: 85000, currentPlayers: 2, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm_bin_5', title: 'Basket Sore Bintaro', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'BXHoops Basketball', city: 'Bintaro', date: 'Rabu, 17 Jun 2026', time: '16:00 - 18:00 WIB', level: ['Intermediate'], price: 50000, currentPlayers: 5, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { id: 'm_bin_6', title: 'Bintaro Badminton', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Bintaro Badmin Center', city: 'Bintaro', date: 'Kamis, 18 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Beginner'], price: 45000, currentPlayers: 3, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm_bin_7', title: 'Badmin Inter Bintaro', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Bintaro Badmin Center', city: 'Bintaro', date: 'Sabtu, 20 Jun 2026', time: '08:00 - 11:00 WIB', level: ['Intermediate'], price: 50000, currentPlayers: 4, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },

        // JAKARTA SELATAN (JAKSEL)
        { id: 'm_js_2', title: 'Jaksel Futsal Fun', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Kuningan Futsal', city: 'Jakarta Selatan', date: 'Rabu, 17 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Newbie'], price: 40000, currentPlayers: 6, maxPlayers: 15, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_js_2b', title: 'Futsal Pro Jaksel', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Kuningan Futsal', city: 'Jakarta Selatan', date: 'Kamis, 18 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Intermediate'], price: 45000, currentPlayers: 10, maxPlayers: 15, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_js_3', title: 'Jaksel Basket Club', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'Bulungan Sport Hall', city: 'Jakarta Selatan', date: 'Kamis, 25 Jun 2026', time: '17:00 - 19:00 WIB', level: ['Beginner', 'Intermediate'], price: 45000, currentPlayers: 3, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { id: 'm_js_6', title: 'Padel Kemang', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Kemang Padel', city: 'Jakarta Selatan', date: 'Jumat, 26 Jun 2026', time: '18:00 - 20:00 WIB', level: ['Intermediate'], price: 120000, currentPlayers: 1, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm_js_7', title: 'Badminton Jaksel Inter', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Cilandak Badmin', city: 'Jakarta Selatan', date: 'Senin, 15 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Intermediate'], price: 55000, currentPlayers: 2, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },

        // JAKARTA PUSAT
        { id: 'm_jp_1', title: 'Smash Mania', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Cempaka Putih Arena', city: 'Jakarta Pusat', date: 'Rabu, 17 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Beginner', 'Intermediate'], price: 45000, currentPlayers: 1, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm_jp_2', title: 'Senayan Night Badmin', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'GBK Arena Badminton', city: 'Jakarta Pusat', date: 'Sabtu, 20 Jun 2026', time: '20:00 - 23:00 WIB', level: ['Beginner'], price: 55000, currentPlayers: 1, maxPlayers: 6, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm_jp_3', title: 'Badminton Pro Jakpus', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'GBK Arena Badminton', city: 'Jakarta Pusat', date: 'Minggu, 21 Jun 2026', time: '16:00 - 19:00 WIB', level: ['Intermediate'], price: 60000, currentPlayers: 4, maxPlayers: 6, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm_jp_4', title: 'Padel Night Jakarta', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Padel Club Jakarta', city: 'Jakarta Pusat', date: 'Kamis, 25 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Intermediate'], price: 100000, currentPlayers: 2, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm_jp_5', title: 'Padel Newbie Jakpus', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Padel Club Jakarta', city: 'Jakarta Pusat', date: 'Sabtu, 27 Jun 2026', time: '08:00 - 10:00 WIB', level: ['Newbie'], price: 90000, currentPlayers: 1, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm_jp_6', title: 'Futsal Merdeka', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Monas Futsal', city: 'Jakarta Pusat', date: 'Senin, 15 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Beginner', 'Intermediate'], price: 35000, currentPlayers: 7, maxPlayers: 15, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm_jp_8', title: 'Basket Inter Jakpus', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'GOR Johar Baru', city: 'Jakarta Pusat', date: 'Jumat, 19 Jun 2026', time: '17:00 - 19:00 WIB', level: ['Intermediate'], price: 40000, currentPlayers: 5, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
    ];

    let mabarEvents = JSON.parse(localStorage.getItem('sparingin_mabar_events_v8'));
    if (!mabarEvents) {
        mabarEvents = defaultMabarEvents;
        localStorage.setItem('sparingin_mabar_events_v8', JSON.stringify(mabarEvents));
    }

    // Tournament Events Data
    const defaultTournamentEvents = [
        // FAVORITE / FEATURED (isFav: true)
        { id: 't_1', title: 'Ciledug Futsal Cup 2026', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'CBD Ciledug Sport', city: 'Ciledug', date: 'Sabtu, 15 Ags 2026', fee: 150000, prizePool: 2000000, currentSlots: 10, maxSlots: 16, organizer: 'Ciledug FA', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', isFav: true },
        { id: 't_2', title: 'Bintaro Basketball League', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'AM Bintaro Court', city: 'Bintaro', date: 'Minggu, 23 Ags 2026', fee: 200000, prizePool: 3000000, currentSlots: 5, maxSlots: 8, organizer: 'Bintaro Hoops', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', isFav: true },
        { id: 't_3', title: 'Open Badminton Bintaro', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'GOR PB Jaya Raya', city: 'Bintaro', date: 'Sabtu, 29 Ags 2026', fee: 50000, prizePool: 1000000, currentSlots: 14, maxSlots: 32, organizer: 'Jaya Raya', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', isFav: true },
        { id: 't_4', title: 'Jakarta Padel Master', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Centro Padel Bintaro', city: 'Jakarta Selatan', date: 'Minggu, 06 Sep 2026', fee: 100000, prizePool: 1500000, currentSlots: 8, maxSlots: 16, organizer: 'Padel Indo', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', isFav: true },
        { id: 't_5', title: 'Senayan Futsal Championship', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'GBK Arena', city: 'Jakarta Pusat', date: 'Minggu, 13 Sep 2026', fee: 350000, prizePool: 5000000, currentSlots: 20, maxSlots: 32, organizer: 'Jakarta Sport', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', isFav: true },

        // REGULAR (isFav: false)
        { id: 't_6', title: 'Puri Beta Weekend Futsal', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Puri Beta Futsal', city: 'Ciledug', date: 'Sabtu, 12 Sep 2026', fee: 100000, prizePool: 1000000, currentSlots: 4, maxSlots: 8, organizer: 'Puri Beta Club', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', isFav: false },
        { id: 't_7', title: 'Bintaro Xchange 3x3', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'BXHoops Basketball', city: 'Bintaro', date: 'Sabtu, 19 Sep 2026', fee: 150000, prizePool: 2500000, currentSlots: 12, maxSlots: 16, organizer: 'BXC Sports', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', isFav: false },
        { id: 't_8', title: 'Ciledug Indah Badmin Cup', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Gor Bulutangkis Ciledug', city: 'Ciledug', date: 'Minggu, 20 Sep 2026', fee: 40000, prizePool: 800000, currentSlots: 8, maxSlots: 16, organizer: 'Ciledug PB', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', isFav: false },
        { id: 't_9', title: 'Pondok Indah Padel Open', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Padel Ciledug Raya', city: 'Jakarta Selatan', date: 'Sabtu, 26 Sep 2026', fee: 150000, prizePool: 2000000, currentSlots: 4, maxSlots: 16, organizer: 'Jaksel Padel', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', isFav: false },
        { id: 't_10', title: 'Merdeka Basket League', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'GOR Johar Baru', city: 'Jakarta Pusat', date: 'Minggu, 27 Sep 2026', fee: 200000, prizePool: 2500000, currentSlots: 6, maxSlots: 8, organizer: 'Merdeka Sports', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', isFav: false },
        { id: 't_11', title: 'Serpong Badminton Series', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Chandra Wijaya IBC', city: 'Bintaro', date: 'Sabtu, 03 Okt 2026', fee: 75000, prizePool: 1500000, currentSlots: 20, maxSlots: 32, organizer: 'CW Club', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', isFav: false },
        { id: 't_12', title: 'Jaksel Futsal Battle', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'Kemang Futsal', city: 'Jakarta Selatan', date: 'Minggu, 04 Okt 2026', fee: 250000, prizePool: 3000000, currentSlots: 14, maxSlots: 16, organizer: 'Kemang FA', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', isFav: false }
    ];

    let tournamentEvents = JSON.parse(localStorage.getItem('sparingin_tournament_events_v2'));
    if (!tournamentEvents) {
        tournamentEvents = defaultTournamentEvents;
        localStorage.setItem('sparingin_tournament_events_v2', JSON.stringify(tournamentEvents));
    }
