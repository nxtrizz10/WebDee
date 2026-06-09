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
        { id: 'm1', title: 'Fun Futsal Night', sport: 'Futsal', sportRaw: 'futsal', sportIcon: '⚽', location: 'AM Bintaro Court', city: 'Tangerang', date: 'Sabtu, 13 Jun 2026', time: '20:00 - 22:00 WIB', level: ['Beginner', 'Newbie'], price: 35000, currentPlayers: 4, maxPlayers: 14, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
        { id: 'm2', title: 'Sunday Morning Kick', sport: 'Mini Soccer', sportRaw: 'minisoccer', sportIcon: '⚽', location: 'Pancoran Soccer Field', city: 'Jakarta Selatan', date: 'Minggu, 14 Jun 2026', time: '06:00 - 08:00 WIB', level: ['Intermediate'], price: 65000, currentPlayers: 2, maxPlayers: 20, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
        { id: 'm3', title: 'Smash Mania', sport: 'Badminton', sportRaw: 'badmin', sportIcon: '🏸', location: 'Taufik Hidayat Arena', city: 'Jakarta Timur', date: 'Rabu, 17 Jun 2026', time: '19:00 - 21:00 WIB', level: ['Beginner', 'Intermediate'], price: 45000, currentPlayers: 1, maxPlayers: 8, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
        { id: 'm4', title: 'Padel Kuy', sport: 'Padel', sportRaw: 'padel', sportIcon: '🎾', location: 'Centro Padel Bintaro', city: 'Tangerang', date: 'Jumat, 19 Jun 2026', time: '18:00 - 20:00 WIB', level: ['Newbie'], price: 75000, currentPlayers: 2, maxPlayers: 4, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'm5', title: 'Basket Sore', sport: 'Basket', sportRaw: 'basket', sportIcon: '🏀', location: 'BXHoops Basketball', city: 'Tangerang', date: 'Selasa, 16 Jun 2026', time: '16:00 - 18:00 WIB', level: ['Intermediate'], price: 50000, currentPlayers: 5, maxPlayers: 10, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
    ];

    let mabarEvents = JSON.parse(localStorage.getItem('sparingin_mabar_events_v2'));
    if (!mabarEvents) {
        mabarEvents = defaultMabarEvents;
        localStorage.setItem('sparingin_mabar_events_v2', JSON.stringify(mabarEvents));
    }
