// ═══════════════════════════════════════════
    // APP STATE
    // ═══════════════════════════════════════════
    let currentPage = 'login';
    let currentStep = 1;
    let loggedInUser = null;
    let currentEmail = null;

    // Demo accounts — gunakan salah satu untuk login
    

    let selectedSport = 'Futsal';
    let selectedLocation = 'AM Bintaro Court';
    let selectedField = 'lap-1';
    let selectedTimes = [];
    const prices = { 'lap-1': 150000, 'lap-2': 200000, 'lap-3': 120000 };
    const fieldNames = { 'lap-1': 'Lapangan 1 — Vinyl', 'lap-2': 'Lapangan 2 — Rumput Sintetis', 'lap-3': 'Lapangan 3 — Parquet' };
    const serviceFee = 5000;

    // ═══════════════════════════════════════════
    // CUSTOM CONFIRM MODAL
    // ═══════════════════════════════════════════
    window.showConfirmModal = function(message, title = 'Konfirmasi', okText = 'Ya, Batalkan', cancelText = 'Tidak') {
        return new Promise((resolve) => {
            const overlay = document.getElementById('custom-confirm-modal');
            if (!overlay) return resolve(confirm(message)); // fallback

            document.getElementById('confirm-modal-title').textContent = title;
            document.getElementById('confirm-modal-message').textContent = message;
            document.getElementById('confirm-modal-ok').textContent = okText;
            document.getElementById('confirm-modal-cancel').textContent = cancelText;
            
            overlay.classList.add('show');
            
            const btnOk = document.getElementById('confirm-modal-ok');
            const btnCancel = document.getElementById('confirm-modal-cancel');
            
            const cleanup = () => {
                overlay.classList.remove('show');
                btnOk.removeEventListener('click', onOk);
                btnCancel.removeEventListener('click', onCancel);
            };
            
            const onOk = () => { cleanup(); resolve(true); };
            const onCancel = () => { cleanup(); resolve(false); };
            
            btnOk.addEventListener('click', onOk);
            btnCancel.addEventListener('click', onCancel);
        });
    };

    // ═══════════════════════════════════════════
    // PAGE NAVIGATION
    // ═══════════════════════════════════════════
    async function navigateTo(page) {
        if (page === currentPage) return;

        // Check for pending transaction BEFORE switching pages
        if (currentPage === 'booking' && typeof currentStep !== 'undefined' && currentStep === 3) {
            const confirmed = await window.showConfirmModal("Apakah kamu ingin membatalkan transaksi ini?");
            if (!confirmed) {
                return; // User cancelled the navigation
            }
        }
        
        if (currentPage === 'cari-lawan') {
            const co = document.getElementById('mabar-checkout-container');
            if (co && co.style.display === 'block') {
                const confirmed = await window.showConfirmModal("Apakah kamu ingin membatalkan transaksi ini?");
                if (!confirmed) {
                    return; // User cancelled the navigation
                }
            }
        }

        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageEl = document.getElementById('page-' + page);
        
        // Tutup mobile menu jika sedang terbuka
        const navs = document.querySelectorAll('.header-nav');
        navs.forEach(nav => nav.classList.remove('show'));
        
        if (pageEl && pageEl.innerHTML.trim() === '') {
            if (page === 'home') pageEl.innerHTML = typeof PageBeranda !== 'undefined' ? PageBeranda : '';
            else if (page === 'booking') pageEl.innerHTML = typeof PageBooking !== 'undefined' ? PageBooking : '';
            else if (page === 'profile') pageEl.innerHTML = typeof PageProfile !== 'undefined' ? PageProfile : '';
            else if (page === 'cari-lawan') pageEl.innerHTML = typeof PageCariLawan !== 'undefined' ? PageCariLawan : '';
            else if (page === 'event') pageEl.innerHTML = typeof PageEvent !== 'undefined' ? PageEvent : '';
            else if (page === 'transaksi') pageEl.innerHTML = typeof PageTransaksi !== 'undefined' ? PageTransaksi : '';
        }
        
        if (pageEl) pageEl.classList.add('active');
        
        currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset states when entering specific pages
        if (page === 'booking') {
            if (typeof resetBooking === 'function') resetBooking();
        }
        if (page === 'cari-lawan') {
            if (typeof cancelMabarCheckout === 'function') cancelMabarCheckout(true);
        }
        if (page === 'event') {
            if (typeof renderTournaments === 'function') renderTournaments();
        }
        
        // Update all headers dynamically
        const savedAvatar = currentEmail ? localStorage.getItem('sparingin_profile_pic_' + currentEmail) : null;
        document.querySelectorAll('[id^="header-user-name"]').forEach(el => {
            if (loggedInUser) el.textContent = 'Halo, ' + loggedInUser;
        });
        document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
            if (savedAvatar) {
                el.style.backgroundImage = `url(${savedAvatar})`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
                el.textContent = '';
            } else if (loggedInUser) {
                el.style.backgroundImage = 'none';
                el.textContent = loggedInUser.substring(0, 2).toUpperCase();
            }
        });
        
        // Render home venues if navigating to home
        if (page === 'home') {
            if (!userLocation && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const distToCiledug = calculateDistance(lat, lng, -6.233, 106.716);
                        const distToUPJ = calculateDistance(lat, lng, -6.284, 106.728);
                        const detectedRegion = distToCiledug < distToUPJ ? 'ciledug' : 'upj';
                        
                        userLocation = { lat, lng, cityName: 'Area Anda', region: detectedRegion };
                        
                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                            const data = await res.json();
                            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || 'Lokasi Anda';
                            userLocation.cityName = city;
                        } catch (e) {
                            // suppress
                        }

                        if (typeof renderVenues === 'function') renderVenues();
                    },
                    (error) => {
                        if (typeof renderVenues === 'function') renderVenues();
                    }
                );
            } else {
                if (typeof renderVenues === 'function') renderVenues();
            }
        }

        if (page === 'cari-lawan') {
            if (userLocation) {
                const lat = userLocation.lat;
                const lng = userLocation.lng;
                const distToCiledug = calculateDistance(lat, lng, -6.233, 106.716);
                const distToBintaro = calculateDistance(lat, lng, -6.284, 106.728);
                const distToJaksel = calculateDistance(lat, lng, -6.261, 106.810);
                const distToJakpus = calculateDistance(lat, lng, -6.180, 106.828);
                
                let min = Math.min(distToCiledug, distToBintaro, distToJaksel, distToJakpus);
                let nearestCity = 'Semua Lokasi';
                if(min === distToCiledug) nearestCity = 'Ciledug';
                else if(min === distToBintaro) nearestCity = 'Bintaro';
                else if(min === distToJaksel) nearestCity = 'Jakarta Selatan';
                else if(min === distToJakpus) nearestCity = 'Jakarta Pusat';

                if(typeof window.setMabarLocationFilter === 'function') {
                    window.setMabarLocationFilter(nearestCity);
                } else if (typeof renderMabarFeedInit === 'function') {
                    renderMabarFeedInit();
                }
            } else {
                if (typeof renderMabarFeedInit === 'function') renderMabarFeedInit();
            }
        }

        // Render transaksi history
        if (page === 'transaksi') {
            if (typeof renderTransaksi === 'function') renderTransaksi();
        }
        
        // Update Profile Page Data dynamically
        if (page === 'profile') {
            const profileNameEl = document.getElementById('profile-name-display');
            if(profileNameEl && loggedInUser) profileNameEl.textContent = loggedInUser.toUpperCase();
            
            const profileUsernameEl = document.querySelector('.profile-username');
            if(profileUsernameEl && currentEmail) {
                const username = currentEmail.split('@')[0];
                profileUsernameEl.textContent = `@${username} • Jakarta`;
            }
            
            const profileAvatarEl = document.getElementById('profile-avatar-display');
            if (profileAvatarEl) {
                const savedAvatar = localStorage.getItem('sparingin_profile_pic_' + currentEmail);
                if (savedAvatar) {
                    profileAvatarEl.textContent = '';
                    profileAvatarEl.style.backgroundImage = `url(${savedAvatar})`;
                } else if (loggedInUser) {
                    profileAvatarEl.textContent = loggedInUser.substring(0, 2).toUpperCase();
                    profileAvatarEl.style.backgroundImage = 'none';
                }
            }
        }
        
        // Auto-detect location for Booking Page recommendations
        if (page === 'booking') {
            const currentSportVal = document.querySelector('.sport-option.selected input')?.value || 'futsal';
            
            // Just use the globally cached userLocation, don't prompt again
            renderBookingLocations(currentSportVal);
            
            // Setup Date Input
            const dateInput = document.getElementById('date');
            if (dateInput) {
                if (!dateInput.value) {
                    const t = new Date();
                    dateInput.value = t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');
                }
                // Avoid adding multiple listeners if navigating back and forth
                if (!dateInput.dataset.listenerAdded) {
                    dateInput.addEventListener('change', () => {
                        selectedTimes = [];
                        if(typeof renderTimeSlots === 'function') renderTimeSlots();
                        if(typeof updateSummary === 'function') updateSummary();
                    });
                    dateInput.dataset.listenerAdded = 'true';
                }
            }
            
            if(typeof renderTimeSlots === 'function') renderTimeSlots();
        }

        if (page === 'cari-lawan' && typeof window.renderMatchFeed === 'function') {
            window.renderMatchFeed();
        }
    }

    // ═══════════════════════════════════════════
    // LOGIN / LOGOUT
    // ═══════════════════════════════════════════
    function decodeJwtResponse(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    window.handleGoogleLogin = function(response) {
        try {
            const responsePayload = decodeJwtResponse(response.credential);
            
            currentEmail = responsePayload.email;
            loggedInUser = responsePayload.name;
            const picture = responsePayload.picture;
            
            if (picture) {
                localStorage.setItem('sparingin_profile_pic_' + currentEmail, picture);
            }
            
            localStorage.setItem('sparingin_logged_in_email', currentEmail);
            localStorage.setItem('sparingin_logged_in_name', loggedInUser);
            
            document.getElementById('login-error').style.display = 'none';
            document.getElementById('login-email').value = '';
            document.getElementById('login-password').value = '';
            
            navigateTo('home');
        } catch (error) {
            console.error("Google Login Error:", error);
            const errorBox = document.getElementById('login-error');
            document.getElementById('login-error-text').textContent = "Gagal memproses login Google.";
            errorBox.style.display = 'flex';
        }
    }
    window.toggleAuthMode = function() {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const title = document.querySelector('.login-form-header h2');
        const subtitle = document.querySelector('.login-form-header p');
        const footer = document.querySelector('.login-footer');
        const errorBox = document.getElementById('login-error');
        
        if(errorBox) errorBox.classList.remove('show');

        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            title.textContent = 'Masuk ke Akun Anda';
            subtitle.textContent = 'Selamat datang kembali! Silakan masuk untuk melanjutkan.';
            footer.innerHTML = 'Belum punya akun? <a href="#" onclick="event.preventDefault(); toggleAuthMode();">Daftar Sekarang</a>';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            title.textContent = 'Daftar Akun Baru';
            subtitle.textContent = 'Lengkapi data diri Anda untuk bergabung dengan Sparing-In.';
            footer.innerHTML = 'Sudah punya akun? <a href="#" onclick="event.preventDefault(); toggleAuthMode();">Masuk di sini</a>';
        }
    };

    window.handleRegister = function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const pass = document.getElementById('reg-password').value;
        const errorBox = document.getElementById('login-error');
        const errorText = document.getElementById('login-error-text');
        
        let users = JSON.parse(localStorage.getItem('sparingin_users') || '{}');
        
        if (users[email]) {
            errorText.textContent = "Email/Username sudah terdaftar!";
            errorBox.classList.add('show');
            return;
        }
        
        users[email] = { name: name, password: pass };
        localStorage.setItem('sparingin_users', JSON.stringify(users));
        
        currentEmail = email;
        loggedInUser = name;
        errorBox.classList.remove('show');
        localStorage.setItem('sparingin_logged_in_email', currentEmail);
        localStorage.setItem('sparingin_logged_in_name', loggedInUser);
        
        document.getElementById('reg-name').value = '';
        document.getElementById('reg-email').value = '';
        document.getElementById('reg-password').value = '';
        
        document.querySelectorAll('[id^="header-user-name"]').forEach(el => el.textContent = 'Halo, ' + name);
        document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
            el.style.backgroundImage = 'none';
            el.textContent = name.substring(0, 2).toUpperCase();
        });
        
        navigateTo('home');
    };

    function handleLogin(e) {
        e.preventDefault();
        const rawInput = document.getElementById('login-email').value.trim().toLowerCase();
        const pass  = document.getElementById('login-password').value;
        const errorBox  = document.getElementById('login-error');
        const errorText = document.getElementById('login-error-text');

        if (!rawInput || !pass) {
            errorText.textContent = 'Silakan masukkan username/email dan password.';
            errorBox.classList.add('show');
            return;
        }

        const username = rawInput.includes('@') ? rawInput.split('@')[0] : rawInput;
        
        // Cek localStorage dulu
        let users = JSON.parse(localStorage.getItem('sparingin_users') || '{}');
        let validUser = null;
        
        if (users[rawInput] && users[rawInput].password === pass) {
            validUser = { name: users[rawInput].name, username: rawInput };
        } else if (typeof demoAccounts !== 'undefined' && demoAccounts[username] && demoAccounts[username].password === pass) {
            validUser = { name: demoAccounts[username].name, username: username };
        }

        if (!validUser) {
            errorText.textContent = 'Username/Email atau password salah. Silakan coba lagi.';
            errorBox.classList.add('show');
            return;
        }

        errorBox.classList.remove('show');
        loggedInUser = validUser.name;
        currentEmail = validUser.username;
        localStorage.setItem('sparingin_logged_in_email', currentEmail);
        localStorage.setItem('sparingin_logged_in_name', loggedInUser);
        
        // Cek apakah ada foto profil yang tersimpan di localStorage
        const savedAvatar = localStorage.getItem('sparingin_profile_pic_' + currentEmail);

        document.querySelectorAll('[id^="header-user-name"]').forEach(el => el.textContent = 'Halo, ' + validUser.name);
        
        const profileAvatarEl = document.getElementById('profile-avatar-display');

        if (savedAvatar) {
            document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
                el.textContent = '';
                el.style.backgroundImage = `url(${savedAvatar})`;
                el.style.backgroundSize = 'cover';
                el.style.backgroundPosition = 'center';
            });
            if(profileAvatarEl) {
                profileAvatarEl.textContent = '';
                profileAvatarEl.style.backgroundImage = `url(${savedAvatar})`;
            }
        } else {
            document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
                el.textContent = validUser.name.substring(0, 2).toUpperCase();
                el.style.backgroundImage = 'none';
            });
            if(profileAvatarEl) {
                profileAvatarEl.textContent = validUser.name.substring(0, 2).toUpperCase();
                profileAvatarEl.style.backgroundImage = 'none';
            }
        }

        // Update Profile Page Data
        const profileNameEl = document.getElementById('profile-name-display');
        if(profileNameEl) profileNameEl.textContent = validUser.name.toUpperCase();
        
        const profileUsernameEl = document.querySelector('.profile-username');
        if(profileUsernameEl) profileUsernameEl.textContent = `@${username} • Jakarta`;

        navigateTo('home');
    }

    function handleLogout() {
        loggedInUser = null;
        currentEmail = null;
        localStorage.removeItem('sparingin_logged_in_email');
        localStorage.removeItem('sparingin_logged_in_name');
        currentStep = 1;
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-error').classList.remove('show');
        
        // Reset form view to Login if it was on Register
        const loginForm = document.getElementById('login-form');
        if (loginForm && loginForm.style.display === 'none') {
            toggleAuthMode();
        }
        
        // Reset Avatars
        document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
            el.textContent = 'G';
            el.style.backgroundImage = 'none';
        });
        const profileAvatarEl = document.getElementById('profile-avatar-display');
        if(profileAvatarEl) {
            profileAvatarEl.textContent = 'G';
            profileAvatarEl.style.backgroundImage = 'none';
        }
        
        navigateTo('login');
    }

    // ═══════════════════════════════════════════
    // PROFILE UPLOAD
    // ═══════════════════════════════════════════
    function handleProfileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 400;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const compressedUrl = canvas.toDataURL('image/jpeg', 0.8);
                    
                    // Update profile avatar
                    const profileAvatar = document.getElementById('profile-avatar-display');
                    if (profileAvatar) {
                        profileAvatar.style.backgroundImage = `url(${compressedUrl})`;
                        profileAvatar.textContent = ''; // Hide initials
                    }
                    
                    // Update all header avatars
                    document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
                        el.style.backgroundImage = `url(${compressedUrl})`;
                        el.style.backgroundSize = 'cover';
                        el.style.backgroundPosition = 'center';
                        el.textContent = ''; // Hide initials
                    });
                    
                    // Simpan ke localStorage
                    if (currentEmail) {
                        try {
                            localStorage.setItem('sparingin_profile_pic_' + currentEmail, compressedUrl);
                        } catch(err) {
                            console.warn('Gagal menyimpan foto ke localStorage:', err);
                            alert('Gagal menyimpan foto! Mungkin ukurannya masih terlalu besar.');
                        }
                    }
                };
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    // ═══════════════════════════════════════════
    // BOOKING NAVIGATION
    // ═══════════════════════════════════════════
    async function handleBookingBack() {
        if (currentStep === 3) {
            const confirmed = await window.showConfirmModal("Apakah kamu ingin membatalkan transaksi ini?");
            if (!confirmed) {
                return;
            }
        }
        if (currentStep > 1) goToStep(currentStep - 1);
        else navigateTo('home');
    }

    function goToStep(step) {
        currentStep = step;
        document.querySelectorAll('.step-section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById('step-' + step);
        if (target) target.classList.add('active');

        document.querySelectorAll('.step-item').forEach(item => {
            const s = parseInt(item.getAttribute('data-step'));
            item.classList.remove('active', 'completed');
            if (s === step) item.classList.add('active');
            else if (s < step) item.classList.add('completed');
        });
        document.querySelectorAll('.step-line').forEach(line => {
            const l = parseInt(line.getAttribute('data-line'));
            line.classList.toggle('completed', l < step);
        });

        const titles = { 1: 'Booking Lapangan', 2: 'Pilih Jadwal', 3: 'Checkout & Pembayaran', 4: 'Booking Berhasil' };
        document.getElementById('back-bar-title').textContent = titles[step] || 'Booking';
        document.getElementById('booking-stepper').style.display = (step === 4) ? 'none' : 'flex';
        document.getElementById('booking-back-bar').style.display = (step === 3 || step === 4) ? 'none' : 'flex';

        if (step === 3) updateSummary();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ═══════════════════════════════════════════
    // SELECTIONS
    // ═══════════════════════════════════════════
    function selectSport(el) {
        document.querySelectorAll('.sport-option').forEach(opt => opt.classList.remove('selected'));
        el.classList.add('selected');
        el.querySelector('input').checked = true;
        selectedSport = el.querySelector('.sport-name').textContent;

        const sportKey = selectedSport.toLowerCase();

        // 1. Filter Locations in Step 1 using dynamic render
        if (typeof renderBookingLocations === 'function') {
            renderBookingLocations(sportKey);
        }

        // 2. Filter Fields in Step 2
        let firstVisibleField = null;
        document.querySelectorAll('#field-list .location-card').forEach(card => {
            const sports = card.getAttribute('data-sport') || '';
            if (sports.includes(sportKey)) {
                card.style.display = 'flex';
                if (!firstVisibleField) firstVisibleField = card;
            } else {
                card.style.display = 'none';
                card.classList.remove('selected');
            }
        });
        if (firstVisibleField) selectField(firstVisibleField);
    }

    function selectLocation(el) {
        el.closest('.location-list').querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        el.querySelector('input').checked = true;
        selectedLocation = el.querySelector('h4').textContent;
        
        selectedTimes = [];
        if(typeof renderTimeSlots === 'function') renderTimeSlots();
        updateSummary();
    }

    function selectField(el) {
        document.getElementById('step-2').querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        el.querySelector('input').checked = true;
        selectedField = el.querySelector('input').value;
        
        selectedTimes = [];
        if(typeof renderTimeSlots === 'function') renderTimeSlots();
        updateSummary();
    }

    function handleDateChange() {
        selectedTimes = [];
        if(typeof renderTimeSlots === 'function') renderTimeSlots();
        updateSummary();
    }

    function selectTimeslot(el) {
        if (el.classList.contains('disabled')) return;
        
        const time = el.textContent;
        if (selectedTimes.includes(time)) {
            // Deselect
            selectedTimes = selectedTimes.filter(t => t !== time);
            el.classList.remove('selected');
        } else {
            // Select
            selectedTimes.push(time);
            el.classList.add('selected');
        }
        selectedTimes.sort(); // keep them in chronological order
    }

    function validateStep2() {
        const dateVal = document.getElementById('date')?.value;
        if (!dateVal) {
            alert("⚠️ Peringatan: Silakan pilih Tanggal Bermain terlebih dahulu!");
            return;
        }
        if (selectedTimes.length === 0) {
            alert("⚠️ Peringatan: Silakan pilih minimal 1 Jam Bermain!");
            return;
        }
        goToStep(3);
    }

    // ═══════════════════════════════════════════
    // UPDATE SUMMARY & PRICE
    // ═══════════════════════════════════════════
    function fmt(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

    function updateSummary() {
        document.getElementById('summary-sport').textContent    = selectedSport;
        document.getElementById('summary-location').textContent = selectedLocation;
        document.getElementById('summary-field').textContent    = fieldNames[selectedField] || '-';

        const dateVal = document.getElementById('date').value;
        document.getElementById('summary-date').textContent = dateVal
            ? new Date(dateVal).toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
            : '-';
        
        document.getElementById('summary-time').textContent = selectedTimes.length > 0 
            ? selectedTimes.map(t => t + ':00').join(', ') + ' WIB' 
            : '-';

        const duration = selectedTimes.length || 1; // Default to 1 if none selected to show base price
        document.getElementById('summary-duration').textContent = duration + ' Jam';
        document.getElementById('summary-price-label').textContent = 'Sewa Lapangan (' + duration + ' jam)';

        const base  = (prices[selectedField] || 150000) * duration;
        const total = base + serviceFee;
        document.getElementById('price-base').textContent  = fmt(base);
        document.getElementById('price-total').textContent = fmt(total);
    }

    // ═══════════════════════════════════════════
    // PROCESS PAYMENT → SUCCESS
    // ═══════════════════════════════════════════
    function processPayment() {
        const now = new Date();
        const id = 'SPR-' + now.getFullYear().toString().slice(2) +
            String(now.getMonth()+1).padStart(2,'0') +
            String(now.getDate()).padStart(2,'0') + '-' +
            String(Math.floor(Math.random()*9999)).padStart(4,'0');

        document.getElementById('booking-id').textContent     = id;
        document.getElementById('final-sport').textContent    = selectedSport;
        document.getElementById('final-location').textContent = selectedLocation;
        document.getElementById('final-field').textContent    = fieldNames[selectedField] || '-';

        const dateVal = document.getElementById('date').value;
        let ds = '-';
        if (dateVal) ds = new Date(dateVal).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' });
        
        const timeStr = selectedTimes.length > 0 ? selectedTimes.map(t => t + ':00').join(', ') + ' WIB' : '-';
        document.getElementById('final-schedule').textContent = ds + ', ' + timeStr;

        const duration = selectedTimes.length || 1;
        const total = ((prices[selectedField] || 150000) * duration) + serviceFee;
        document.getElementById('final-total').textContent = fmt(total);

        // Save successful bookings to localStorage so they become unavailable
        const seedStr = (dateVal || '') + selectedLocation + selectedField;
        let existingBookings = JSON.parse(localStorage.getItem('sparingin_bookings') || '{}');
        if (!existingBookings[seedStr]) {
            existingBookings[seedStr] = [];
        }
        selectedTimes.forEach(t => {
            if (!existingBookings[seedStr].includes(t)) {
                existingBookings[seedStr].push(t);
            }
        });
        localStorage.setItem('sparingin_bookings', JSON.stringify(existingBookings));

        // Save invoice to Transaction History
        const historyKey = 'sparingin_history_' + currentEmail;
        let transactionHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        transactionHistory.push({
            id: id,
            sport: selectedSport,
            location: selectedLocation,
            field: fieldNames[selectedField],
            schedule: ds + ', ' + timeStr,
            total: fmt(total),
            timestamp: now.getTime()
        });
        localStorage.setItem(historyKey, JSON.stringify(transactionHistory));

        goToStep(4);
    }

    // ═══════════════════════════════════════════
    // RESET BOOKING
    // ═══════════════════════════════════════════
    function resetBooking() {
        selectedSport='Futsal'; selectedLocation='AM Bintaro Court'; selectedField='lap-1'; selectedTimes=[];

        document.querySelectorAll('.sport-option').forEach((o,i) => { o.classList.toggle('selected',i===0); o.querySelector('input').checked=(i===0); });
        document.querySelectorAll('#step-1 .location-card').forEach((c,i) => { c.classList.toggle('selected',i===0); c.querySelector('input').checked=(i===0); });
        document.querySelectorAll('#step-2 .location-card').forEach((c,i) => { c.classList.toggle('selected',i===0); c.querySelector('input').checked=(i===0); });
        document.querySelectorAll('.timeslot').forEach(t => t.classList.remove('selected'));
        
        const dateInput = document.getElementById('date');
        if (dateInput) dateInput.value = '';

        // Reset payment tabs to QRIS
        document.getElementById('pay-qris').checked = true;

        document.getElementById('booking-stepper').style.display = 'flex';
        document.getElementById('booking-back-bar').style.display = 'flex';
        goToStep(1);
    }

    function processMabarPayment() {
        if (!currentCheckoutMabar) return;
        const m = currentCheckoutMabar;
        const qty = window.currentMabarQty || 1;
        const ticketTotal = m.price * qty;
        const finalTotal = ticketTotal + 5000;

        const now = new Date();
        const id = 'MBR-' + now.getFullYear().toString().slice(2) +
            String(now.getMonth()+1).padStart(2,'0') +
            String(now.getDate()).padStart(2,'0') + '-' +
            String(Math.floor(Math.random()*9999)).padStart(4,'0');

        document.getElementById('succ-mabar-id').textContent = id;
        document.getElementById('succ-mabar-sport').textContent = m.sport;
        document.getElementById('succ-mabar-location').textContent = m.location;
        // Append qty to the title in success screen
        document.getElementById('succ-mabar-title').textContent = `${m.title} (${qty} Tiket)`;
        document.getElementById('succ-mabar-time').textContent = m.date + ', ' + m.time;
        document.getElementById('succ-mabar-total').textContent = fmt(finalTotal);

        // Deduct slots
        m.currentPlayers = m.currentPlayers - qty;
        // Update localStorage for mabarEvents
        if (typeof mabarEvents !== 'undefined') {
            localStorage.setItem('sparingin_mabar_events_v8', JSON.stringify(mabarEvents));
        }

        // Save to Transaction History
        const historyKey = 'sparingin_history_' + currentEmail;
        let transactionHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        transactionHistory.push({
            id: id,
            type: 'mabar',
            sport: m.sport,
            location: m.location,
            field: m.title + ` (${qty} Tiket)`,
            schedule: m.date + ', ' + m.time,
            total: fmt(finalTotal),
            timestamp: now.getTime()
        });
        localStorage.setItem(historyKey, JSON.stringify(transactionHistory));

        document.getElementById('mabar-checkout-container').style.display = 'none';
        document.getElementById('mabar-success-screen').style.display = 'block';
    }

    // ═══════════════════════════════════════════
    // GEOLOCATION & DYNAMIC VENUES DATABASE
    // ═══════════════════════════════════════════
    

    let userLocation = null; // { lat, lng, cityName, region }

    // Haversine Formula (returns distance in km)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in km
    }

    function renderBookingLocations(sportKey) {
        const list = document.getElementById('location-list');
        if(!list) return;
        list.innerHTML = '';
        
        const searchInput = document.getElementById('booking-search-input');
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        
        let filteredVenues = venuesDB.filter(v => v.sport.includes(sportKey));
        
        if (searchQuery) {
            // Search overrides location recommendation
            filteredVenues = filteredVenues.filter(v => 
                v.name.toLowerCase().includes(searchQuery) || 
                v.loc.toLowerCase().includes(searchQuery)
            );
        } else if (userLocation) {
            // Recommendation based on user region
            filteredVenues = filteredVenues.filter(v => v.region === userLocation.region);
            
            // Calculate exact distance
            filteredVenues.forEach(v => {
                v.calculatedDist = calculateDistance(userLocation.lat, userLocation.lng, v.lat, v.lng);
            });
            filteredVenues.sort((a,b) => a.calculatedDist - b.calculatedDist);
        }
        
        filteredVenues.forEach(v => {
            const isChecked = (selectedLocation === v.name) ? 'checked' : '';
            const isSelected = (selectedLocation === v.name) ? 'selected' : '';
            
            let distHtml = '';
            if (v.calculatedDist !== undefined && !searchQuery && userLocation) {
                distHtml = `<span style="font-size: 0.8rem; background: rgba(34,197,94,0.1); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: 4px; margin-left: 0.5rem;">📍 ${v.calculatedDist.toFixed(1)} km</span>`;
            }
            
            list.innerHTML += `
                <label class="location-card ${isSelected}" data-sport="${v.sport}" onclick="selectLocation(this)">
                    <input type="radio" name="location" value="${v.id}" ${isChecked}>
                    <div class="location-icon" style="background: ${v.grad}; font-size: 1.5rem;">${v.emoji}</div>
                    <div class="location-details">
                        <div style="display: flex; align-items: center; flex-wrap: wrap;">
                            <h4 style="margin:0;">${v.name}</h4>
                            ${distHtml}
                        </div>
                        <span style="margin-top: 0.25rem; display: block;">${v.loc} · ⭐ ${v.rating}</span>
                    </div>
                    <div class="location-check"></div>
                </label>
            `;
        });
        
        // Auto-select the first one if the current selectedLocation is no longer in the list
        if (filteredVenues.length > 0 && !filteredVenues.find(v => v.name === selectedLocation)) {
            const firstCard = list.querySelector('.location-card');
            if(firstCard) selectLocation(firstCard);
        } else if (filteredVenues.length === 0) {
            list.innerHTML = '<p style="color:var(--text-muted); font-size:14px; padding: 1rem 0;">Tidak ada lapangan yang cocok dengan pencarian Anda.</p>';
        }
    }

    function bookVenue(id) {
        const venue = venuesDB.find(v => v.id === id);
        if(!venue) return;
        
        selectedLocation = venue.name;
        
        const firstSport = venue.sport.split(' ')[0]; 
        selectedSport = firstSport.charAt(0).toUpperCase() + firstSport.slice(1);
        
        document.querySelectorAll('.sport-option').forEach(opt => {
            if(opt.querySelector('.sport-name').textContent.toLowerCase() === firstSport) {
                opt.classList.add('selected');
                opt.querySelector('input').checked = true;
            } else {
                opt.classList.remove('selected');
                opt.querySelector('input').checked = false;
            }
        });
        
        renderBookingLocations(firstSport);
        selectedTimes = [];
        renderTimeSlots();
        updateSummary();
        
        navigateTo('booking');
    }

    function renderTimeSlots() {
        const grid = document.getElementById('timeslot-grid');
        if(!grid) return;
        grid.innerHTML = '';
        const dateVal = document.getElementById('date').value;
        
        const seedStr = (dateVal || '') + selectedLocation + selectedField;
        let seed = 0;
        for(let i = 0; i < seedStr.length; i++) {
            seed = seedStr.charCodeAt(i) + ((seed << 5) - seed);
        }
        
        const existingBookings = JSON.parse(localStorage.getItem('sparingin_bookings') || '{}');
        const bookedForThisSeed = existingBookings[seedStr] || [];
        
        for (let hour = 8; hour <= 23; hour++) {
            const timeStr = String(hour).padStart(2, '0') + ':00';
            
            let x = Math.sin(seed++) * 10000;
            let rand = x - Math.floor(x);
            
            let isPast = false;
            const selectedDate = dateVal ? new Date(dateVal) : new Date(); // assume today if empty
            const now = new Date();
            now.setHours(0, 0, 0, 0); // normalize for date comparison
            const selDateNorm = new Date(selectedDate);
            selDateNorm.setHours(0, 0, 0, 0);
            
            if (selDateNorm.getTime() === now.getTime()) {
                if (hour <= new Date().getHours()) isPast = true;
            } else if (selDateNorm.getTime() < now.getTime()) {
                isPast = true;
            }
            
            const isBookedByUser = bookedForThisSeed.includes(timeStr);
            const isDisabled = isPast || (rand < 0.3) || isBookedByUser;
            const isSelected = selectedTimes.includes(timeStr);
            
            const classes = ['timeslot'];
            if (isDisabled) classes.push('disabled');
            if (isSelected && !isDisabled) classes.push('selected');
            
            const onClick = isDisabled ? '' : `onclick="selectTimeslot(this)"`;
            
            grid.innerHTML += `<div class="${classes.join(' ')}" ${onClick}>${timeStr}</div>`;
        }
    }

    let homeCurrentSport = 'semua';
    let homeShowNearest = false;

    function filterHomeVenues(sport, btnEl) {
        homeCurrentSport = sport;
        document.querySelectorAll('.home-filter-btn').forEach(btn => btn.classList.remove('active'));
        btnEl.classList.add('active');
        renderVenues();
    }

    function renderVenues() {
        const grid = document.getElementById('home-venue-grid');
        if (!grid) return;
        grid.innerHTML = ''; // Clear existing

        // Calculate distances and filter
        let displayVenues = venuesDB.map(v => {
            let dist = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, v.lat, v.lng) : null;
            return { ...v, calculatedDist: dist };
        });

        // Filter by sport
        if (homeCurrentSport !== 'semua') {
            displayVenues = displayVenues.filter(v => v.sport.includes(homeCurrentSport));
        }

        // Location Filter & Sorting
        if (userLocation) {
            // Tampilkan HANYA lapangan yang berada di region yang sama dengan pengguna
            displayVenues = displayVenues.filter(v => v.region === userLocation.region);
            
            // Sort by terfavorit (rating) and distance
            displayVenues.sort((a, b) => b.rating - a.rating || a.calculatedDist - b.calculatedDist);
            
            // Tampilkan maksimal 5 lapangan
            displayVenues = displayVenues.slice(0, 5);
            
            // Update subtitle
            const textEl = document.getElementById('user-location-text');
            if (textEl && userLocation.cityName) {
                 textEl.innerHTML = `📍 Berdasarkan lokasi Anda: <strong>${userLocation.cityName}</strong>`;
            }
        } else {
            // Sort by terfavorit (rating)
            displayVenues.sort((a, b) => b.rating - a.rating);
            
            // Tampilkan maksimal 5 lapangan
            displayVenues = displayVenues.slice(0, 5);
            
            const textEl = document.getElementById('user-location-text');
            if (textEl) {
                 textEl.innerHTML = `Temukan lapangan olahraga terbaik di sekitar Anda`;
            }
        }

        // Generate HTML
        displayVenues.forEach(v => {
            let distHtml = '';
            if (v.calculatedDist !== null) {
                distHtml = `<span class="venue-card-distance">📍 ${v.calculatedDist.toFixed(1)} km</span>`;
            }

            const cardHtml = `
                <div class="venue-card" data-sport="${v.sport}" onclick="bookVenue('${v.id}')">
                    <div class="venue-card-img" style="background: ${v.grad};">
                        <span class="venue-emoji">${v.emoji}</span>
                        ${distHtml}
                        <span class="venue-card-badge">Tersedia</span>
                    </div>
                    <div class="venue-card-body">
                        <h4>${v.name}</h4>
                        <div class="venue-loc">📍 ${v.loc}</div>
                        <div class="venue-meta">
                            <span class="venue-rating">⭐ ${v.rating}</span>
                            <span class="venue-price">Rp ${v.price.toLocaleString('id-ID')}/jam</span>
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += cardHtml;
        });

        if (displayVenues.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Tidak ada lapangan yang cocok dengan filter Anda.</p>';
        }
    }

    // ═══════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════
    (function() {
        // Cek Auto Login
        const savedEmail = localStorage.getItem('sparingin_logged_in_email');
        const savedName = localStorage.getItem('sparingin_logged_in_name');
        
        if (savedEmail) {
            let nameToUse = savedName;
            
            if (!nameToUse) {
                let users = JSON.parse(localStorage.getItem('sparingin_users') || '{}');
                if (users[savedEmail]) nameToUse = users[savedEmail].name;
                else if (typeof demoAccounts !== 'undefined' && demoAccounts[savedEmail]) nameToUse = demoAccounts[savedEmail].name;
            }
            
            if (nameToUse) {
                loggedInUser = nameToUse;
                currentEmail = savedEmail;
                navigateTo('home');
            }
        }
    })();

    // ═══════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════
    function toggleMobileMenu() {
        const navs = document.querySelectorAll('.header-nav');
        navs.forEach(nav => nav.classList.toggle('show'));
    }

    // ==========================================================
    // CARI LAWAN LOGIC
    // ==========================================================
    let currentMatchMode = 'individu';

    window.setMatchMode = function(mode) {
        currentMatchMode = mode;
        const btnIndividu = document.getElementById('toggle-individu');
        const btnTim = document.getElementById('toggle-tim');
        if (btnIndividu) btnIndividu.classList.toggle('active', mode === 'individu');
        if (btnTim) btnTim.classList.toggle('active', mode === 'tim');
        if (typeof window.renderMatchFeed === 'function') window.renderMatchFeed();
    };

    window.renderMatchFeed = function() {
        const container = document.getElementById('match-feed-container');
        if (!container) return;

        const locFilter = document.getElementById('filter-location')?.value || 'all';
        const sportFilter = document.getElementById('filter-sport')?.value || 'all';
        const levelFilter = document.getElementById('filter-level')?.value || 'all';

        // Filter data
        const matches = typeof matchmakingDB !== 'undefined' ? matchmakingDB.filter(m => {
            const matchMode = m.type === currentMatchMode;
            const matchLoc = locFilter === 'all' || m.city === locFilter;
            const matchSport = sportFilter === 'all' || m.sport === sportFilter;
            const matchLevel = levelFilter === 'all' || m.level === levelFilter;
            return matchMode && matchLoc && matchSport && matchLevel;
        }) : [];

        if (matches.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:2rem;">Tidak ada match yang tersedia untuk filter ini.</p>';
            return;
        }

        container.innerHTML = matches.map(m => {
            let actionBtn = '';
            if (currentMatchMode === 'individu') {
                actionBtn = `<button class="btn btn-join btn-join-primary" onclick="alert('Join individu di ${m.hostName}!')">JOIN INDIVIDU</button>`;
            } else {
                actionBtn = `<button class="btn btn-join btn-join-primary" onclick="alert('Tantang tim ${m.hostName}!')">TANTANG TIM INI</button>`;
            }

            return `
                <div class="match-card">
                    <div class="match-card-header">
                        <div class="match-info-left">
                            <div class="match-sport-icon">${m.sportIcon}</div>
                            <div>
                                <div class="match-host">${m.hostName}</div>
                                <div class="match-location">📍 ${m.location}</div>
                            </div>
                        </div>
                        <div class="match-badge ${m.level.toLowerCase()}">${m.level}</div>
                    </div>
                    
                    <div class="match-details">
                        <div class="detail-item">👥 ${m.currentPlayers}/${m.maxPlayers} ${currentMatchMode === 'tim' ? 'tim' : 'player'}</div>
                        <div class="detail-item">📅 ${m.date}</div>
                        <div class="detail-item">⏰ ${m.time}</div>
                    </div>

                    <div class="match-actions single">
                        ${actionBtn}
                    </div>
                </div>
            `;
        }).join('');
    };

    // ═══════════════════════════════════════════
    // RENDER TRANSAKSI (INVOICE HISTORY)
    // ═══════════════════════════════════════════
    function renderTransaksi() {
        const listContainer = document.getElementById('transaksi-list');
        if (!listContainer) return;

        const historyKey = 'sparingin_history_' + currentEmail;
        let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        if (history.length === 0) {
            listContainer.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 3rem;">Belum ada riwayat pemesanan.</div>';
            return;
        }

        // Sort from newest to oldest
        history.sort((a, b) => b.timestamp - a.timestamp);

        listContainer.innerHTML = history.map(item => {
            const isTournament = item.type === 'tournament';
            const labelStr = isTournament ? 'Turnamen / Tim' : (item.type === 'mabar' ? 'Penyelenggara / Tim' : 'Lapangan');
            const idStr = isTournament ? 'Reg ID' : (item.type === 'mabar' ? 'Mabar ID' : 'Booking ID');

            return `
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">${idStr}</span>
                        <div style="font-weight: 700; color: var(--primary); font-family: monospace; font-size: 1.1rem;">${item.id}</div>
                    </div>
                    <span style="background: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 0.4rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem; border: 1px solid rgba(34, 197, 94, 0.2);">BERHASIL</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">Olahraga</span>
                        <div style="font-weight: 600;">${item.sport}</div>
                    </div>
                    <div>
                        <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">Lokasi</span>
                        <div style="font-weight: 600;">${item.location}</div>
                    </div>
                    <div style="grid-column: span 2;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${labelStr}</span>
                        <div style="font-weight: 600;">${item.field}</div>
                    </div>
                    <div style="grid-column: span 2;">
                        <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">Jadwal Bermain</span>
                        <div style="font-weight: 600;">${item.schedule}</div>
                    </div>
                </div>
                <div style="border-top: 1px solid var(--border); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">Total Pembayaran</span>
                    <span style="font-weight: 800; color: var(--accent); font-size: 1.2rem;">${item.total}</span>
                </div>
            </div>
            `;
        }).join('');
    }

    // ==========================================================
    // EVENT / TURNAMEN LOGIC
    // ==========================================================
    window.switchEventTab = function(tabName) {
        const btnJoin = document.getElementById('btn-tab-join-events');
        const btnBuat = document.getElementById('btn-tab-buat-event');
        
        if(btnJoin) btnJoin.classList.toggle('active', tabName === 'join');
        if(btnBuat) btnBuat.classList.toggle('active', tabName === 'buat');
        
        const tabJoin = document.getElementById('tab-join-events');
        const tabBuat = document.getElementById('tab-buat-event');
        
        if(tabJoin) tabJoin.style.display = tabName === 'join' ? 'block' : 'none';
        if(tabBuat) tabBuat.style.display = tabName === 'buat' ? 'block' : 'none';
        
        const filterBar = document.querySelector('.match-filter-bar');
        if (filterBar) {
            filterBar.style.display = tabName === 'join' ? 'flex' : 'none';
        }

        if (tabName === 'join' && typeof renderTournaments === 'function') {
            renderTournaments();
        }
    };

    window.filterEvents = function() {
        if (typeof renderTournaments === 'function') renderTournaments();
    };

    window.renderTournaments = function() {
        const container = document.getElementById('event-feed-list');
        if (!container) return;

        const locFilter = document.getElementById('event-city-filter')?.value || 'all';
        const sportFilter = document.getElementById('event-sport-filter')?.value || 'all';

        const events = typeof tournamentEvents !== 'undefined' ? tournamentEvents.filter(t => {
            const matchLoc = locFilter === 'all' || t.city === locFilter;
            const matchSport = sportFilter === 'all' || t.sport === sportFilter;
            return matchLoc && matchSport;
        }) : [];

        if (events.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:var(--text-muted); padding:2rem; grid-column: 1/-1;">Tidak ada turnamen yang tersedia untuk filter ini.</p>';
            return;
        }

        container.innerHTML = events.map(t => {
            const isIndividu = (t.sport === 'Badminton' || t.sport === 'Padel');
            const regTypeLabel = isIndividu ? 'Individu' : 'Tim';
            
            return `
                <div class="match-card" style="border: 1px solid ${t.color}50; background: linear-gradient(145deg, var(--bg-surface), ${t.bg});">
                    <div class="match-card-header">
                        <div class="match-info-left">
                            <div class="match-sport-icon" style="background: ${t.color}20; color: ${t.color};">${t.sportIcon}</div>
                            <div>
                                <div class="match-host" style="font-size: 1.2rem; margin-bottom: 0.2rem;">${t.title}</div>
                                <div class="match-location">🏢 ${t.organizer}</div>
                            </div>
                        </div>
                        <div class="match-badge" style="background: ${t.color}; color: #fff;">Rp ${(t.prizePool/1000000).toFixed(1)} JUTA</div>
                    </div>
                    
                    <div class="match-details" style="margin-top: 1rem;">
                        <div class="detail-item" style="flex: 1 1 100%;">📍 ${t.location}, ${t.city}</div>
                        <div class="detail-item">📅 ${t.date}</div>
                        <div class="detail-item">👥 ${t.currentSlots}/${t.maxSlots} ${regTypeLabel}</div>
                        <div class="detail-item" style="color: var(--accent); font-weight: 800; flex: 1 1 100%;">💰 Biaya: Rp ${t.fee.toLocaleString('id-ID')} / ${regTypeLabel}</div>
                    </div>

                    <div class="match-actions single" style="margin-top: 1.5rem;">
                        <button class="btn btn-join btn-join-primary" style="background: ${t.color}; border: none;" onclick="handleJoinTournament('${t.id}')">DAFTAR TURNAMEN</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    window.handleJoinTournament = function(id) {
        if (!loggedInUser) {
            alert('Silakan login terlebih dahulu untuk mendaftar turnamen.');
            navigateTo('login');
            return;
        }
        
        const event = tournamentEvents.find(t => t.id === id);
        if(!event) return;
        
        if (event.currentSlots >= event.maxSlots) {
            alert('Maaf, kuota pendaftaran turnamen ini sudah penuh.');
            return;
        }

        const isIndividu = (event.sport === 'Badminton' || event.sport === 'Padel');
        let regName = loggedInUser;
        
        if (!isIndividu) {
            regName = prompt(`Turnamen ${event.sport} ini membutuhkan pendaftaran secara Tim. Silakan masukkan NAMA TIM Anda:`);
            if (!regName || regName.trim() === '') {
                return; // cancelled
            }
        } else {
            const confirmJoin = confirm(`Anda akan mendaftar ke ${event.title} secara individu. Lanjutkan?`);
            if (!confirmJoin) return;
        }
        
        alert(`Berhasil! Anda (atas nama ${regName}) telah terdaftar di turnamen ${event.title}. Silakan cek riwayat di halaman Transaksi (Simulasi).`);
        
        // Push to history
        const historyKey = 'sparingin_history_' + currentEmail;
        let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        history.push({
            id: 'TRX-EVT-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            type: 'tournament',
            sport: event.sport,
            location: event.location,
            field: event.title + ` (Pendaftar: ${regName})`,
            schedule: event.date,
            total: `Rp ${event.fee.toLocaleString('id-ID')}`,
            timestamp: Date.now()
        });
        localStorage.setItem(historyKey, JSON.stringify(history));
        
        // Tambah kuota (simulasi)
        event.currentSlots += 1;
        localStorage.setItem('sparingin_tournament_events_v1', JSON.stringify(tournamentEvents));
        renderTournaments();
    };

    window.handleCreateTournament = function(e) {
        e.preventDefault();
        
        if (!loggedInUser) {
            alert('Silakan login terlebih dahulu untuk membuat turnamen.');
            navigateTo('login');
            return;
        }

        const title = document.getElementById('ce-title').value;
        const organizer = document.getElementById('ce-organizer').value;
        const sport = document.getElementById('ce-sport').value;
        const city = document.getElementById('ce-city').value;
        const location = document.getElementById('ce-location').value;
        const date = document.getElementById('ce-date').value;
        const maxSlots = parseInt(document.getElementById('ce-max-slots').value);
        const fee = parseInt(document.getElementById('ce-fee').value);
        const prizePool = parseInt(document.getElementById('ce-prize').value);

        const sportIcons = { 'Futsal': '⚽', 'Basket': '🏀', 'Badminton': '🏸', 'Padel': '🎾' };
        const sportColors = { 'Futsal': '#22c55e', 'Basket': '#ef4444', 'Badminton': '#a855f7', 'Padel': '#f59e0b' };

        const newEvent = {
            id: 't_user_' + Math.random().toString(36).substr(2, 6),
            title: title,
            organizer: organizer,
            sport: sport,
            sportRaw: sport.toLowerCase(),
            sportIcon: sportIcons[sport] || '🏆',
            location: location,
            city: city,
            date: date,
            fee: fee,
            prizePool: prizePool,
            currentSlots: 0,
            maxSlots: maxSlots,
            color: sportColors[sport] || '#22c55e',
            bg: 'rgba(255,255,255,0.05)'
        };

        const btnSubmit = document.getElementById('btn-submit-event');
        btnSubmit.textContent = 'Menyimpan...';
        btnSubmit.disabled = true;

        setTimeout(() => {
            tournamentEvents.unshift(newEvent);
            localStorage.setItem('sparingin_tournament_events_v1', JSON.stringify(tournamentEvents));
            
            alert('Turnamen berhasil diterbitkan!');
            document.getElementById('create-event-form').reset();
            
            btnSubmit.textContent = 'Terbitkan Turnamen';
            btnSubmit.disabled = false;
            
            switchEventTab('join');
        }, 1000);
    };
