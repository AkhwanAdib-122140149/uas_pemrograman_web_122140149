import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuForm from '../components/MenuForm';

function AdminDashboard() {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  // Fungsi untuk ambil menu dari backend
  const fetchMenus = () => {
    axios.get('http://localhost:6543/api/menus', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setMenus(res.data))
    .catch(err => console.error('Gagal mengambil menu:', err));
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchMenus();
    }
  }, []);

  const addMenu = (data) => {
    axios.post('http://localhost:6543/api/menus', data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(fetchMenus);
  };

  const deleteMenu = (id) => {
    axios.delete(`http://localhost:6543/api/menus/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(fetchMenus);
  };

  const updateMenu = (id, data) => {
    axios.put(`http://localhost:6543/api/menus/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(fetchMenus);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-green-700 font-bold">Admin Panel</h2>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <MenuForm onSubmit={addMenu} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {menus.map(menu => (
          <div key={menu.id} className="relative">
            <button
              onClick={() => deleteMenu(menu.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Hapus
            </button>
            <MenuForm
              initialData={menu}
              onSubmit={(data) => updateMenu(menu.id, data)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
