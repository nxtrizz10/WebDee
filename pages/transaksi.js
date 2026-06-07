const PageTransaksi = `
<!-- ── App Header ── -->
    <header id="app-header-transaksi">
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
            <a class="nav-link" onclick="navigateTo('event')">Event</a>
            <a class="nav-link active" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name-transaksi">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar-transaksi">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <div class="page-content" style="max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
            <button onclick="navigateTo('home')" style="background: none; border: 1px solid var(--border); color: #fff; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">← Kembali</button>
            <h1 style="margin: 0; font-size: 1.8rem;">Riwayat Transaksi</h1>
        </div>
        
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Daftar semua invoice pemesanan lapangan Anda.</p>

        <div id="transaksi-list" style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Akan diisi oleh JS -->
        </div>
    </div>
`;
