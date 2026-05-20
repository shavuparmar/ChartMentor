import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function StudentSettings() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    // API Call to update password could go here
    toast.success('Password update functionality pending backend integration');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
      
      <div className="bg-white border border-black p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
              <div className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-black cursor-not-allowed">
                {user?.firstName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
              <div className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-black cursor-not-allowed">
                {user?.lastName}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              <div className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-black cursor-not-allowed">
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">New Password</label>
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 text-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Confirm New Password</label>
              <input 
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white border border-black focus:ring-1 focus:ring-black outline-none px-4 py-2 text-black transition-colors"
              />
            </div>
            <button 
              type="submit"
              className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-colors border border-black"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
