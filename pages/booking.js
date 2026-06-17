const PageBooking = `
<!-- ── App Header ── -->
    <header id="app-header-booking">
        <div class="header-left" style="display: flex; align-items: center; gap: 1rem;">
            <button class="mobile-menu-btn" onclick="toggleMobileMenu()">☰</button>
            <div class="logo" onclick="navigateTo('home')">
                <img src="assets/images/logo.jpeg" alt="Sparing-In" class="logo-img">
                <span class="logo-text">SPARING-IN</span>
            </div>
        </div>
        <nav class="header-nav">
            <a class="nav-link" onclick="navigateTo('home')">Beranda</a>
            <a class="nav-link active" onclick="navigateTo('booking')">Booking Lapangan</a>
            <a class="nav-link" onclick="navigateTo('cari-lawan')">Cari Lawan</a>
            <a class="nav-link" onclick="navigateTo('event')">Event</a>
            <a class="nav-link" onclick="navigateTo('transaksi')">Transaksi</a>
        </nav>
        <div class="header-right">
            <div class="user-info" onclick="navigateTo('profile')" style="cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--bg-card)'" onmouseout="this.style.background='transparent'">
                <span class="user-name" id="header-user-name-2">Halo, Admin</span>
                <div class="user-avatar" id="header-user-avatar-2">A</div>
            </div>
            <button class="btn-logout" onclick="handleLogout()">Keluar</button>
        </div>
    </header>

    <div class="container">

        <!-- Back Bar -->
        <div class="back-bar" id="booking-back-bar">
            <button class="back-btn" onclick="handleBookingBack()">← Kembali</button>
            <span class="back-bar-title" id="back-bar-title">Booking Lapangan</span>
        </div>

        <!-- Stepper -->
        <div class="stepper" id="booking-stepper">
            <div class="step-item active" data-step="1">
                <div class="step-circle">1</div>
                <span class="step-label">Lokasi</span>
            </div>
            <div class="step-line" data-line="1"></div>
            <div class="step-item" data-step="2">
                <div class="step-circle">2</div>
                <span class="step-label">Jadwal</span>
            </div>
            <div class="step-line" data-line="2"></div>
            <div class="step-item" data-step="3">
                <div class="step-circle">3</div>
                <span class="step-label">Checkout</span>
            </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- STEP 1 — Lokasi & Jenis Olahraga           -->
        <!-- ═══════════════════════════════════════════ -->
        <div class="step-section active" id="step-1">
            <div class="card">
                <div class="card-header">
                    <h2>Jenis Olahraga</h2>
                    <p>Pilih jenis olahraga yang ingin dimainkan</p>
                </div>
                <div class="sport-grid">
                    <label class="sport-option selected" onclick="selectSport(this)">
                        <input type="radio" name="sport" value="futsal" checked>
                        <span class="sport-icon">⚽</span>
                        <span class="sport-name">Futsal</span>
                    </label>
                    <label class="sport-option" onclick="selectSport(this)">
                        <input type="radio" name="sport" value="basket">
                        <span class="sport-icon">🏀</span>
                        <span class="sport-name">Basket</span>
                    </label>
                    <label class="sport-option" onclick="selectSport(this)">
                        <input type="radio" name="sport" value="badminton">
                        <span class="sport-icon">🏸</span>
                        <span class="sport-name">Badminton</span>
                    </label>
                    <label class="sport-option" onclick="selectSport(this)">
                        <input type="radio" name="sport" value="padel">
                        <span class="sport-icon">🎾</span>
                        <span class="sport-name">Padel</span>
                    </label>
                </div>
            </div>

            <div class="card">
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <h2>Pilih Lokasi Lapangan</h2>
                        <p>Temukan lapangan terdekat dengan lokasi Anda</p>
                    </div>
                    <div style="flex: 1; min-width: 200px; max-width: 300px;">
                        <input type="text" id="booking-search-input" placeholder="Cari nama atau lokasi..." class="form-control" oninput="renderBookingLocations(document.querySelector('.sport-option.selected input').value)" style="width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--bg-surface); color: #FFF;">
                    </div>
                </div>
                <div class="location-list" id="location-list">
                    <!-- Dinamis diisi oleh JS renderBookingLocations() -->
                </div>
            </div>

            <div class="btn-group">
                <button class="btn btn-primary" onclick="goToStep(2)">Lanjutkan →</button>
            </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- STEP 2 — Pilih Lapangan, Tanggal & Jam     -->
        <!-- ═══════════════════════════════════════════ -->
        <div class="step-section" id="step-2">
            <div class="card">
                <div class="card-header">
                    <h2>Pilih Lapangan</h2>
                    <p>Pilih lapangan yang tersedia di lokasi yang dipilih</p>
                </div>
                <div class="location-list" id="field-list">
                    <label class="location-card selected" data-sport="futsal basket badminton padel" onclick="selectField(this)">
                        <input type="radio" name="field" value="lap-1" checked>
                        <div class="location-icon">1️⃣</div>
                        <div class="location-details">
                            <h4>Lapangan 1 — Vinyl</h4>
                            <span>Indoor · AC · Standar Nasional</span>
                        </div>
                        <span class="badge badge-price">Rp 150.000/jam</span>
                    </label>
                    <label class="location-card" data-sport="futsal" onclick="selectField(this)">
                        <input type="radio" name="field" value="lap-2">
                        <div class="location-icon">2️⃣</div>
                        <div class="location-details">
                            <h4>Lapangan 2 — Rumput Sintetis</h4>
                            <span>Indoor · AC · Premium</span>
                        </div>
                        <span class="badge badge-price">Rp 200.000/jam</span>
                    </label>
                    <label class="location-card" data-sport="basket badminton" onclick="selectField(this)">
                        <input type="radio" name="field" value="lap-3">
                        <div class="location-icon">3️⃣</div>
                        <div class="location-details">
                            <h4>Lapangan 3 — Parquet</h4>
                            <span>Indoor · Non-AC · Standar</span>
                        </div>
                        <span class="badge badge-price">Rp 120.000/jam</span>
                    </label>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2>Pilih Tanggal & Jam</h2>
                    <p>Tentukan jadwal bermain Anda</p>
                </div>
                <div class="form-group">
                    <label for="date">Tanggal Bermain</label>
                    <input type="date" id="date" onchange="handleDateChange()">
                </div>
                <div class="form-group">
                    <label>Pilih Jam (Slot 1 Jam)</label>
                    <div class="timeslot-grid" id="timeslot-grid">
                        <!-- Dinamis diisi oleh JS renderTimeSlots() -->
                    </div>
                </div>
                <div class="slot-legend">
                    <span class="badge badge-available">● Tersedia</span>
                    <span class="badge badge-unavailable">● Tidak Tersedia</span>
                </div>
            </div>

            <div class="btn-group">
                <button class="btn btn-secondary" onclick="goToStep(1)">← Kembali</button>
                <button class="btn btn-primary" onclick="validateStep2()">Lanjutkan →</button>
            </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- STEP 3 — Checkout (Two-Column Layout)      -->
        <!-- ═══════════════════════════════════════════ -->
        <div class="step-section" id="step-3">
            <div class="checkout-grid">

                <!-- ── Left: Order Details ── -->
                <div class="checkout-details">
                    <div class="card">
                        <div class="card-header">
                            <h2>Detail Pesanan</h2>
                            <p>Periksa kembali detail booking Anda</p>
                        </div>
                        <div class="order-summary">
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">⚽</span> Olahraga</span>
                                <span class="summary-value" id="summary-sport">Futsal</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📍</span> Lokasi</span>
                                <span class="summary-value" id="summary-location">Arena A Sports Center</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">🏟️</span> Lapangan</span>
                                <span class="summary-value" id="summary-field">Lapangan 1 — Vinyl</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">📅</span> Tanggal</span>
                                <span class="summary-value" id="summary-date">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">🕐</span> Jam</span>
                                <span class="summary-value" id="summary-time">-</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label"><span class="icon">⏱️</span> Durasi</span>
                                <span class="summary-value" id="summary-duration">1 Jam</span>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h2>Catatan (Opsional)</h2>
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <textarea id="notes" rows="3" placeholder="Contoh: Minta bola cadangan, atau request lapangan tertentu..."></textarea>
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
                                <span id="summary-price-label">Sewa Lapangan (1 jam)</span>
                                <span id="price-base">Rp 150.000</span>
                            </div>
                            <div class="price-row">
                                <span>Biaya Layanan</span>
                                <span>Rp 5.000</span>
                            </div>
                            <div class="price-divider"></div>
                            <div class="price-row price-total">
                                <span>Total Pembayaran</span>
                                <span id="price-total">Rp 155.000</span>
                            </div>
                        </div>

                        <div class="payment-divider"></div>

                        <!-- ══════════════════════════════════════ -->
                        <!-- PURE CSS PAYMENT OPTIONS (Separated)  -->
                        <!-- ══════════════════════════════════════ -->
                        <div class="payment-options">
                            <!-- QRIS Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="pay-method" id="pay-qris" checked class="pm-radio">
                                <label for="pay-qris" class="pm-header">
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
                                    <button class="btn btn-primary" type="button" onclick="processPayment()">Cek Status Pembayaran</button>
                                </div>
                            </div>

                            <!-- Debit Option -->
                            <div class="payment-method-container">
                                <input type="radio" name="pay-method" id="pay-debit" class="pm-radio">
                                <label for="pay-debit" class="pm-header">
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
                                            <label for="card-number">Nomor Kartu</label>
                                            <input type="text" id="card-number" placeholder="1234 5678 9101 1121">
                                        </div>
                                        <div class="form-group full-width">
                                            <label for="card-name">Nama di Kartu</label>
                                            <input type="text" id="card-name" placeholder="John Doe">
                                        </div>
                                        <div class="form-group">
                                            <label for="expiry">Masa Berlaku</label>
                                            <input type="text" id="expiry" placeholder="MM/YY">
                                        </div>
                                        <div class="form-group">
                                            <label for="cvv">CVV</label>
                                            <input type="number" id="cvv" placeholder="123">
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="button" onclick="processPayment()">Bayar Sekarang</button>
                                </div>
                            </div>
                        </div>

                        <div class="secure-badge">
                            🔒 Transaksi aman & terenkripsi
                        </div>

                        <div class="btn-group" style="margin-top:1.5rem;">
                            <button class="btn btn-secondary" onclick="handleBookingBack()">← Kembali</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- STEP 4 — Booking Berhasil (Success)        -->
        <!-- ═══════════════════════════════════════════ -->
        <div class="step-section" id="step-4">
            <div class="card">
                <div class="success-screen">
                    <div class="success-icon">✓</div>
                    <h2>Booking Berhasil!</h2>
                    <p>Pembayaran telah dikonfirmasi. Berikut detail booking Anda.</p>

                    <div class="success-details">
                        <div class="summary-row">
                            <span class="summary-label">Booking ID</span>
                            <span class="booking-id" id="booking-id">SPR-260606-0001</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Olahraga</span>
                            <span class="summary-value" id="final-sport">Futsal</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Lokasi</span>
                            <span class="summary-value" id="final-location">Arena A Sports Center</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Lapangan</span>
                            <span class="summary-value" id="final-field">Lapangan 1 — Vinyl</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Jadwal</span>
                            <span class="summary-value" id="final-schedule">-</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">Total Bayar</span>
                            <span class="summary-value" style="color:var(--accent);font-weight:800;" id="final-total">Rp 155.000</span>
                        </div>
                    </div>

                    <div class="success-btn-group">
                        <button class="btn btn-secondary" onclick="resetBooking(); navigateTo('home')">🏠 Ke Beranda</button>
                        <button class="btn btn-primary" onclick="resetBooking()">🏟️ Booking Lagi</button>
                    </div>
                </div>
            </div>
        </div>

    </div><!-- /.container -->
`;
