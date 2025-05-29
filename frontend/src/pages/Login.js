import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Pastikan Anda sudah menginstal axios: npm install axios

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Pastikan URL ini sesuai dengan alamat backend Anda
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:6543/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Bersihkan pesan error setiap kali mencoba login

    try {
      // Kirim request POST ke API backend
      const response = await axios.post(`${apiBaseUrl}/admin/login`, {
        username,
        password,
      });

      // Jika login berhasil dan backend mengirimkan token
      if (response.data && response.data.token) {
        // Simpan token ke localStorage
        localStorage.setItem('token', response.data.token);
        // Arahkan ke dashboard admin
        navigate('/admin');
      } else {
        setError('Login gagal: Respon tidak valid dari server.');
      }
    } catch (err) {
      // Tangani error dari backend (misal: username/password salah)
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Login gagal. Tidak dapat terhubung ke server.');
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-green-700">Login Admin</h2>
        
        {/* Tampilkan pesan error jika ada */}
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;