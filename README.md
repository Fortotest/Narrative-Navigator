# 🧭 Narrative Navigator

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=swr&logoColor=white)

## 1. Project Definition

### What is this project?
**Narrative Navigator** adalah sebuah *dashboard* analitik *crypto* yang cerdas. Aplikasi ini berfokus untuk membantu pengguna mengidentifikasi dan melacak "narasi" pasar yang sedang tren.

Ini bukan sekadar pelacak portofolio biasa; aplikasi ini menggabungkan data pasar *real-time* dari CoinGecko dengan *insight* yang dihasilkan oleh AI generatif untuk memberikan ringkasan singkat tentang mengapa aset tertentu bergerak.

### The Problem It Solves 🤔
* Investor crypto sering "terlambat" masuk ke sebuah narasi (misal: AI, RWA, DePIN).
* Data pasar terpisah dari berita dan sentimen sosial.
* Sulit membedakan antara *noise* (kebisingan) dan sinyal yang benar-benar penting.
* Membutuhkan waktu berjam-jam untuk meriset mengapa sebuah *watchlist* bergerak.

### The Solution Provided ✅
**Narrative Navigator** menyediakan platform terintegrasi yang:
1.  **Menggabungkan Data:** Menarik data harga *real-time* (via CoinGecko) dan berita.
2.  **Menyediakan Wawasan AI:** AI generatif menganalisis data dan berita untuk menyarankan narasi yang relevan dengan aset di *watchlist* pengguna.
3.  **Personalisasi:** Pengguna dapat membuat *watchlist* pribadi yang disimpan dengan aman di Firestore.
4.  **Efisiensi:** Menggunakan Firebase Functions sebagai *backend* dan SWR untuk *data fetching* yang efisien dan *caching* di sisi klien.

---

## 2. Tech Stack 🛠️

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Platform & Backend:** [Firebase](https://firebase.google.com/)
    * **Autentikasi:** Firebase Authentication (Login Google)
    * **Database:** Firestore (untuk menyimpan *watchlist* pengguna)
    * **Serverless:** Firebase Functions (untuk *proxy* API CoinGecko & AI)
    * **Hosting:** Firebase App Hosting
* **Data Fetching (Client):** [SWR](https://swr.vercel.app/) (untuk *caching* dan revalidasi data pasar)
* **Data API:** [CoinGecko API](https://www.coingecko.com/en/api)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Komponen UI:** [Shadcn/ui](https://ui.shadcn.com/) (terdeteksi dari `components.json`)

---

## 3. Key Features ✨

* **User Authentication:** Login/Daftar aman menggunakan akun Google via Firebase Auth.
* **User Profile:** Menampilkan informasi profil pengguna (avatar dan username) setelah login.
* **Watchlist Management:** Fitur untuk menambah dan menghapus aset kripto dari *watchlist* personal, yang tersimpan di Firestore.
* **Real-time Market Data:** Mengambil dan menampilkan data pasar *real-time* (harga, volume, dll.) dari CoinGecko.
* **Efficient Data Fetching:** Menggunakan Firebase Function sebagai *backend* dan SWR di *frontend* untuk *data fetching* dan *caching* yang optimal.
* **Personalized Narrative Tool:** Fitur utama berupa *tool* Generative AI yang menganalisis aset di *watchlist* pengguna dan data pasar terkini untuk memberikan ringkasan narasi yang relevan.
* **Clear UI/UX:** Menampilkan *loading spinner* dan pesan *error* yang jelas untuk memberikan *feedback* instan kepada pengguna.

---

## 4. Style Guidelines 🎨

Desain UI aplikasi ini mengikuti panduan berikut untuk nuansa inovatif dan modern:

* **Primary Color:** Vibrant Purple (`#7F56D9`) - Menyampaikan inovasi dan kecanggihan.
* **Background Color:** Light Gray/Desaturated Purple (`#F5F3FF`) - Latar belakang yang bersih dan modern.
* **Accent Color:** Electric Blue (`#5046E5`) - Untuk menyorot elemen interaktif dan CTA.
* **Font (Body/Headline):** 'Inter' (sans-serif) - Modern, netral, dan mudah dibaca.
* **Icons:** Menggunakan set ikon yang konsisten dan modern (seperti Phosphor Icons).
* **Layout:** Bersih dan intuitif, dengan *sidebar* untuk navigasi.

---

## 5. Local Setup & Installation 🚀

### Initial Installation
Untuk menjalankan proyek ini di komputer Anda, ikuti langkah-langkah berikut:

1.  **Clone Repositori**
    ```bash
    git clone [https://github.com/Fortotest/Narrative-Navigator.git](https://github.com/Fortotest/Narrative-Navigator.git)
    cd Narrative-Navigator
    ```

2.  **Install Dependensi**
    ```bash
    npm install
    ```

3.  **Setup Firebase & API Keys**
    * Buat proyek baru di [Firebase Console](https://console.firebase.google.com/).
    * Aktifkan **Authentication** (Google Sign-in) dan **Firestore**.
    * Dapatkan kredensial konfigurasi Firebase Anda.
    * Dapatkan API Key dari [CoinGecko](https://www.coingecko.com/en/api).
    * Dapatkan API Key untuk layanan Generative AI Anda.
    * Buat file baru di root proyek bernama `.env.local` dan masukkan semua *keys* Anda:
        ```
        # Firebase
        NEXT_PUBLIC_FIREBASE_API_KEY=...
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
        NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
        # External APIs
        NEXT_PUBLIC_COINGECKO_API_KEY=...
        NEXT_PUBLIC_AI_API_KEY=...
        ```

### Running the Application
1.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

2.  **Buka Aplikasi**
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 6. Credits 👤

### Builder
**Rizky Fadil**
