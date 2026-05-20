import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function StudentForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, { email });
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black p-4">
      <div className="w-full max-w-md bg-white border border-black p-8 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Forgot Password</h1>
          <p className="text-gray-600 mt-2 text-sm">Enter your email to receive a reset link</p>
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
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 hover:bg-gray-800 transition-colors border border-black disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/student/login" className="text-sm text-black hover:underline transition-colors font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
