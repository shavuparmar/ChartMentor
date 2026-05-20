import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email, password
      });
      login({ ...res.data.data, role: 'student' }, res.data.data.token);
      toast.success('Login successful');
      navigate('/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black p-4">
      <div className="w-full max-w-md bg-white border border-black p-8 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Student Portal</h1>
          <p className="text-gray-600 mt-2 text-sm">Access your mentorship dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-3 transition-colors text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-3 transition-colors text-black"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white font-bold py-3 hover:bg-gray-800 transition-colors border border-black"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link to="/student/forgot-password" className="text-gray-600 hover:text-black hover:underline transition-colors font-medium">
            Forgot Password?
          </Link>
          <Link to="/student/register" className="text-gray-600 hover:text-black hover:underline transition-colors font-medium">
            Create Account
          </Link>
        </div>
        <div className="mt-6 text-center pt-4 border-t border-gray-200">
          <Link to="/" className="text-sm text-gray-500 hover:text-black hover:underline transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
