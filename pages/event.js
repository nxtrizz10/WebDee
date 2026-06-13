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
        <!-- Page Content -->
        <div class="mabar-container" style="margin-top: 2rem;">
            
            <!-- Filter Bar (City / Sport) - Similar to Mabar -->
            <div class="match-filter-bar">
                <div class="filter-dropdown">
                    <span>📍</span>
                    <select id="event-city-filter" onchange="filterEvents()">
                        <option value="all">Semua Kota</option>
                        <option value="Ciledug">Ciledug</option>
                        <option value="Bintaro">Bintaro</option>
                        <option value="Jakarta Selatan">Jakarta Selatan</option>
                        <option value="Jakarta Pusat">Jakarta Pusat</option>
                    </select>
                </div>
                <div class="filter-dropdown">
                    <span>🏅</span>
                    <select id="event-sport-filter" onchange="filterEvents()">
                        <option value="all">Semua Olahraga</option>
                        <option value="Futsal">Futsal</option>
                        <option value="Basket">Basket</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Padel">Padel</option>
                    </select>
                </div>
            </div>

            <div class="match-toggle-group">
                <button class="match-toggle-btn active" id="btn-tab-join-events" onclick="switchEventTab('join')">🔥 Join Events</button>
                <button class="match-toggle-btn" id="btn-tab-buat-event" onclick="switchEventTab('buat')">➕ Buat Event</button>
            </div>

            <!-- TAB 1: JOIN EVENTS -->
            <div id="tab-join-events" style="display: block;">
                <div class="match-feed-list" id="event-feed-list">
                    <!-- Tournament Cards will be injected here -->
                </div>
            </div>

            <!-- TAB 2: BUAT EVENT -->
            <div id="tab-buat-event" style="display: none;">
                <div class="create-mabar-card">
                    <h2 style="margin-bottom: 1.5rem; color: #fff;">Buat Turnamen Baru</h2>
                    <form id="create-event-form" onsubmit="handleCreateTournament(event)">
                        
                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Nama Turnamen</label>
                            <input type="text" id="ce-title" required placeholder="Contoh: Piala Kemerdekaan Bintaro" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                        </div>

                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Penyelenggara</label>
                            <input type="text" id="ce-organizer" required placeholder="Contoh: Bintaro Hoops Club" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Olahraga</label>
                                <select id="ce-sport" required style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                                    <option value="Futsal">Futsal</option>
                                    <option value="Basket">Basket</option>
                                    <option value="Badminton">Badminton</option>
                                    <option value="Padel">Padel</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Kota</label>
                                <select id="ce-city" required style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                                    <option value="Ciledug">Ciledug</option>
                                    <option value="Bintaro">Bintaro</option>
                                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Lokasi / Venue</label>
                            <input type="text" id="ce-location" required placeholder="Contoh: AM Bintaro Court" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Tanggal</label>
                                <input type="text" id="ce-date" required placeholder="Misal: Sabtu, 15 Ags 2026" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                            </div>
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Kuota Tim/Peserta</label>
                                <input type="number" id="ce-max-slots" required placeholder="Contoh: 16" min="2" max="64" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Biaya Pendaftaran (Rp)</label>
                                <input type="number" id="ce-fee" required placeholder="Contoh: 150000" min="0" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                            </div>
                            <div class="form-group">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Prize Pool (Rp)</label>
                                <input type="number" id="ce-prize" required placeholder="Contoh: 2000000" min="0" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: var(--bg-surface); border: 1px solid var(--border); color: #fff;">
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; font-weight: 800; border-radius: var(--radius-lg);" id="btn-submit-event">Terbitkan Turnamen</button>
                    </form>
                </div>
            </div>

        </div>
    </div>
`;
