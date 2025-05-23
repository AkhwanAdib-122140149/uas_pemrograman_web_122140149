import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Impor useNavigate
import MenuForm from '../components/MenuForm';

function AdminDashboard() {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // 2. Inisialisasi hook navigasi

  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:6543/api';

  const fetchMenus = () => {
    axios.get(`${apiBaseUrl}/menus`)
      .then(res => setMenus(res.data))
      .catch(err => console.error("Error fetching menus:", err));
  };

  useEffect(() => {
    fetchMenus();
  }, []);
  
  // 3. Buat fungsi untuk handle logout
  const handleLogout = () => {
    // Hapus token dari penyimpanan lokal browser
    localStorage.removeItem('token');
    
    // Arahkan pengguna kembali ke halaman utama
    navigate('/');
  };

  const handleSubmitMenu = (formData) => {
    // ... (Fungsi ini tetap sama, tidak perlu diubah) ...
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if (editingMenu) {
      axios.put(`${apiBaseUrl}/menus/${editingMenu.id}`, formData, { headers })
        .then(() => {
          fetchMenus();
          setEditingMenu(null);
          setShowForm(false);
        })
        .catch(err => {
          console.error("Error updating menu:", err.response ? err.response.data : err.message);
          alert(`Gagal mengupdate menu: ${err.response ? err.response.data.error : err.message}`);
        });
    } else {
      axios.post(`${apiBaseUrl}/menus`, formData, { headers })
        .then(() => {
          fetchMenus();
          setShowForm(false);
        })
        .catch(err => {
          console.error("Error adding menu:", err.response ? err.response.data : err.message);
          alert(`Gagal menambah menu: ${err.response ? err.response.data.error : err.message}`);
        });
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    // ... (Fungsi ini tetap sama, tidak perlu diubah) ...
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      const token = localStorage.getItem('token');
      axios.delete(`${apiBaseUrl}/menus/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(fetchMenus)
      .catch(err => {
        console.error("Error deleting menu:", err.response ? err.response.data : err.message);
        alert(`Gagal menghapus menu: ${err.response ? err.response.data.error : err.message}`);
      });
    }
  };

  const handleAddNew = () => {
    setEditingMenu(null);
    setShowForm(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">Admin Panel</h2>
        {/* 4. Tambahkan Tombol Logout */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAddNew}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Tambah Menu Baru
          </button>
          <button 
            onClick={handleLogout}
            className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editingMenu ? 'Edit Menu' : 'Form Tambah Menu Baru'}
          </h3>
          <MenuForm 
            onSubmit={handleSubmitMenu} 
            initialData={editingMenu} 
            isEditMode={!!editingMenu} 
          />
          <button 
            onClick={() => { setShowForm(false); setEditingMenu(null); }}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ... (Mapping menu tetap sama, tidak perlu diubah) ... */}
        {menus.map(menu => (
          <div key={menu.id} className="bg-white p-5 rounded-lg shadow-lg relative">
            {menu.image_url && (
              <img 
                src={menu.image_url.startsWith('http') ? menu.image_url : `${process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'}${menu.image_url}`} 
                alt={menu.name} 
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-xl font-semibold text-green-700 mb-1">{menu.name}</h3>
            <p className="text-gray-600 text-sm mb-2 truncate">{menu.description}</p>
            <p className="text-lg font-bold text-gray-800 mb-3">Rp{menu.price}</p>
            <div className="flex space-x-2 mt-auto">
              <button onClick={() => handleEdit(menu)} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 text-sm">Edit</button>
              <button onClick={() => handleDelete(menu.id)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      {menus.length === 0 && <p className="text-center text-gray-500 mt-6">Belum ada menu.</p>}
    </div>
  );
}

export default AdminDashboard;