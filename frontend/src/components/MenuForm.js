// /uaspemweb/src/components/MenuForm.js

import React, { useState, useEffect } from 'react';

function MenuForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '', // Tambahkan image_url di sini
    // favorite: false, // 'favorite' ada di kode Anda sebelumnya, backend tidak memilikinya
                       // Jika tidak dipakai, bisa dihapus atau pastikan backend menghandle
  });

  // useEffect untuk mengisi form jika ada initialData (untuk mode edit)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        image_url: initialData.image_url || '', // Isi image_url dari initialData
        // favorite: initialData.favorite || false,
      });
    }
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Pastikan price dikirim sebagai angka jika backend mengharapkannya
    const dataToSubmit = {
      ...formData,
      price: parseFloat(formData.price) || 0, // Konversi harga ke angka
    };
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Menu</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Menu"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga</label>
        <input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Harga"
          type="number" // Tetap sebagai number untuk validasi browser
          step="any" // Izinkan desimal jika perlu, atau step="1" untuk integer
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          required
        />
      </div>
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL Gambar</label>
        <input
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Contoh: /images/menu/nama_gambar.jpg atau https://link.gambar/gambar.jpg"
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Masukkan path relatif (misal: /images/nama.jpg) jika gambar ada di folder 'public' frontend, atau URL lengkap.
        </p>
      </div>
      
      {/* Jika Anda masih menggunakan field 'favorite' dan ingin menyimpannya:
      <label className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          name="favorite" 
          checked={formData.favorite} 
          onChange={handleChange} 
          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
        />
        <span>Favorit</span>
      </label>
      */}
      
      <button 
        type="submit"
        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Simpan Menu
      </button>
    </form>
  );
}

export default MenuForm;