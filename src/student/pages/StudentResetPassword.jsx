import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function StudentResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return toast.error('Invalid or missing reset token');
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, { token, newPassword });
      toast.success('Password reset successfully');
      navigate('/student/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black p-4">
      <div className="w-full max-w-md bg-white border border-black p-8 shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter">Reset Password</h1>
          <p className="text-gray-600 mt-2 text-sm">Enter your new password below</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input 
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-3 transition-colors text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-3 transition-colors text-black"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 hover:bg-gray-800 transition-colors border border-black disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
