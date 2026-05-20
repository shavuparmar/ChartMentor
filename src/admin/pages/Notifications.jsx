import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AdminNotifications() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/notifications`, { title, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Notification sent to all students');
      setTitle('');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Send Notification</h1>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-sm">
        <p className="text-gray-400 mb-6 text-sm">This notification will be visible to all registered students in their dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input 
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-2 text-white transition-colors"
              placeholder="e.g. System Maintenance"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows="5"
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-2 text-white transition-colors"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button 
            type="submit"
            disabled={sending}
            className="px-6 py-2 bg-white text-black font-bold disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            {sending ? 'Sending...' : 'Send Notification'}
          </button>
        </form>
      </div>
    </div>
  );
}
