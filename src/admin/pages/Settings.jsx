import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Settings as SettingsIcon, Save, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ discordLink: '', telegramLink: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.data) {
          setSettings({
            discordLink: res.data.data.discordLink || '',
            telegramLink: res.data.data.telegramLink || ''
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-4xl font-sans text-white">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl font-sans text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-blue-400" />
          Platform Settings
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage global configurations and community access links.
        </p>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-indigo-400" />
            Community Links
          </h2>
          <p className="text-sm text-gray-400 mt-1">These links will be visible to students who have an active membership.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 max-w-2xl">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#5865F2]" /> Discord Invite Link
            </label>
            <input 
              type="url"
              value={settings.discordLink}
              onChange={e => setSettings({...settings, discordLink: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-[#5865F2]/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(88,101,242,0.15)] transition-all placeholder:text-gray-600"
              placeholder="https://discord.gg/..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#0088cc]" /> Telegram Group Link
            </label>
            <input 
              type="url"
              value={settings.telegramLink}
              onChange={e => setSettings({...settings, telegramLink: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white outline-none focus:border-[#0088cc]/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,136,204,0.15)] transition-all placeholder:text-gray-600"
              placeholder="https://t.me/..."
            />
          </div>
          
          <div className="pt-4 border-t border-white/5">
            <button 
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-gray-200 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving Changes...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
