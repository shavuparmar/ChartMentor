import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BellRing, Send, Info } from 'lucide-react';

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
    <div className="space-y-8 max-w-4xl font-sans text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <BellRing className="w-8 h-8 text-blue-400" />
          Broadcast Notification
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Send global announcements to all registered students.
        </p>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-8">
          <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-400/90 leading-relaxed">
            Messages sent here will immediately appear in every student's notification feed. Ensure the content is proofread before sending.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Notification Title</label>
            <input 
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-gray-600"
              placeholder="e.g. Platform Update: New Trading Course Available!"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Message Content</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows="6"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-gray-600 resize-none"
              placeholder="Type your detailed announcement here..."
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Broadcasting...' : 'Send Global Broadcast'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
