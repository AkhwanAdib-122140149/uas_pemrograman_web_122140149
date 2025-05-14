import React from 'react';

function MenuCard({ menu }) {
  const waLink = `https://wa.me/6281234567890?text=Halo%2C%20saya%20mau%20pesan%20${encodeURIComponent(menu.name)}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-green-700">{menu.name}</h2>
      <p className="text-gray-600">{menu.description}</p>
      <p className="text-sm text-gray-800 font-bold mt-2">Rp{menu.price}</p>
      {menu.favorite && <span className="text-xs text-white bg-green-500 px-2 py-1 rounded">Favorit</span>}
      <a href={waLink} target="_blank" rel="noopener noreferrer">
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Pesan Sekarang</button>
      </a>
    </div>
  );
}

export default MenuCard;