const PageEvent = `
<!-- ── App Header ── -->
    <header id="app-header-event">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            <div class="logo" onclick="navigateTo('home')">
                <img src="assets/images/logo.jpeg" alt="Sparing-In" class="logo-img">
                <span class="logo-text">SPARING-IN</span>
            </div>
        </div>
        <nav class="header-nav">
            <a class="nav-link" onclick="navigateTo('home')">Beranda</a>
            <a class="nav-link" onclick="navigateTo('booking')">Booking Lapangan</a>
            <a class="nav-link" onclick="navigateTo('cari-lawan')">Cari Lawan</a>
            <a class="nav-link active" onclick="navigateTo('event')">Event</a>
            <a class="nav-link" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name-event">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar-event">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <div style="padding: 100px; text-align: center; color: white;">
        <h2 style="font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--accent), #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Fitur Event</h2>
        <p style="color: var(--text-secondary); font-size: 1.1rem;">Segera Hadir! Fitur ini sedang dalam tahap pengembangan.</p>
    </div>
`;
