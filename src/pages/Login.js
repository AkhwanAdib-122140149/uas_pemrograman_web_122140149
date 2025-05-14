import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:6543/api/auth/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/admin');
      })
      .catch(err => alert('Login gagal'));
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-center text-green-700 mb-4">Login Admin</h2>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border mb-3 rounded" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full p-2 border mb-3 rounded" />
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}

export default Login;