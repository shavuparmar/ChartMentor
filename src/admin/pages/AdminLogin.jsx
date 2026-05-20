import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin/login`, {
        email, password
      });
      login({ ...res.data.data, role: 'admin' }, res.data.data.token);
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-black border border-gray-800 p-8 rounded-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Admin Portal</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to manage the platform</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-3 transition-colors text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-3 transition-colors text-white"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-white text-black font-bold py-3 hover:bg-gray-200 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
