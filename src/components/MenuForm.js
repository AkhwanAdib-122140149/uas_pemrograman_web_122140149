import React, { useState } from 'react';

function MenuForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    favorite: initialData.favorite || false,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nama Menu" className="w-full p-2 border rounded" />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi" className="w-full p-2 border rounded" />
      <input name="price" value={formData.price} onChange={handleChange} placeholder="Harga" type="number" className="w-full p-2 border rounded" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="favorite" checked={formData.favorite} onChange={handleChange} />
        <span>Favorit</span>
      </label>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
    </form>
  );
}

export default MenuForm;