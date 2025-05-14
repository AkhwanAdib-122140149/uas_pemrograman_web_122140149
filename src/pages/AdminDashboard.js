import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuForm from '../components/MenuForm';

function AdminDashboard() {
  const [menus, setMenus] = useState([]);

  const fetchMenus = () => {
    axios.get('http://localhost:6543/api/menus')
      .then(res => setMenus(res.data));
  };

  useEffect(() => { fetchMenus(); }, []);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 text-green-700 font-bold">Admin Panel</h2>
      <MenuForm onSubmit={addMenu} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {menus.map(menu => (
          <div key={menu.id} className="relative">
            <button onClick={() => deleteMenu(menu.id)} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Hapus</button>
            <MenuForm initialData={menu} onSubmit={(data) => {
              axios.put(`http://localhost:6543/api/menus/${menu.id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
              }).then(fetchMenus);
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;