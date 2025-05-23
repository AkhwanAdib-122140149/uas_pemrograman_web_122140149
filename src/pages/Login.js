import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('token', 'dummy-token'); // Token disimpan
      navigate('/admin');
    } else {
      alert('Username atau password salah');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center text-green-700">Login Admin</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}

export default Login;
