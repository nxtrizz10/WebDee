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
    // PAGE NAVIGATION
    // ═══════════════════════════════════════════
    async function navigateTo(page) {
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
            if (typeof renderVenues === 'function') renderVenues();
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
            
            if (!userLocation && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const distToCiledug = calculateDistance(lat, lng, -6.233, 106.716);
                        const distToUPJ = calculateDistance(lat, lng, -6.284, 106.728);
                        const detectedRegion = distToCiledug < distToUPJ ? 'ciledug' : 'upj';
                        userLocation = { lat, lng, cityName: 'Area Anda', region: detectedRegion };
                        renderBookingLocations(currentSportVal);
                    },
                    (error) => {
                        renderBookingLocations(currentSportVal); // fallback to default
                    }
                );
            } else {
                renderBookingLocations(currentSportVal);
            }
            
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
    }

    // ═══════════════════════════════════════════
    // LOGIN / LOGOUT
    // ═══════════════════════════════════════════
    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const pass  = document.getElementById('login-password').value;
        const errorBox  = document.getElementById('login-error');
        const errorText = document.getElementById('login-error-text');

        if (!email || !pass) {
            errorText.textContent = 'Silakan masukkan email dan password.';
            errorBox.classList.add('show');
            return;
        }

        const account = demoAccounts[email];
        if (!account || account.password !== pass) {
            errorText.textContent = 'Email atau password salah. Silakan coba lagi.';
            errorBox.classList.add('show');
            return;
        }

        errorBox.classList.remove('show');
        loggedInUser = account.name;
        currentEmail = email;
        localStorage.setItem('sparingin_logged_in_email', currentEmail);
        
        // Cek apakah ada foto profil yang tersimpan di localStorage
        const savedAvatar = localStorage.getItem('sparingin_profile_pic_' + currentEmail);

        document.querySelectorAll('[id^="header-user-name"]').forEach(el => el.textContent = 'Halo, ' + account.name);
        
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
                el.textContent = account.name.substring(0, 2).toUpperCase();
                el.style.backgroundImage = 'none';
            });
            if(profileAvatarEl) {
                profileAvatarEl.textContent = account.name.substring(0, 2).toUpperCase();
                profileAvatarEl.style.backgroundImage = 'none';
            }
        }

        // Update Profile Page Data
        const username = email.split('@')[0];
        const profileNameEl = document.getElementById('profile-name-display');
        if(profileNameEl) profileNameEl.textContent = account.name.toUpperCase();
        
        const profileUsernameEl = document.querySelector('.profile-username');
        if(profileUsernameEl) profileUsernameEl.textContent = `@${username} • Jakarta`;

        navigateTo('home');
    }

    function handleLogout() {
        loggedInUser = null;
        currentEmail = null;
        localStorage.removeItem('sparingin_logged_in_email');
        currentStep = 1;
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        document.getElementById('login-error').classList.remove('show');
        
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
                const imageUrl = e.target.result;
                
                // Update profile avatar
                const profileAvatar = document.getElementById('profile-avatar-display');
                if (profileAvatar) {
                    profileAvatar.style.backgroundImage = `url(${imageUrl})`;
                    profileAvatar.textContent = ''; // Hide initials
                }
                
                // Update all header avatars
                document.querySelectorAll('[id^="header-user-avatar"]').forEach(el => {
                    el.style.backgroundImage = `url(${imageUrl})`;
                    el.style.backgroundSize = 'cover';
                    el.style.backgroundPosition = 'center';
                    el.textContent = ''; // Hide initials
                });
                
                // Simpan ke localStorage agar tidak hilang saat direfresh
                if (currentEmail) {
                    try {
                        localStorage.setItem('sparingin_profile_pic_' + currentEmail, imageUrl);
                    } catch(err) {
                        console.warn('Gagal menyimpan foto ke localStorage, mungkin ukuran terlalu besar.');
                    }
                }
            }
            reader.readAsDataURL(file);
        }
    }

    // ═══════════════════════════════════════════
    // BOOKING NAVIGATION
    // ═══════════════════════════════════════════
    function handleBookingBack() {
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
        document.getElementById('booking-back-bar').style.display = (step === 4) ? 'none' : 'flex';

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
        let transactionHistory = JSON.parse(localStorage.getItem('sparingin_history') || '[]');
        transactionHistory.push({
            id: id,
            sport: selectedSport,
            location: selectedLocation,
            field: fieldNames[selectedField] || '-',
            schedule: ds + ', ' + timeStr,
            total: fmt(total),
            timestamp: now.getTime()
        });
        localStorage.setItem('sparingin_history', JSON.stringify(transactionHistory));

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

    function toggleNearest() {
        const btn = document.getElementById('btn-nearest');
        
        if (!homeShowNearest) {
            // Aktifkan Filter Lokasi
            homeShowNearest = true;
            btn.classList.add('active');
            btn.innerHTML = '⏳ Mendeteksi Lokasi...';
            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        // Deteksi Region Berdasarkan Kedekatan ke Titik Pusat
                        const distToCiledug = calculateDistance(lat, lng, -6.233, 106.716);
                        const distToUPJ = calculateDistance(lat, lng, -6.284, 106.728);
                        const detectedRegion = distToCiledug < distToUPJ ? 'ciledug' : 'upj';
                        
                        userLocation = { lat, lng, cityName: 'Area Anda', region: detectedRegion };
                        
                        // Reverse Geocoding via Nominatim
                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                            const data = await res.json();
                            const city = data.address.city || data.address.town || data.address.village || data.address.suburb || 'Lokasi Anda';
                            userLocation.cityName = city;
                            document.getElementById('user-location-text').innerHTML = `📍 Berdasarkan lokasi Anda: <strong>${city}</strong>`;
                        } catch (e) {
                            document.getElementById('user-location-text').innerHTML = `📍 Berdasarkan koordinat GPS Anda`;
                        }

                        btn.innerHTML = '📍 Filter Terdekat (Aktif)';
                        renderVenues();
                    },
                    (error) => {
                        alert('Gagal mendeteksi lokasi atau akses ditolak. Pastikan izin lokasi (GPS) browser Anda aktif.');
                        homeShowNearest = false;
                        btn.classList.remove('active');
                        btn.innerHTML = '📍 Tampilkan Terdekat';
                        renderVenues();
                    }
                );
            } else {
                alert('Browser Anda tidak mendukung Geolocation.');
                homeShowNearest = false;
                btn.classList.remove('active');
                btn.innerHTML = '📍 Tampilkan Terdekat';
            }
        } else {
            // Matikan Filter
            homeShowNearest = false;
            userLocation = null;
            btn.classList.remove('active');
            btn.innerHTML = '📍 Tampilkan Terdekat';
            document.getElementById('user-location-text').innerHTML = 'Temukan lapangan olahraga terbaik di sekitar Anda';
            renderVenues();
        }
    }

    function renderVenues() {
        const grid = document.getElementById('home-venue-grid');
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
        if (homeShowNearest && userLocation) {
            // Tampilkan HANYA lapangan yang berada di region yang sama dengan pengguna
            displayVenues = displayVenues.filter(v => v.region === userLocation.region);
            
            // Sort by nearest distance
            displayVenues.sort((a, b) => a.calculatedDist - b.calculatedDist);
        } else if (homeCurrentSport === 'semua') {
            // Default home view (top rated)
            displayVenues.sort((a, b) => b.rating - a.rating);
            displayVenues = displayVenues.slice(0, 4);
        } else {
            displayVenues.sort((a, b) => a.name.localeCompare(b.name));
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
        if (savedEmail && typeof demoAccounts !== 'undefined' && demoAccounts[savedEmail]) {
            loggedInUser = demoAccounts[savedEmail].name;
            currentEmail = savedEmail;
            navigateTo('home');
        }
    })();

    // ═══════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════
    function toggleMobileMenu() {
        const navs = document.querySelectorAll('.header-nav');
        navs.forEach(nav => nav.classList.toggle('show'));
    }

    // ═══════════════════════════════════════════
    // RENDER TRANSAKSI (INVOICE HISTORY)
    // ═══════════════════════════════════════════
    function renderTransaksi() {
        const listContainer = document.getElementById('transaksi-list');
        if (!listContainer) return;

        let history = JSON.parse(localStorage.getItem('sparingin_history') || '[]');
        
        if (history.length === 0) {
            listContainer.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 3rem;">Belum ada riwayat pemesanan.</div>';
            return;
        }

        // Sort from newest to oldest
        history.sort((a, b) => b.timestamp - a.timestamp);

        listContainer.innerHTML = history.map(item => `
            <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">
                    <div>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Booking ID</span>
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
                        <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">Lapangan</span>
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
        `).join('');
    }
