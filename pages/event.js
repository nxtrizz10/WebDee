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

    <!-- Page Content -->
    <div class="mabar-container" style="margin-top: 2rem; padding: 0 1rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
        
        <!-- HEADER ROW: TOURNAMENT & BUAT BUTTON -->
        <div class="tourney-header" id="event-main-header">
            <div class="tourney-title">TOURNAMENT</div>
            <button class="btn-tourney-create" onclick="toggleCreateEventForm()">+ BUAT</button>
        </div>

        <!-- MAIN LIST VIEW -->
        <div id="event-list-container" style="display: block;">
            
            <!-- Filters -->
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-event-sport">Semua Cabang Olahraga</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Cabang Olahraga', 'event-sport')">Semua Cabang Olahraga</div>
                        <div class="cd-option" onclick="selectCd(this, 'Futsal', 'event-sport')">Futsal</div>
                        <div class="cd-option" onclick="selectCd(this, 'Basket', 'event-sport')">Basket</div>
                        <div class="cd-option" onclick="selectCd(this, 'Badminton', 'event-sport')">Badminton</div>
                        <div class="cd-option" onclick="selectCd(this, 'Padel', 'event-sport')">Padel</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-event-location">Semua Lokasi</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Lokasi', 'event-location')">Semua Lokasi</div>
                        <div class="cd-option" onclick="selectCd(this, 'Ciledug', 'event-location')">Ciledug</div>
                        <div class="cd-option" onclick="selectCd(this, 'Bintaro', 'event-location')">Bintaro</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Pusat', 'event-location')">Jakarta Pusat</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Selatan', 'event-location')">Jakarta Selatan</div>
                    </div>
                </div>
            </div>

            <div class="tourney-tabs">
                <div class="tourney-tab active" id="btn-tab-open" onclick="switchTourneyTab('open')">Open</div>
                <div class="tourney-tab" id="btn-tab-ongoing" onclick="switchTourneyTab('ongoing')">Ongoing</div>
                <div class="tourney-tab" id="btn-tab-finished" onclick="switchTourneyTab('finished')">Finished</div>
            </div>

            <!-- TAB CONTENTS -->
            <div id="tab-tourney-open" style="display: block;">
                <div id="event-feed-list">
                    <!-- Tournament Cards will be injected here -->
                </div>
            </div>

            <div id="tab-tourney-ongoing" style="display: none; text-align: center; padding: 4rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                <h3 style="color: #fff; font-weight: 800; font-size: 1.5rem; margin-bottom: 0.5rem;">Belum Ada Event Ongoing</h3>
                <p style="color: var(--text-secondary);">Turnamen yang sedang berjalan akan muncul di sini.</p>
            </div>

            <div id="tab-tourney-finished" style="display: none; text-align: center; padding: 4rem 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🏁</div>
                <h3 style="color: #fff; font-weight: 800; font-size: 1.5rem; margin-bottom: 0.5rem;">Belum Ada Event Selesai</h3>
                <p style="color: var(--text-secondary);">Turnamen yang sudah selesai akan muncul di sini.</p>
            </div>
        </div>

        <!-- DETAIL VIEW -->
        <div id="event-detail-container" class="tourney-detail-container">
            <!-- Header for detail page will be injected inside by JS -->
            <div id="tourney-detail-content"></div>
        </div>

        <!-- CREATE EVENT FORM -->
        <div id="event-create-container" style="display: none;">
            <button class="btn-secondary" style="width: auto; padding: 0.5rem 1rem; border-radius: 30px; margin-bottom: 1rem;" onclick="toggleCreateEventForm()">← Kembali</button>
            <div class="create-mabar-card" style="background: #141414; padding: 2rem; border-radius: 16px; border: 1px solid #2a2a2a;">
                <h2 style="margin-bottom: 1.5rem; color: #fff;">Buat Turnamen Baru</h2>
                <form id="create-event-form" onsubmit="handleCreateTournament(event)">
                    
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Nama Turnamen</label>
                        <input type="text" id="ce-title" required placeholder="Contoh: Piala Kemerdekaan Bintaro" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: #1a1a1a; border: 1px solid var(--border); color: #fff;">
                    </div>

                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Penyelenggara</label>
                        <input type="text" id="ce-organizer" required placeholder="Contoh: Bintaro Hoops Club" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: #1a1a1a; border: 1px solid var(--border); color: #fff;">
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Kuota Tim/Peserta</label>
                        <input type="number" id="ce-max-slots" required placeholder="Contoh: 16" min="2" max="64" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: #1a1a1a; border: 1px solid var(--border); color: #fff;">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Biaya Pendaftaran (Rp)</label>
                            <input type="number" id="ce-fee" required placeholder="Contoh: 150000" min="0" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: #1a1a1a; border: 1px solid var(--border); color: #fff;">
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-weight: 600;">Prize Pool (Rp)</label>
                            <input type="number" id="ce-prize" required placeholder="Contoh: 2000000" min="0" style="width: 100%; padding: 0.8rem; border-radius: var(--radius-md); background: #1a1a1a; border: 1px solid var(--border); color: #fff;">
                        </div>
                    </div>

                    <button type="submit" class="btn-tourney-join" style="width: 100%;" id="btn-submit-event">Booking Lapangan</button>
                </form>
            </div>
        </div>

        <!-- EVENT CHECKOUT & SUCCESS -->
        <div id="event-checkout-container" style="display: none; padding-bottom: 80px;">
            <button class="btn-secondary" style="width: auto; padding: 0.5rem 1rem; border-radius: 30px; margin-bottom: 1rem; border-color: #333;" onclick="cancelTourneyCheckout()">← Kembali</button>

            <div class="checkout-grid">
                <!-- ── Left: Order Details ── -->
                <div class="checkout-details">
                    <div class="card">
                        <div class="card-header">
                            <h2>Detail Pendaftaran</h2>
                            <p>Periksa kembali pendaftaran turnamen Anda</p>
                        </div>
                        <div class="order-summary">
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">🏆</span> Jenis</span>
                                <span class="summary-value">Tournament</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📌</span> Nama Turnamen</span>
                                <span class="summary-value" id="evt-co-title">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📍</span> Lokasi</span>
                                <span class="summary-value" id="evt-co-location">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📅</span> Tanggal</span>
                                <span class="summary-value" id="evt-co-date">-</span>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="card-team-name">
                        <div class="card-header">
                            <h2>Nama Tim</h2>
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <input type="text" id="evt-team-name" placeholder="Masukkan Nama Tim..." style="width: 100%; padding: 0.85rem 1rem; border-radius: var(--radius-md); background: #0a0f0d; border: 1px solid var(--border); color: #fff;">
                        </div>
                    </div>

                    <div class="card" id="card-category" style="display: none;">
                        <div class="card-header">
                            <h2>Kategori</h2>
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <select id="evt-category" style="width: 100%; padding: 0.85rem 1rem; border-radius: var(--radius-md); background: #0a0f0d; border: 1px solid var(--border); color: #fff;">
                                <option value="Man Double">Man Double</option>
                                <option value="Man Single">Man Single</option>
                                <option value="Women Double">Women Double</option>
                                <option value="Women Single">Women Single</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- ── Right: Payment Sidebar ── -->
                <div class="checkout-sidebar">
                    <div class="card">
                        <div class="card-header">
                            <h2>Ringkasan Pembayaran</h2>
                        </div>

                        <div class="price-breakdown">
                            <div class="price-row">
                                <span id="evt-summary-price-label">Biaya Pendaftaran</span>
                                <span id="evt-co-price">-</span>
                            </div>
                            <div class="price-row">
                                <span>Biaya Layanan</span>
                                <span>Rp 5.000</span>
                            </div>
                            <div class="price-divider"></div>
                            <div class="price-row price-total">
                                <span>Total Pembayaran</span>
                                <span id="evt-co-total">-</span>
                            </div>
                        </div>

                        <div class="payment-divider"></div>

                        <!-- PURE CSS PAYMENT OPTIONS -->
                        <div class="payment-options">
                            <!-- QRIS Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="evt-pay-method" id="evt-pay-qris" checked class="pm-radio">
                                <label for="evt-pay-qris" class="pm-header">
                                    <span class="pm-icon">📱</span>
                                    <span class="pm-title">QRIS (M-Banking & e-Wallet)</span>
                                    <div class="pm-check"></div>
                                </label>
                                <div class="pm-body">
                                    <div class="qris-box">
                                        <div style="width: 220px; height: 220px; overflow: hidden; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(0,0,0,0.2); margin: 0 auto 1rem auto; position: relative; background: #fff;">
                                            <img src="assets/images/qris_barcode.jpeg" alt="QRIS Barcode" style="position: absolute; width: 145%; top: 52%; left: 50%; transform: translate(-50%, -50%); max-width: none;">
                                        </div>
                                        <p class="qris-instruction">Buka aplikasi <strong>M-Banking</strong> atau <strong>e-Wallet</strong> Anda, kemudian scan QR Code di atas.</p>
                                    </div>
                                    <button class="btn btn-primary" style="width: 100%;" type="button" onclick="processEventPayment()">Cek Status Pembayaran</button>
                                </div>
                            </div>

                            <!-- Debit Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="evt-pay-method" id="evt-pay-debit" class="pm-radio">
                                <label for="evt-pay-debit" class="pm-header">
                                    <span class="pm-icon">💳</span>
                                    <span class="pm-title">Kartu Debit / Kredit</span>
                                    <div class="pm-check"></div>
                                </label>
                                <div class="pm-body">
                                    <div class="form-group">
                                        <label>Nomor Kartu</label>
                                        <input type="text" placeholder="0000 0000 0000 0000">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group" style="flex:1;">
                                            <label>Masa Berlaku</label>
                                            <input type="text" placeholder="MM/YY">
                                        </div>
                                        <div class="form-group" style="flex:1;">
                                            <label>CVV</label>
                                            <input type="text" placeholder="123">
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" style="width: 100%;" type="button" onclick="processEventPayment()">Bayar Sekarang</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- EVENT SUCCESS -->
        <div id="event-success-screen" class="step-section" style="display: none; padding-top: 0;">
            <div class="card">
                <div class="success-screen">
                    <div class="success-icon">✓</div>
                    <h2>Pendaftaran Berhasil!</h2>
                    <p id="event-success-desc">Tim Anda telah sukses terdaftar di turnamen ini. Persiapkan diri Anda sebaik mungkin!</p>

                    <div class="success-details">
                        <div class="summary-row">
                            <span class="summary-label">Turnamen ID</span>
                            <span class="booking-id" id="succ-evt-id">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Nama Turnamen</span>
                            <span class="summary-value" id="succ-evt-title">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Lokasi</span>
                            <span class="summary-value" id="succ-evt-location">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Total Bayar</span>
                            <span class="summary-value" style="color:var(--accent);font-weight:800;" id="succ-evt-total">-</span>
                        </div>
                    </div>

                    <div class="success-btn-group">
                        <button class="btn btn-secondary" onclick="resetEventAndNavigate('transaksi')">📄 Lihat Transaksi</button>
                        <button class="btn btn-primary" onclick="resetEventAndNavigate('event')">Kembali ke Event</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
`;
