const PageProfile = `
<!-- ── App Header ── -->
    <header id="app-header-profile">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            <div class="logo" onclick="navigateTo('home')">
                <img src="assets/images/logo.jpeg" alt="Sparing-In" class="logo-img">
                <span class="logo-text">SPARING-IN</span>
            </div>
        </div>
        <nav class="header-nav profile-nav">
            <a class="nav-link" onclick="navigateTo('home')">Beranda</a>
            <a class="nav-link" onclick="navigateTo('booking')">Booking Lapangan</a>
            <a class="nav-link" onclick="navigateTo('cari-lawan')">Cari Lawan</a>
            <a class="nav-link" onclick="navigateTo('event')">Event</a>
            <a class="nav-link" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" style="border: 1px solid var(--border); padding: 0.3rem; border-radius: var(--radius-full);">
                <div class="user-avatar" id="header-user-avatar-profile">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <div class="profile-container">
        <!-- Back Button -->
        <div class="back-bar" style="border:none; margin-bottom: 1rem; padding: 0;">
            <button class="back-btn" onclick="navigateTo('home')">← Kembali</button>
        </div>
        
        <!-- Header -->
        <div class="profile-header">
            <div style="position: relative; display: inline-block;">
                <div class="profile-avatar" id="profile-avatar-display" onclick="document.getElementById('profile-upload').click()" style="cursor: pointer; background-size: cover; background-position: center; transition: 0.3s;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">AR</div>
                <div class="edit-avatar-icon" onclick="document.getElementById('profile-upload').click()" style="position: absolute; bottom: 0; right: 0; background: var(--primary); color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 3px solid var(--bg-surface); font-size: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); transition: 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">📷</div>
            </div>
            <input type="file" id="profile-upload" accept="image/*" style="display: none;" onchange="handleProfileUpload(event)">
            <div class="profile-name" id="profile-name-display">AHMAD RIZKY</div>
            <div class="profile-username">@ahmadrizky • Jakarta</div>
            <div class="profile-tags">
                <span class="profile-tag tag-green">Intermediate</span>
                <span class="profile-tag tag-blue">Futsal</span>
            </div>
        </div>

        <!-- Stats -->
        <div class="profile-stats">
            <div class="stat-box">
                <div class="stat-val">48</div>
                <div class="stat-label">Match</div>
            </div>
            <div class="stat-box">
                <div class="stat-val blue">72%</div>
                <div class="stat-label">Win Rate</div>
            </div>
            <div class="stat-box">
                <div class="stat-val white">Lv.12</div>
                <div class="stat-label">Level</div>
            </div>
        </div>

        <!-- Achievements -->
        <div class="section-title">🏅 Achievements</div>
        <div class="achievements-grid">
            <div class="achievement-card">
                <div class="achievement-icon">🔥</div>
                <div class="achievement-name">10 Win Streak</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-name">Juara 1</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">⭐</div>
                <div class="achievement-name">MVP</div>
            </div>
            <div class="achievement-card">
                <div class="achievement-icon">💪</div>
                <div class="achievement-name">50 Match</div>
            </div>
        </div>

        <!-- History -->
        <div class="section-title">🏆 RIWAYAT PERTANDINGAN</div>
        <div class="history-list">
            <div class="history-item">
                <div class="history-left">
                    <div class="history-icon">⚽</div>
                    <div class="history-info">
                        <div class="history-title">Warriors vs Thunder</div>
                        <div class="history-meta">Win 3-1 • 20 Jan</div>
                    </div>
                </div>
                <div class="history-badge win">Win</div>
            </div>
            <div class="history-item">
                <div class="history-left">
                    <div class="history-icon">🏀</div>
                    <div class="history-info">
                        <div class="history-title">Open Run Basket</div>
                        <div class="history-meta">Loss 18-21 • 18 Jan</div>
                    </div>
                </div>
                <div class="history-badge loss">Loss</div>
            </div>
        </div>

        <!-- Actions -->
        <div class="profile-actions">
            <button class="btn btn-secondary">👥 MY TEAM</button>
            <button class="btn btn-secondary">📊 TRACKING</button>
        </div>
    </div>
`;
