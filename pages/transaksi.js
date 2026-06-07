const PageTransaksi = `
<!-- Transaksi App Header -->
    <header class="app-header" style="padding: 1rem 2rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface);">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            <div class="logo" onclick="navigateTo('home')" style="cursor: pointer; display: flex; align-items: center; gap: 0.75rem;">
                <img src="public/images/logo.jpeg" alt="Sparing-In" class="logo-img" style="height: 35px; border-radius: 4px;">
                <span class="logo-text" style="font-size: 1.25rem; font-weight: 900; letter-spacing: 1px; color: #FFF; font-style: italic;">SPARING-IN</span>
            </div>
        </div>
        <nav class="header-nav" style="display: flex; gap: 1.5rem;">
            <a class="nav-link" onclick="navigateTo('home')" style="text-decoration:none; color:var(--text-secondary); font-weight:600; font-size:0.95rem; cursor:pointer;">Beranda</a>
            <a class="nav-link" onclick="navigateTo('booking')" style="text-decoration:none; color:var(--text-secondary); font-weight:600; font-size:0.95rem; cursor:pointer;">Booking Lapangan</a>
            <a class="nav-link" onclick="void(0)" style="text-decoration:none; color:var(--text-secondary); font-weight:600; font-size:0.95rem; cursor:pointer;">Cari Lawan</a>
            <a class="nav-link" onclick="void(0)" style="text-decoration:none; color:var(--text-secondary); font-weight:600; font-size:0.95rem; cursor:pointer;">Event</a>
            <a class="nav-link active" onclick="navigateTo('transaksi')" style="text-decoration:none; color:var(--primary); font-weight:600; font-size:0.95rem; cursor:pointer;">Transaksi</a>
        </nav>
        <div class="header-right" style="display: flex; align-items: center; gap: 1rem;">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; display: flex; align-items: center; gap: 0.75rem; padding: 0.3rem 0.5rem 0.3rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--border); transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name-transaksi" style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar-transaksi" style="width: 30px; height: 30px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()" style="background: rgba(239, 68, 68, 0.1); color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 600; cursor: pointer;">Keluar</button>
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
