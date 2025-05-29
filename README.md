Nama : Akhwan Adib Al Hakim  
NIM : 122140149  
Kelas : Pemrograman Web - RB  

## Proyek Pecel Lele - Panduan Instalasi dan Menjalankan

Dokumen ini memberikan panduan langkah demi langkah untuk menginstal, mengkonfigurasi, dan menjalankan aplikasi frontend dan backend.

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:

* **Node.js dan npm**: Diperlukan untuk menjalankan frontend. [Unduh di sini](https://nodejs.org/).
* **Python**: Diperlukan untuk backend. [Unduh di sini](https://www.python.org/).
* **uv**: Pengelola virtual environment dan package installer Python yang cepat. Instal dengan perintah:
    ```sh
    pip install uv
    ```

## 🚀 Langkah-langkah Menjalankan Proyek

### 1. Pengaturan Frontend (React)

Bagian ini akan memandu Anda untuk menjalankan sisi klien dari aplikasi.

**a. Masuk ke Direktori Frontend**

Buka terminal atau command prompt Anda dan navigasikan ke folder `frontend`.

`` masuk ke path /uas_pemrograman_web_122140149-main/frontend ``

**b. Install Dependensi**

Jalankan perintah berikut untuk mengunduh dan menginstal semua library yang dibutuhkan oleh frontend.
`` npm install ``

**c. Jalankan Aplikasi Frontend**
Setelah instalasi selesai, jalankan server pengembangan frontend.
``npm start``

Aplikasi React akan berjalan dan secara otomatis membuka tab baru di browser Anda pada alamat `http://localhost:3000`.

### 2. Pengaturan Backend (Pyramid)

Bagian ini akan memandu Anda untuk menyiapkan server dan database.

**a. Buat Virtual Environment**
Navigasikan ke direktori `backend` dan buat sebuah virtual environment menggunakan `uv` untuk mengisolasi dependensi proyek.
``cd /uas_pemrograman_web_122140149-main/backend`` 
``uv venv venv`` Perintah ini akan membuat folder `venv` di dalam direktori `backend`

**b. Aktifkan Virtual Environment**
Aktifkan virtual environment yang baru saja Anda buat.
``.\venv\Scripts\activate``
Setelah aktif, Anda akan melihat `(venv)` di awal baris perintah Anda.

**c. Install Dependensi Backend**
Masuk ke direktori proyek backend `pecel_lele`.
``cd pecel_lele``
Install semua dependensi Python dalam mode _editable_ (`-e`). Mode ini memungkinkan perubahan pada kode Anda langsung diterapkan tanpa perlu instalasi ulang. Opsi `[testing]` juga akan menginstal paket yang diperlukan untuk pengujian.
``uv pip install -e ".[testing]"``

**d. Jalankan Migrasi Database**
buat database secara manual dengan ``psql -U 'postgres'`` / bisa ganti dengan username lain sesuai postgre yang diinstall
ketika sudah masuk postgre cli kemudian buat database baru ``"CREATE DATABASE pecellele_db2;"`` dan masukkan dataset secara manual melalui post / di localhost:3000 (frontend)  
Generate First revision  
``initialize_pecel_lele_db development.ini``
Buat Login Admin pada direktori pecel_lele dengan menjalankan  
``python create_admin.py development.ini``

**e. Jalankan Aplikasi Backend**
Gunakan `pserve` untuk menjalankan server aplikasi Pyramid. Opsi `--reload` akan membuat server otomatis me-restart setiap kali ada perubahan pada file kode.
``pserve development.ini --reload``
Server backend sekarang berjalan dan siap menerima permintaan, biasanya pada `http://localhost:6543`
