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

    // Matchmaking Mock Data
    const matchmakingDB = [
        { id: 'm1', hostName: 'FC Garuda', sport: 'Futsal', sportIcon: '⚽', location: 'Arena A Sports Center', city: 'Jakarta', date: '25 Jun 2026', time: '19:00', level: 'Intermediate', type: 'individu', currentPlayers: 8, maxPlayers: 10 },
        { id: 'm2', hostName: 'Bintaro Hoops', sport: 'Basket', sportIcon: '🏀', location: 'Bintaro Court', city: 'Tangerang', date: '26 Jun 2026', time: '20:00', level: 'Beginner', type: 'individu', currentPlayers: 3, maxPlayers: 10 },
        { id: 'm3', hostName: 'Smash Bros', sport: 'Badminton', sportIcon: '🏸', location: 'Gor Ciledug', city: 'Tangerang', date: '27 Jun 2026', time: '16:00', level: 'Advanced', type: 'tim', currentPlayers: 1, maxPlayers: 1 },
        { id: 'm4', hostName: 'Tangerang Padel', sport: 'Padel', sportIcon: '🎾', location: 'Padel Ciledug Raya', city: 'Tangerang', date: '28 Jun 2026', time: '08:00', level: 'Intermediate', type: 'individu', currentPlayers: 2, maxPlayers: 4 },
        { id: 'm5', hostName: 'Jaksel Kicker', sport: 'Futsal', sportIcon: '⚽', location: 'Pancoran Soccer', city: 'Jakarta', date: '29 Jun 2026', time: '21:00', level: 'Beginner', type: 'tim', currentPlayers: 1, maxPlayers: 1 }
    ];
