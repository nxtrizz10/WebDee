const PageCariLawan = `
<!-- ── App Header ── -->
    <style>
        .custom-dropdown-container { position: relative; flex: 1; min-width: 200px; user-select: none; }
        .cd-header {
            background: var(--bg-card); border: 1px solid var(--border); padding: 0.85rem 1rem; border-radius: var(--radius-md);
            display: flex; justify-content: space-between; align-items: center; cursor: pointer; color: var(--text-primary);
            font-size: 0.95rem; font-weight: 500; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cd-header:hover { border-color: var(--primary-light); box-shadow: 0 0 0 3px var(--primary-glow); }
        .cd-arrow { color: var(--text-muted); font-size: 0.8rem; }
        .cd-list {
            position: absolute; top: 100%; left: 0; right: 0; background: #0a0f0d;
            border: 1px solid var(--border); border-radius: var(--radius-md); margin-top: 0.5rem;
            overflow: hidden; display: none; flex-direction: column; z-index: 50;
            box-shadow: 0 15px 30px rgba(0,0,0,0.8);
        }
        .cd-list.show { display: flex; animation: slideDown 0.2s ease forwards; }
        .cd-option {
            padding: 0.85rem 1rem; color: var(--text-secondary); cursor: pointer; font-weight: 600; font-size: 0.95rem;
            transition: 0.2s; border-bottom: 1px solid rgba(255,255,255,0.02);
        }
        .cd-option:last-child { border-bottom: none; }
        .cd-option:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
        .cd-option.selected {
            background: rgba(34, 197, 94, 0.1);
            color: var(--primary-light);
        }
    </style>
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
        <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem;">
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
                        <span class="cd-title">Semua Cabang Olahraga</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Cabang Olahraga')">Semua Cabang Olahraga</div>
                        <div class="cd-option" onclick="selectCd(this, 'Futsal')">Futsal</div>
                        <div class="cd-option" onclick="selectCd(this, 'Basket')">Basket</div>
                        <div class="cd-option" onclick="selectCd(this, 'Badmin')">Badmin</div>
                        <div class="cd-option" onclick="selectCd(this, 'Padel')">Padel</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title">Semua Lokasi</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Lokasi')">Semua Lokasi</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Selatan')">Jakarta Selatan</div>
                        <div class="cd-option" onclick="selectCd(this, 'Jakarta Pusat')">Jakarta Pusat</div>
                        <div class="cd-option" onclick="selectCd(this, 'Tangerang')">Tangerang</div>
                        <div class="cd-option" onclick="selectCd(this, 'Depok')">Depok</div>
                    </div>
                </div>

                <div class="custom-dropdown-container">
                    <div class="cd-header" onclick="toggleCd(this)">
                        <span class="cd-title">Semua Level</span>
                        <span class="cd-arrow">▼</span>
                    </div>
                    <div class="cd-list">
                        <div class="cd-option selected" onclick="selectCd(this, 'Semua Level')">Semua Level</div>
                        <div class="cd-option" onclick="selectCd(this, 'Newbie')">Newbie</div>
                        <div class="cd-option" onclick="selectCd(this, 'Beginner')">Beginner</div>
                        <div class="cd-option" onclick="selectCd(this, 'Intermediate')">Intermediate</div>
                    </div>
                </div>

            </div>

            <!-- Match Feed Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
                
                <!-- Card 1 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <span style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(34,197,94,0.2);">FUTSAL</span>
                            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">Fun Futsal Night</h3>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp 35k</div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary);">/ slot</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">AM Bintaro Court</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">Sabtu, 20:00 - 22:00 WIB</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Tersedia 4 / 14 Slot</span></div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Beginner</span>
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Newbie</span>
                    </div>

                    <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Join Mabar</button>
                </div>

                <!-- Card 2 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <span style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(59,130,246,0.2);">MINI SOCCER</span>
                            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">Sunday Morning Kick</h3>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp 65k</div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary);">/ slot</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">Pancoran Soccer Field</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">Minggu, 06:00 - 08:00 WIB</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Tersedia 2 / 20 Slot</span></div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Intermediate</span>
                    </div>

                    <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Join Mabar</button>
                </div>

                <!-- Card 3 -->
                <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: 0.3s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border)'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <span style="background: rgba(168, 85, 247, 0.1); color: #a855f7; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(168,85,247,0.2);">BADMINTON</span>
                            <h3 style="margin: 0.5rem 0 0.25rem 0; font-size: 1.25rem;">Smash Mania</h3>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.25rem; font-weight: 800; color: var(--accent);">Rp 45k</div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary);">/ slot</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">📍 <span style="color: var(--text-primary);">Taufik Hidayat Arena</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">🕒 <span style="color: var(--text-primary);">Rabu, 19:00 - 21:00 WIB</span></div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">👥 <span style="color: var(--text-primary);">Tersedia 1 / 8 Slot</span></div>
                    </div>

                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Beginner</span>
                        <span style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Intermediate</span>
                    </div>

                    <button style="width: 100%; padding: 0.8rem; background: var(--primary); color: #fff; border: none; border-radius: var(--radius-md); font-weight: 600; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='var(--primary)'">Join Mabar</button>
                </div>

            </div>
        </div>

        <!-- SPARING TAB CONTENT -->
        <div id="tab-content-sparing" style="display: none; padding: 80px 20px; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1.5rem;">🚧</div>
            <h2 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, var(--accent), #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Fitur Sparing Coming Soon!</h2>
            <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                Kami sedang menyiapkan fitur Sparing di mana tim kamu bisa menantang tim lain secara kompetitif. Siapkan skuad terbaikmu karena fitur ini akan segera hadir!
            </p>
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

function toggleCd(el) {
    // Close other dropdowns
    document.querySelectorAll('.cd-list').forEach(list => {
        if (list !== el.nextElementSibling) list.classList.remove('show');
    });
    el.nextElementSibling.classList.toggle('show');
}

function selectCd(el, val) {
    const list = el.parentElement;
    const header = list.previousElementSibling.querySelector('.cd-title');
    // Update selected visual
    list.querySelectorAll('.cd-option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
    // Update text
    header.textContent = val;
    // Close dropdown
    list.classList.remove('show');
}

// Global click to close custom dropdowns
document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-dropdown-container')) {
        document.querySelectorAll('.cd-list.show').forEach(list => list.classList.remove('show'));
    }
});

