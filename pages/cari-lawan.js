const PageCariLawan = `
<!-- ── App Header ── -->
<header id="app-header-cari">
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
            <a class="nav-link active" onclick="navigateTo('cari-lawan')">Cari Lawan</a>
            <a class="nav-link" onclick="navigateTo('event')">Event</a>
            <a class="nav-link" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name-cari">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar-cari">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <div class="main-content" style="padding-top: 40px; padding-bottom: 50px; max-width: 1200px; margin: 0 auto; padding-inline: 5%;">
        
        <!-- Header & Tabs -->
        <div id="mabar-header-tabs" style="display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--accent), #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Temukan Teman Mainmu!</h2>
            
            <div style="display: flex; background: var(--bg-card); padding: 0.5rem; border-radius: var(--radius-full); border: 1px solid var(--border);">
                <button id="tab-btn-mabar" onclick="switchCariLawanTab('mabar')" style="padding: 0.75rem 2rem; border-radius: var(--radius-full); border: none; background: var(--primary); color: #fff; font-weight: 600; cursor: pointer; transition: 0.3s;">Mabar</button>
                <button id="tab-btn-sparing" onclick="switchCariLawanTab('sparing')" style="padding: 0.75rem 2rem; border-radius: var(--radius-full); border: none; background: transparent; color: var(--text-secondary); font-weight: 600; cursor: pointer; transition: 0.3s;">Sparing</button>
            </div>
        </div>

        <!-- MABAR TAB CONTENT -->
        <div id="tab-content-mabar" style="display: block;">
            
            <!-- Filters -->
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                
                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-sport">Semua Cabang Olahraga</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Cabang Olahraga', 'sport')">Semua Cabang Olahraga</div>
                        <div class="cd-option" onclick="selectCd(this, 'Futsal', 'sport')">Futsal</div>
                        <div class="cd-option" onclick="selectCd(this, 'Basket', 'sport')">Basket</div>
                        <div class="cd-option" onclick="selectCd(this, 'Badminton', 'sport')">Badminton</div>
                        <div class="cd-option" onclick="selectCd(this, 'Padel', 'sport')">Padel</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-location">Semua Lokasi</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Lokasi', 'location')">Semua Lokasi</div>
                        <div class="cd-option" onclick="selectCd(this, 'Ciledug', 'location')">Ciledug</div>
                        <div class="cd-option" onclick="selectCd(this, 'Bintaro', 'location')">Bintaro</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Pusat', 'location')">Jakarta Pusat</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Selatan', 'location')">Jakarta Selatan</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-level">Semua Level</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Level', 'level')">Semua Level</div>
                        <div class="cd-option" onclick="selectCd(this, 'Newbie', 'level')">Newbie</div>
                        <div class="cd-option" onclick="selectCd(this, 'Beginner', 'level')">Beginner</div>
                        <div class="cd-option" onclick="selectCd(this, 'Intermediate', 'level')">Intermediate</div>
                    </div>
                </div>

            </div>

            <!-- Match Feed Grid -->
            <div id="mabar-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
                <!-- Dynamically rendered -->
            </div>
        </div>

        <!-- MABAR CHECKOUT & SUCCESS (Hidden by default) -->
        <div id="mabar-checkout-container" style="display: none; padding-bottom: 80px;">
            <div class="checkout-grid">

                <!-- ── Left: Order Details ── -->
                <div class="checkout-details">
                    <div class="card">
                        <div class="card-header">
                            <h2>Detail Pesanan</h2>
                            <p>Periksa kembali detail mabar Anda</p>
                        </div>
                        <div class="order-summary">
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">⚽</span> Olahraga</span>
                                <span class="summary-value" id="mabar-co-sport">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📍</span> Lokasi</span>
                                <span class="summary-value" id="mabar-co-location">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">🏆</span> Mabar</span>
                                <span class="summary-value" id="mabar-co-title">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📅</span> Tanggal</span>
                                <span class="summary-value" id="mabar-co-date">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">🕐</span> Jam</span>
                                <span class="summary-value" id="mabar-co-time">-</span>
                            </div>
                            <div class="summary-row" style="align-items: center;">
                                <span class="summary-label"><span class="icon">👥</span> Tiket</span>
                                <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.25rem; border-radius: 8px; border: 1px solid var(--border);">
                                    <button onclick="updateMabarQty(-1)" style="width: 28px; height: 28px; border-radius: 6px; border: none; background: rgba(255,255,255,0.1); color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">-</button>
                                    <span id="mabar-co-slot" style="min-width: 20px; text-align: center; font-weight: 600; font-size: 0.95rem;">1</span>
                                    <button onclick="updateMabarQty(1)" style="width: 28px; height: 28px; border-radius: 6px; border: none; background: rgba(34,197,94,0.2); color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='rgba(34,197,94,0.3)'" onmouseout="this.style.background='rgba(34,197,94,0.2)'">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h2>Catatan (Opsional)</h2>
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <textarea id="mabar-notes" rows="3" placeholder="Contoh: Saya bawa teman 1 orang untuk nonton..."></textarea>
                        </div>
                    </div>
                </div>

                <!-- ── Right: Payment Sidebar ── -->
                <div class="checkout-sidebar">
                    <div class="card">
                        <div class="card-header">
                            <h2>Ringkasan Pembayaran</h2>
                        </div>

                        <!-- Price Breakdown -->
                        <div class="price-breakdown">
                            <div class="price-row">
                                <span id="mabar-summary-price-label">Tiket Mabar (1 slot)</span>
                                <span id="mabar-co-price">Rp 35.000</span>
                            </div>
                            <div class="price-row">
                                <span>Biaya Layanan</span>
                                <span>Rp 5.000</span>
                            </div>
                            <div class="price-divider"></div>
                            <div class="price-row price-total">
                                <span>Total Pembayaran</span>
                                <span id="mabar-co-total">Rp 40.000</span>
                            </div>
                        </div>

                        <div class="payment-divider"></div>

                        <!-- PURE CSS PAYMENT OPTIONS (Separated)  -->
                        <!-- ══════════════════════════════════════ -->
                        <div class="payment-options">
                            <!-- QRIS Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="mabar-pay-method" id="mabar-pay-qris" checked class="pm-radio">
                                <label for="mabar-pay-qris" class="pm-header">
                                    <span class="pm-icon">📱</span>
                                    <span class="pm-title">QRIS (M-Banking & e-Wallet)</span>
                                    <div class="pm-check"></div>
                                </label>
                                <div class="pm-body">
                                    <div class="qris-box">
                                        <div style="width: 220px; height: 220px; overflow: hidden; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(0,0,0,0.2); margin: 0 auto 1rem auto; position: relative; background: #fff;">
                                            <img src="assets/images/qris_barcode.jpeg" alt="QRIS Barcode" style="position: absolute; width: 160%; top: 56%; left: 50%; transform: translate(-50%, -50%); max-width: none;">
                                        </div>
                                        <p class="qris-instruction">Buka aplikasi <strong>M-Banking</strong> atau <strong>e-Wallet</strong> Anda, kemudian scan QR Code di atas.</p>
                                    </div>
                                    <button class="btn btn-primary" style="width: 100%;" type="button" onclick="processMabarPayment()">Cek Status Pembayaran</button>
                                </div>
                            </div>

                            <!-- Debit Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="mabar-pay-method" id="mabar-pay-debit" class="pm-radio">
                                <label for="mabar-pay-debit" class="pm-header">
                                    <span class="pm-icon">💳</span>
                                    <span class="pm-title">Kartu Debit / Kredit</span>
                                    <div class="pm-check"></div>
                                </label>
                                <div class="pm-body">
                                    <!-- CSS Credit Card Preview -->
                                    <div class="credit-card-preview">
                                        <div class="cc-chip"></div>
                                        <div class="cc-number">•••• •••• •••• ••••</div>
                                        <div class="cc-bottom">
                                            <div class="cc-name">NAMA PEMEGANG KARTU</div>
                                            <div class="cc-expiry">MM/YY</div>
                                        </div>
                                    </div>

                                    <!-- Debit Form -->
                                    <div class="debit-grid">
                                        <div class="form-group full-width">
                                            <label for="mabar-card-number">Nomor Kartu</label>
                                            <input type="text" id="mabar-card-number" placeholder="1234 5678 9101 1121">
                                        </div>
                                        <div class="form-group full-width">
                                            <label for="mabar-card-name">Nama di Kartu</label>
                                            <input type="text" id="mabar-card-name" placeholder="John Doe">
                                        </div>
                                        <div class="form-group">
                                            <label for="mabar-expiry">Masa Berlaku</label>
                                            <input type="text" id="mabar-expiry" placeholder="MM/YY">
                                        </div>
                                        <div class="form-group">
                                            <label for="mabar-cvv">CVV</label>
                                            <input type="number" id="mabar-cvv" placeholder="123">
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" style="width: 100%;" type="button" onclick="processMabarPayment()">Bayar Sekarang</button>
                                </div>
                            </div>
                        </div>

                        <div class="secure-badge">
                            🔒 Transaksi aman & terenkripsi
                        </div>

                        <div class="btn-group" style="margin-top:1.5rem;">
                            <button class="btn btn-secondary" style="width: 100%;" onclick="cancelMabarCheckout()">← Kembali</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="mabar-success-screen" class="step-section" style="display: none; padding-top: 0;">
            <div class="card">
                <div class="success-screen">
                    <div class="success-icon">✓</div>
                    <h2>Pembayaran Berhasil!</h2>
                    <p>Anda telah berhasil bergabung ke mabar. Siapkan perlengkapanmu!</p>

                    <div class="success-details">
                        <div class="summary-row">
                            <span class="summary-label">Mabar ID</span>
                            <span class="booking-id" id="succ-mabar-id">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Olahraga</span>
                            <span class="summary-value" id="succ-mabar-sport">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Lokasi</span>
                            <span class="summary-value" id="succ-mabar-location">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Mabar</span>
                            <span class="summary-value" id="succ-mabar-title">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Waktu</span>
                            <span class="summary-value" id="succ-mabar-time">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Total Bayar</span>
                            <span class="summary-value" style="color:var(--accent);font-weight:800;" id="succ-mabar-total">-</span>
                        </div>
                    </div>

                    <div class="success-btn-group">
                        <button class="btn btn-secondary" onclick="resetMabarAndNavigate('home')">🏠 Ke Beranda</button>
                        <button class="btn btn-primary" onclick="resetMabarAndNavigate('mabar')">🏟️ Join Mabar Lagi</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SPARING TAB CONTENT -->
        <div id="tab-content-sparing" style="display: none;">
            
            <!-- Filters -->
            <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                
                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-sparing-sport">Semua Cabang Olahraga</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Cabang Olahraga', 'sparing-sport')">Semua Cabang Olahraga</div>
                        <div class="cd-option" onclick="selectCd(this, 'Futsal', 'sparing-sport')">Futsal</div>
                        <div class="cd-option" onclick="selectCd(this, 'Basket', 'sparing-sport')">Basket</div>
                        <div class="cd-option" onclick="selectCd(this, 'Badminton', 'sparing-sport')">Badminton</div>
                        <div class="cd-option" onclick="selectCd(this, 'Padel', 'sparing-sport')">Padel</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-sparing-location">Semua Lokasi</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Lokasi', 'sparing-location')">Semua Lokasi</div>
                        <div class="cd-option" onclick="selectCd(this, 'Ciledug', 'sparing-location')">Ciledug</div>
                        <div class="cd-option" onclick="selectCd(this, 'Bintaro', 'sparing-location')">Bintaro</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Pusat', 'sparing-location')">Jakarta Pusat</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Selatan', 'sparing-location')">Jakarta Selatan</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title" id="filter-sparing-level">Semua Level</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Level', 'sparing-level')">Semua Level</div>
                        <div class="cd-option" onclick="selectCd(this, 'Newbie', 'sparing-level')">Newbie</div>
                        <div class="cd-option" onclick="selectCd(this, 'Beginner', 'sparing-level')">Beginner</div>
                        <div class="cd-option" onclick="selectCd(this, 'Intermediate', 'sparing-level')">Intermediate</div>
                    </div>
                </div>

            </div>

            <!-- Sparing Match Feed Grid -->
            <div id="sparing-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
                
                <!-- Dummy Card 1 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <span style="background: rgba(34, 197, 94, 0.1); color: #4ade80; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(74, 222, 128, 0.2); text-transform: uppercase;">Futsal</span>
                            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">Sparing Ciledug FC</h3>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp 150k</div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary);">/ tim</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">Ciledug Futsal Center</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">Sabtu, 19:00 WIB</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Dicari: 1 Tim Lawan</span></div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Intermediate</span>
                    </div>

                    <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Tantang Tim</button>
                </div>

                <!-- Dummy Card 2 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <span style="background: rgba(249, 115, 22, 0.1); color: #fb923c; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(251, 146, 60, 0.2); text-transform: uppercase;">Basket</span>
                            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">Bintaro Hoops 5v5</h3>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp 200k</div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary);">/ tim</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">Bintaro Jaya Arena</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">Minggu, 16:00 WIB</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Dicari: 1 Tim Lawan</span></div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Beginner</span>
                    </div>

                    <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Tantang Tim</button>
                </div>

            </div>
        </div>

    </div>
`;

function switchCariLawanTab(tabName) {
    const btnMabar = document.getElementById('tab-btn-mabar');
    const btnSparing = document.getElementById('tab-btn-sparing');
    const contentMabar = document.getElementById('tab-content-mabar');
    const contentSparing = document.getElementById('tab-content-sparing');

    if (tabName === 'mabar') {
        btnMabar.style.background = 'var(--primary)';
        btnMabar.style.color = '#fff';
        btnSparing.style.background = 'transparent';
        btnSparing.style.color = 'var(--text-secondary)';
        contentMabar.style.display = 'block';
        contentSparing.style.display = 'none';
    } else {
        btnSparing.style.background = 'var(--primary)';
        btnSparing.style.color = '#fff';
        btnMabar.style.background = 'transparent';
        btnMabar.style.color = 'var(--text-secondary)';
        contentSparing.style.display = 'block';
        contentMabar.style.display = 'none';
    }
}



let mabarFilters = { sport: 'Semua Cabang Olahraga', location: 'Semua Lokasi', level: 'Semua Level' };
let currentCheckoutMabar = null;

function renderMabarFeed() {
    const grid = document.getElementById('mabar-grid');
    if(!grid) return;
    
    let filtered = mabarEvents;
    if (mabarFilters.sport !== 'Semua Cabang Olahraga') {
        filtered = filtered.filter(m => m.sport.toLowerCase() === mabarFilters.sport.toLowerCase());
    }
    if (mabarFilters.location !== 'Semua Lokasi') {
        filtered = filtered.filter(m => m.city.toLowerCase() === mabarFilters.location.toLowerCase() || m.location.toLowerCase().includes(mabarFilters.location.toLowerCase()));
    }
    if (mabarFilters.level !== 'Semua Level') {
        filtered = filtered.filter(m => m.level.map(l=>l.toLowerCase()).includes(mabarFilters.level.toLowerCase()));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">Tidak ada mabar yang sesuai filter.</div>';
        return;
    }

    grid.innerHTML = filtered.map(m => {
        let levelBadges = m.level.map(l => `<span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">${l}</span>`).join('');
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <span style="background: ${m.bg}; color: ${m.color}; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid ${m.color}33; text-transform: uppercase;">${m.sport}</span>
                        <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">${m.title}</h3>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp ${m.price/1000}k</div>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">/ slot</span>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">${m.location}</span></div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">${m.date}, ${m.time}</span></div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Tersedia ${m.currentPlayers} / ${m.maxPlayers} Slot</span></div>
                </div>

                <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                    ${levelBadges}
                </div>

                ${m.currentPlayers === 0 ? 
                    `<button disabled style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.1); color: var(--text-secondary); border: 1px solid var(--border); border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: not-allowed;">Penuh</button>` 
                    : 
                    `<button onclick="checkoutMabar('${m.id}')" style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Join Mabar</button>`
                }
            </div>
        `;
    }).join('');
}

let sparingFilters = { sport: 'Semua Cabang Olahraga', location: 'Semua Lokasi', level: 'Semua Level' };

function renderSparingFeed() {
    const grid = document.getElementById('sparing-grid');
    if(!grid) return;
    
    let filtered = sparingEvents;
    if (sparingFilters.sport !== 'Semua Cabang Olahraga') {
        filtered = filtered.filter(m => m.sport.toLowerCase() === sparingFilters.sport.toLowerCase());
    }
    if (sparingFilters.location !== 'Semua Lokasi') {
        filtered = filtered.filter(m => m.city.toLowerCase() === sparingFilters.location.toLowerCase() || m.location.toLowerCase().includes(sparingFilters.location.toLowerCase()));
    }
    if (sparingFilters.level !== 'Semua Level') {
        filtered = filtered.filter(m => m.level.map(l=>l.toLowerCase()).includes(sparingFilters.level.toLowerCase()));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">Tidak ada jadwal sparing yang sesuai filter.</div>';
        return;
    }

    grid.innerHTML = filtered.map(m => {
        let levelBadges = m.level.map(l => `<span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">${l}</span>`).join('');
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div>
                        <span style="background: ${m.bg}; color: ${m.color}; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid ${m.color}33; text-transform: uppercase;">${m.sport}</span>
                        <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">${m.title}</h3>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp ${m.price/1000}k</div>
                        <span style="font-size: 0.75rem; color: var(--text-secondary);">/ tim</span>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">${m.location}</span></div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">${m.date}, ${m.time}</span></div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Dicari: ${m.currentPlayers} Tim Lawan</span></div>
                </div>

                <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                    ${levelBadges}
                </div>

                <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Tantang Tim</button>
            </div>
        `;
    }).join('');
}

function selectCd(el, val, type) {
    const list = el.parentElement;
    const header = list.previousElementSibling.querySelector('.cd-title');
    list.querySelectorAll('.cd-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    header.textContent = val;
    list.classList.remove('show');
    
    // Update filters and re-render
    if (type) {
        if (type.startsWith('event-')) {
            const eventType = type.replace('event-', '');
            if (window.eventFilters) {
                window.eventFilters[eventType] = val;
                if (typeof window.renderTournaments === 'function') window.renderTournaments();
            }
        } else if (type.startsWith('sparing-')) {
            const sparingType = type.replace('sparing-', '');
            sparingFilters[sparingType] = val;
            renderSparingFeed();
        } else {
            mabarFilters[type] = val;
            renderMabarFeed();
        }
    }
}

window.setMabarLocationFilter = function(city) {
    // Update Mabar Location Filter
    const list = document.querySelector('#filter-location').parentElement.nextElementSibling;
    if (list) {
        const options = list.querySelectorAll('.cd-option');
        options.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.textContent.trim() === city) {
                opt.classList.add('selected');
                document.querySelector('#filter-location').textContent = city;
            }
        });
    }
    mabarFilters.location = city;
    renderMabarFeed();

    // Update Sparing Location Filter
    const filterSparingEl = document.querySelector('#filter-sparing-location');
    if (filterSparingEl) {
        const listSparing = filterSparingEl.parentElement.nextElementSibling;
        if (listSparing) {
            const optionsSparing = listSparing.querySelectorAll('.cd-option');
            optionsSparing.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.textContent.trim() === city) {
                    opt.classList.add('selected');
                    filterSparingEl.textContent = city;
                }
            });
        }
    }
    sparingFilters.location = city;
    renderSparingFeed();
}

window.renderMabarFeedInit = function() {
    renderMabarFeed();
    renderSparingFeed();
}

window.currentMabarQty = 1;

function checkoutMabar(id) {
    const m = mabarEvents.find(x => x.id === id);
    if (!m) return;
    currentCheckoutMabar = m;

    document.getElementById('mabar-header-tabs').style.display = 'none';
    document.getElementById('tab-content-mabar').style.display = 'none';
    const co = document.getElementById('mabar-checkout-container');
    co.style.display = 'block';

    document.getElementById('mabar-co-title').textContent = m.title;
    document.getElementById('mabar-co-sport').textContent = m.sport;
    document.getElementById('mabar-co-location').textContent = m.location;
    document.getElementById('mabar-co-date').textContent = m.date;
    document.getElementById('mabar-co-time').textContent = m.time;
    
    // Reset qty
    window.currentMabarQty = 1;
    document.getElementById('mabar-co-slot').textContent = window.currentMabarQty;
    updateMabarCheckoutPrices();
}

function updateMabarQty(delta) {
    const m = currentCheckoutMabar;
    if (!m) return;
    
    // max slots available
    const available = m.currentPlayers;
    
    let newQty = window.currentMabarQty + delta;
    if (newQty < 1) newQty = 1;
    if (newQty > available) newQty = available;
    
    window.currentMabarQty = newQty;
    document.getElementById('mabar-co-slot').textContent = window.currentMabarQty;
    updateMabarCheckoutPrices();
}

function updateMabarCheckoutPrices() {
    const m = currentCheckoutMabar;
    if (!m) return;
    const ticketTotal = m.price * window.currentMabarQty;
    document.getElementById('mabar-co-price').textContent = fmt(ticketTotal);
    document.getElementById('mabar-summary-price-label').textContent = `Tiket Mabar (${window.currentMabarQty} slot)`;
    document.getElementById('mabar-co-total').textContent = fmt(ticketTotal + 5000); // 5000 service fee fixed per transaction
}

async function cancelMabarCheckout(force = false) {
    if (!force) {
        const confirmed = await window.showConfirmModal("Apakah kamu ingin membatalkan transaksi ini?");
        if (!confirmed) {
            return;
        }
    }
    currentCheckoutMabar = null;
    document.getElementById('mabar-checkout-container').style.display = 'none';
    document.getElementById('mabar-header-tabs').style.display = 'flex';
    if (typeof switchCariLawanTab === 'function') switchCariLawanTab('mabar');
    else document.getElementById('tab-content-mabar').style.display = 'block';
}

function resetMabarAndNavigate(dest) {
    document.getElementById('mabar-success-screen').style.display = 'none';
    document.getElementById('mabar-checkout-container').style.display = 'none';
    document.getElementById('mabar-header-tabs').style.display = 'flex';
    if (typeof switchCariLawanTab === 'function') switchCariLawanTab('mabar');
    else document.getElementById('tab-content-mabar').style.display = 'block';
    
    currentCheckoutMabar = null;

    if (dest === 'home') {
        navigateTo('home');
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function fmt(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

// Automatically render when global script evaluates
window.renderMabarFeedInit = renderMabarFeed;

// Global click to close custom dropdowns
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-dropdown-container')) {
        document.querySelectorAll('.cd-list.show').forEach(list => list.classList.remove('show'));
    }
});


