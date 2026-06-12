const PageBeranda = `
<!-- ── App Header ── -->
    <header id="app-header">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            <div class="logo" onclick="navigateTo('home')">
                <img src="assets/images/logo.jpeg" alt="Sparing-In" class="logo-img">
                <span class="logo-text">SPARING-IN</span>
            </div>
        </div>
        <nav class="header-nav">
            <a class="nav-link active" onclick="navigateTo('home')">Beranda</a>
            <a class="nav-link" onclick="navigateTo('booking')">Booking Lapangan</a>
            <a class="nav-link" onclick="navigateTo('cari-lawan')">Cari Lawan</a>
            <a class="nav-link" onclick="navigateTo('event')">Event</a>
            <a class="nav-link" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <!-- ── Hero Section ── -->
    <section class="home-hero">
        <div class="home-hero-content">
            <span class="hero-badge">🔥 Platform Olahraga #1 Indonesia</span>
            <h1>Siap Bermain?<br>Booking <span>Lapangan</span> Sekarang!</h1>
            <p>Temukan lapangan olahraga terbaik, cari lawan sparing, dan buat event pertandingan dengan mudah di satu platform.</p>
            <div class="hero-actions">
                <button class="btn btn-primary btn-hero" onclick="navigateTo('booking')">🏟️ Booking Lapangan</button>
                <button class="btn btn-secondary btn-hero" onclick="void(0)">🤝 Cari Lawan</button>
            </div>
            <div class="hero-stats">
                <div class="stat-item"><strong>2,000+</strong><span>Lapangan</span></div>
                <div class="stat-divider"></div>
                <div class="stat-item"><strong>100+</strong><span>Kota</span></div>
                <div class="stat-divider"></div>
                <div class="stat-item"><strong>50,000+</strong><span>Pengguna</span></div>
            </div>
        </div>
    </section>

    <div class="home-container">
        <!-- Features Section -->
        <div class="section-header">
            <h2>Fitur Utama</h2>
            <p>Semua kebutuhan olahraga Anda dalam satu platform</p>
        </div>
        <div class="feature-grid">
            <div class="feature-card" onclick="navigateTo('booking')">
                <div class="feature-card-icon">🏟️</div>
                <h3>Booking Lapangan</h3>
                <p>Pesan lapangan olahraga favoritmu dengan cepat dan mudah. Pilih waktu, bayar, mainkan!</p>
            </div>
            <div class="feature-card" onclick="void(0)">
                <div class="feature-card-icon">🤝</div>
                <h3>Cari Partner & Lawan</h3>
                <p>Temukan lawan sparing atau teman main bareng di sekitarmu secara real-time.</p>
            </div>
            <div class="feature-card" onclick="void(0)">
                <div class="feature-card-icon">🏆</div>
                <h3>Buat Event Sparing</h3>
                <p>Kelola event dan pertandingan dengan fitur manajemen lengkap dan profesional.</p>
            </div>
        </div>

        <!-- Popular Venues -->
        <div class="section-header">
            <h2>Lapangan Populer</h2>
            <p id="user-location-text">Temukan lapangan olahraga terbaik di sekitar Anda</p>
        </div>
        
        <div class="home-filter-bar">
            <div class="home-filter-sports" id="home-sport-filters" style="width: 100%; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <button class="home-filter-btn active" onclick="filterHomeVenues('semua', this)">Semua</button>
                <button class="home-filter-btn" onclick="filterHomeVenues('futsal', this)">Futsal</button>
                <button class="home-filter-btn" onclick="filterHomeVenues('basket', this)">Basket</button>
                <button class="home-filter-btn" onclick="filterHomeVenues('badminton', this)">Badminton</button>
                <button class="home-filter-btn" onclick="filterHomeVenues('padel', this)">Padel</button>
            </div>
        </div>

        <div class="venue-grid" id="home-venue-grid">
            <!-- Dinamis diisi oleh JavaScript -->
        </div>
    </div>
`;
