import React from 'react';

function PlaceholderCard() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-dashed border-gray-400 flex flex-col items-center justify-center text-center h-48">
      <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
      <h2 className="text-lg font-semibold text-gray-500">Menu Kosong</h2>
      <p className="text-sm text-gray-400">Belum ada data. Silakan tambahkan menu.</p>
    </div>
  );
}

export default PlaceholderCard;
