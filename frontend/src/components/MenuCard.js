import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function MenuCard({ menu }) {
  const dispatch = useDispatch();

  const imageUrl = menu?.image_url || 'https://via.placeholder.com/300x200?text=Menu';
  const menuName = menu?.name || 'Nama Menu';
  const menuDescription = menu?.description || 'Deskripsi menu...';
  const menuPrice = menu?.price || 0;

  // // Link WhatsApp untuk pesan langsung (jika masih diperlukan)
  // const waLink = `https://wa.me/6289514149157?text=Halo%2C%20saya%20mau%20pesan%20${encodeURIComponent(menuName)}`;

  // Fungsi handle sekarang lebih sederhana
  const handleAddToCart = () => {
    if (menu && menu.id) {
      dispatch(addToCart({
        id: menu.id,
        name: menuName,
        price: menuPrice,
        image_url: menu.image_url,
        // Kuantitas tidak dikirim lagi, akan di-handle oleh slice
      }));
      alert(`1 porsi ${menuName} berhasil ditambahkan ke keranjang!`);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      <img
        src={imageUrl}
        alt={`Gambar ${menuName}`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold text-green-700">{menuName}</h2>
        <p className="text-gray-600 mt-1 text-sm">{menuDescription}</p>
        <p className="text-sm text-gray-800 font-bold mt-2">Rp{menuPrice}</p>
      </div>

      {/* Tombol Aksi disederhanakan */}
      <div className="mt-auto pt-4">
        {/* <a href={waLink} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Pesan Langsung
            </button>
        </a> */}
        <button 
          onClick={handleAddToCart}
          className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default MenuCard;