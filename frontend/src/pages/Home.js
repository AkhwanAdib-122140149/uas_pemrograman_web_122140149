import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from '../components/MenuCard';
import PlaceholderCard from '../components/PlaceholderCard';

function Home() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:6543/api/menus')
      .then(res => setMenus(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 space-y-12">
      {/* Latar Belakang */}
      <section className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">Tentang Warung Pecel Lele</h1>
        <p className="text-gray-700 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      {/* Gambar Latar Belakang
      <section className="bg-green-200 p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Nikmati Hidangan Lezat Kami</h2>
        <img src="https://via.placeholder.com/800x400" alt="Pecel Lele" className="w-full h-auto rounded-lg shadow-md" />
        <p className="text-gray-700 text-justify mt-4">
          Kami menyajikan berbagai menu lezat yang siap memanjakan lidah Anda. Dari Pecel Lele yang terkenal hingga berbagai hidangan lainnya, semua disajikan dengan cita rasa yang khas dan bahan-bahan berkualitas.
        </p>
      </section> */}

      {/* Daftar Menu */}
      <section>
        <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Daftar Menu Pecel Lele</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menus.length > 0 ? (
          menus.map(menu => <MenuCard key={menu.id} menu={menu} />)
        ) : (
          <>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </>
        )}
      </div>
      </div>
      </section>

      {/* Kontak */}
      <section className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Kontak</h2>
        <p className="text-gray-800 mb-2">📍 Jl. Raya Warung Lele No. 123, Jakarta</p>
        <p className="text-gray-800 mb-4">📞 <a href="https://wa.me/6280034567890" className="text-green-600 hover:underline">0800-3456-7890 (WhatsApp)</a></p>
        <a href="https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20menu" target="_blank" rel="noopener noreferrer">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Pesan Sekarang via WhatsApp</button>
        </a>
      </section>
    </div>
  );
}

export default Home;
