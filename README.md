<div align="center">

# Sparing-In

**Platform Booking Lapangan & Cari Lawan Sparing Terbaik di Indonesia**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Google Sign-In](https://img.shields.io/badge/Google%20Sign--In-4285F4?style=for-the-badge&logo=google&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](#)

*Temukan lapangan olahraga terbaik, cari lawan sparing, dan ikuti turnamen — semua dalam satu platform.*

</div>

---

## 📖 Tentang Projek

**Sparing-In** adalah aplikasi web all-in-one yang dirancang untuk para pecinta olahraga di Indonesia. Platform ini memungkinkan pengguna untuk melakukan booking lapangan olahraga, mencari partner atau lawan sparing, serta mengikuti event dan turnamen — semuanya dalam satu tempat.

Aplikasi ini dibangun sebagai **Single Page Application (SPA)** menggunakan Vanilla JavaScript murni tanpa framework tambahan, menunjukkan pemahaman mendalam terhadap fundamental web development. UI/UX dirancang dengan pendekatan *dark-mode modern* yang responsif untuk berbagai ukuran layar.

> **Catatan:** Projek ini dikembangkan sebagai bagian dari mata kuliah Semester 8 di Universitas Pembangunan Jaya (UPJ).

---

## 🔗 Referensi & Tautan Penting

| | Tautan |
|---|---|
| 🌐 **Live Demo** | [web-dee.vercel.app](https://web-dee.vercel.app/) |
| 📦 **Repository** | [github.com/nxtrizz10/WebDee](https://github.com/nxtrizz10/WebDee) |

---

## ✨ Fitur Utama

### 🏟️ Booking Lapangan
Sistem booking lapangan olahraga dengan alur step-by-step yang intuitif:
* **Multi-Cabang Olahraga:** Mendukung Futsal, Basket, Badminton, dan Padel.
* **Pilih Lokasi:** Database lapangan di berbagai wilayah (Ciledug, Bintaro/UPJ, Jakarta Selatan, Jakarta Pusat) lengkap dengan rating & harga.
* **Pilih Jadwal:** Kalender interaktif dengan time-slot per jam, dilengkapi indikator ketersediaan.
* **Stepper Navigation:** Proses booking terbagi menjadi 4 tahap — Lokasi → Jadwal → Checkout → Konfirmasi.

### 🤝 Cari Lawan (Mabar & Sparing)
Temukan teman main atau lawan tanding secara mudah:
* **Mode Mabar (Main Bareng):** Gabung ke sesi bermain bersama yang sudah terjadwal, lihat jumlah slot yang tersedia.
* **Mode Sparing:** Tantang tim lawan untuk pertandingan kompetitif 1v1 antar tim.
* **Filter Lengkap:** Saring berdasarkan cabang olahraga, kota, dan level kemampuan (Newbie, Beginner, Intermediate).
* **Buat Event Sendiri:** Pengguna dapat membuat event mabar atau sparing custom.

### 🏆 Event & Turnamen
Kelola dan ikuti berbagai turnamen olahraga:
* **Daftar Turnamen:** Lihat turnamen yang tersedia lengkap dengan biaya pendaftaran, prize pool, dan slot peserta.
* **Filter & Pencarian:** Filter berdasarkan cabang olahraga, kota, dan ketersediaan slot.
* **Buat Turnamen:** Fitur pembuatan event turnamen baru dengan pengaturan lengkap.
* **Featured Events:** Sorotan turnamen populer yang direkomendasikan.

### 💳 Pembayaran Terintegrasi
Dua metode pembayaran yang aman dan praktis:
* **QRIS:** Scan barcode langsung dari aplikasi M-Banking atau e-Wallet.
* **Kartu Debit/Kredit:** Form pembayaran dengan tampilan *credit card preview* yang interaktif.
* **Rincian Harga:** Breakdown biaya transparan (sewa lapangan + biaya layanan).

### 🔐 Autentikasi Multi-Mode
Sistem login yang aman dan fleksibel:
* **Login Konvensional:** Username/email dan password dengan demo account.
* **Google Sign-In:** Integrasi OAuth 2.0 via Google Identity Services untuk login cepat.
* **Registrasi:** Form pendaftaran akun baru langsung di dalam aplikasi.
* **Toggle Show/Hide Password:** UX detail dengan animasi ikon mata.

### 👤 Profil Pengguna
Halaman profil dengan informasi lengkap:
* **Upload Foto Profil:** Ganti avatar dengan foto dari perangkat.
* **Statistik Bermain:** Total pertandingan, jumlah teman, dan rating.
* **Pengaturan Akun:** Edit informasi pribadi, preferensi olahraga, dan level bermain.

### 📍 Geolocation & Sorting Lokasi
* **Deteksi Lokasi Otomatis:** Menggunakan `navigator.geolocation` untuk mendeteksi posisi pengguna.
* **Sorting Terdekat:** Lapangan diurutkan berdasarkan jarak dari posisi pengguna secara real-time.

### 📜 Riwayat Transaksi
* **Invoice Lengkap:** Daftar semua transaksi booking dengan detail lengkap.
* **Status Tracking:** Pantau status pembayaran dan konfirmasi booking.

---

## 🛠️ Tech Stack & Arsitektur

### Frontend (Client-Side)
Dibangun menggunakan teknologi web fundamental tanpa dependensi framework:

| Kategori | Teknologi |
|---|---|
| **Struktur** | HTML5 (Semantic Markup) |
| **Styling** | CSS3 (Custom Properties, Flexbox, Grid, Animations, Dark Theme) |
| **Logika** | Vanilla JavaScript ES6+ (SPA Architecture) |
| **Auth** | Google Identity Services (OAuth 2.0) |
| **Geo** | Web Geolocation API |
| **Deploy** | Vercel (Static Hosting) |

### Arsitektur Aplikasi
Menggunakan pendekatan **Single Page Application (SPA)** murni:

```
📦 WebDee/
├── 📄 index.html              # Entry point & page containers
├── 📂 css/
│   └── 🎨 style.css           # Seluruh styling (64KB, dark theme)
├── 📂 js/
│   ├── 📊 data.js             # Database venues, events & tournaments
│   └── ⚙️ app.js              # Core logic, routing & state management
├── 📂 pages/
│   ├── 🏠 beranda.js          # Halaman Beranda / Dashboard
│   ├── 🏟️ booking.js          # Fitur Booking Lapangan (Step-based)
│   ├── 🤝 cari-lawan.js       # Fitur Mabar & Sparing
│   ├── 🏆 event.js            # Fitur Event & Turnamen
│   ├── 👤 profile.js          # Halaman Profil Pengguna
│   └── 📜 transaksi.js        # Riwayat Transaksi & Invoice
└── 📂 assets/
    └── 📂 images/
        ├── 🖼️ logo.jpeg        # Logo aplikasi
        └── 📱 qris_barcode.jpeg # Barcode QRIS pembayaran
```

### Konsep SPA yang Diterapkan
* **Client-Side Routing:** Navigasi halaman tanpa reload menggunakan JavaScript DOM manipulation.
* **Template Literals:** Setiap halaman didefinisikan sebagai template string yang di-inject ke DOM secara dinamis.
* **State Management:** Pengelolaan state aplikasi menggunakan variabel global dan `localStorage`.
* **Component Pattern:** Modularisasi kode dengan memisahkan halaman ke file JavaScript terpisah.

---

## 🎨 Desain & UI/UX

* **Dark Mode:** Tema gelap yang modern dan nyaman untuk mata dengan CSS Custom Properties.
* **Responsive Design:** Layout yang adaptif untuk desktop, tablet, dan mobile.
* **Micro-Interactions:** Animasi hover, transisi halaman, dan feedback visual yang halus.
* **Mobile Menu:** Hamburger menu dengan navigasi responsif untuk layar kecil.
* **Custom Components:** Dropdown kustom, stepper, modal konfirmasi, dan card interaktif.

---

## 🚀 Cara Menjalankan

### Prasyarat
* Browser modern (Chrome, Firefox, Edge, Safari)
* Koneksi internet (untuk Google Sign-In & font loading)

### Akses Online (Rekomendasi)
Langsung kunjungi live demo:

```
https://web-dee.vercel.app/
```

### Jalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/nxtrizz10/WebDee.git

# 2. Masuk ke direktori projek
cd WebDee

# 3. Buka file index.html di browser
# Atau gunakan Live Server extension di VS Code
```

### Demo Account
Gunakan salah satu akun berikut untuk login:

| Username | Password |
|---|---|
| `admin` | `admin123` |
| `lando` | `lando123` |
| `christopher` | `christopher123` |

Atau gunakan **Google Sign-In** untuk masuk dengan akun Google Anda.

---

## 🗺️ Cakupan Wilayah

Saat ini, database lapangan mencakup beberapa wilayah di Jabodetabek:

| Wilayah | Cabang Olahraga |
|---|---|
| 📍 Ciledug | Futsal, Badminton, Padel |
| 📍 Bintaro / UPJ | Futsal, Basket, Badminton, Padel |
| 📍 Jakarta Selatan | Futsal, Basket, Badminton, Padel |
| 📍 Jakarta Pusat | Futsal, Basket, Badminton, Padel |

---

## 👨‍💻 Pengembang

<div align="center">

Dibuat dengan ❤️ oleh **Gregorius Rizcy** ([@nxtrizz10](https://github.com/nxtrizz10))

Universitas Pembangunan Jaya — Semester 8

</div>
