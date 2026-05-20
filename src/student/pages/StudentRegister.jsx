import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function StudentRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        firstName, lastName, email, password
      });
      login({ ...res.data.data, role: 'student' }, res.data.data.token);
      toast.success('Registration successful! Check your email for verification.');
      navigate('/student/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black p-4">
      <div className="w-full max-w-md bg-white border border-black p-8 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Create Account</h1>
          <p className="text-gray-600 mt-2 text-sm">Join ChartMentor mentorship program</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input 
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 transition-colors text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input 
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 transition-colors text-black"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 transition-colors text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 transition-colors text-black"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white font-bold py-3 mt-4 hover:bg-gray-800 transition-colors border border-black"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/student/login" className="text-black hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
