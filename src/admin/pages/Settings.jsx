import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({ discordLink: '', telegramLink: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // There isn't a direct GET settings for admin, wait, let's just create one or use student's.
    // I can fetch from student route or I'll implement admin setting get route if needed. 
    // Wait, the requirement didn't specify get settings for admin but they need to manage it.
    // Actually, updateSettings in admin controller handles both update and create.
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

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
      
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-sm">
        <h2 className="text-xl font-bold mb-4">Community Links</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Discord Invite Link</label>
            <input 
              type="url"
              value={settings.discordLink}
              onChange={e => setSettings({...settings, discordLink: e.target.value})}
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-2 text-white transition-colors"
              placeholder="https://discord.gg/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Telegram Group Link</label>
            <input 
              type="url"
              value={settings.telegramLink}
              onChange={e => setSettings({...settings, telegramLink: e.target.value})}
              className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-2 text-white transition-colors"
              placeholder="https://t.me/..."
            />
          </div>
          <button 
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-white text-black font-bold disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
