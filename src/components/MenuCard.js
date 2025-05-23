// MenuCard.js

import React from 'react';

function MenuCard({ menu }) {
  // Pastikan menu dan menu.image_url ada sebelum mencoba mengaksesnya
  // Anda bisa menambahkan URL placeholder default jika menu.image_url tidak ada
  const imageUrl = menu && menu.image_url ? menu.image_url : 'https://via.placeholder.com/300x200?text=Menu'; // URL placeholder jika gambar tidak ada
  const menuName = menu && menu.name ? menu.name : 'Nama Menu';
  const menuDescription = menu && menu.description ? menu.description : 'Deskripsi menu...';
  const menuPrice = menu && menu.price ? menu.price : 0;

  const waLink = `https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20pesan%20${encodeURIComponent(menuName)}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
      {/* Bagian Gambar Menu */}
      {/* Pastikan ada URL gambar sebelum menampilkan tag img */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Gambar ${menuName}`} // Teks alternatif untuk aksesibilitas
          className="w-full h-48 object-cover rounded-md mb-4" // Styling untuk gambar
          // h-48 untuk tinggi tetap, object-cover agar gambar mengisi area tanpa distorsi
          // Anda bisa menyesuaikan h-48 sesuai kebutuhan desain
        />
      )}

      {/* Detail Menu */}
      <div className="flex-grow"> {/* Membuat bagian ini mengisi sisa ruang */}
        <h2 className="text-xl font-semibold text-green-700">{menuName}</h2>
        <p className="text-gray-600 mt-1 text-sm">{menuDescription}</p>
        <p className="text-sm text-gray-800 font-bold mt-2">Rp{menuPrice}</p>
        {menu && menu.favorite && <span className="text-xs text-white bg-green-500 px-2 py-1 rounded mt-1 inline-block">Favorit</span>}
      </div>

      {/* Tombol Pesan */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-auto"> {/* mt-auto untuk mendorong tombol ke bawah */}
        <button className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Pesan Sekarang
        </button>
      </a>
    </div>
  );
}

export default MenuCard;