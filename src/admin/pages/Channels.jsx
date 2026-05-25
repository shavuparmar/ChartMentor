import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Settings as SettingsIcon, Save, Link as LinkIcon, Plus, Edit2, Trash2, Power, PowerOff, Eye, EyeOff, X } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminChannels() {
  const [channels, setChannels] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingChannel, setEditingChannel] = useState(null);

  const initialChannelState = {
    name: '',
    type: 'Telegram',
    link: '',
    description: '',
    planIds: [],
    isActive: true,
    isVisible: true
  };

  const [newChannel, setNewChannel] = useState(initialChannelState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [channelsRes, plansRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/channel`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/plan`)
      ]);
      setChannels(channelsRes.data.data);
      setPlans(plansRes.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    
    let url = newChannel.link.trim();
    if (!url) {
      toast.error("Link is required");
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    try {
      new URL(url);
    } catch (err) {
      toast.error("Please enter a valid URL");
      return;
    }

    const payload = { ...newChannel, link: url };

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      if (editingChannel) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/channel/${editingChannel.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Channel updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/channel`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Channel created successfully');
      }
      
      setShowModal(false);
      setEditingChannel(null);
      setNewChannel(initialChannelState);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${editingChannel ? 'update' : 'create'} channel`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this channel?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/channel/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Channel deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete channel');
    }
  };

  const toggleStatus = async (channel, field) => {
    try {
      const token = localStorage.getItem('token');
      const payload = {};
      payload[field] = !channel[field];
      await axios.put(`${import.meta.env.VITE_API_URL}/api/channel/${channel.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Channel updated`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openEditModal = (channel) => {
    setEditingChannel(channel);
    setNewChannel({
      name: channel.name,
      type: channel.type,
      link: channel.link,
      description: channel.description || '',
      planIds: channel.planIds || [],
      isActive: channel.isActive,
      isVisible: channel.isVisible
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingChannel(null);
    setNewChannel(initialChannelState);
    setShowModal(true);
  };

  const togglePlanSelection = (planId) => {
    setNewChannel(prev => {
      const isSelected = prev.planIds.includes(planId);
      if (isSelected) {
        return { ...prev, planIds: prev.planIds.filter(id => id !== planId) };
      } else {
        return { ...prev, planIds: [...prev.planIds, planId] };
      }
    });
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-6xl font-sans text-white">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-64 w-full rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl font-sans text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-400" />
            Channel Access
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Manage community access links and restrict them by membership plans.
          </p>
        </div>
        <button 
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-bold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" />
          Add Channel
        </button>
      </div>
      
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {channels.map(channel => (
            <div key={channel.id} className={`p-6 rounded-2xl border transition-all duration-300 relative ${channel.isActive ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-white/5 bg-white/[0.01] opacity-75'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                    {!channel.isActive && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">INACTIVE</span>}
                    {!channel.isVisible && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-500/20 text-gray-400">HIDDEN</span>}
                  </div>
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{channel.type}</span>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => toggleStatus(channel, 'isVisible')} className={`p-1.5 rounded-lg transition-colors ${channel.isVisible ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`} title={channel.isVisible ? "Hide Channel" : "Show Channel"}>
                    {channel.isVisible ? <Eye className="w-4 h-4 text-blue-400" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleStatus(channel, 'isActive')} className={`p-1.5 rounded-lg transition-colors ${channel.isActive ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`} title={channel.isActive ? "Deactivate Channel" : "Activate Channel"}>
                    {channel.isActive ? <Power className="w-4 h-4 text-emerald-400" /> : <PowerOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEditModal(channel)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Edit Channel">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(channel.id)} className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors" title="Delete Channel">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <a 
                href={channel.link.startsWith('http') ? channel.link : `https://${channel.link}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 mb-4 truncate transition-colors max-w-full"
                title="Open Link"
              >
                <LinkIcon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{channel.link}</span>
              </a>
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>Assigned Plans: {channel.planIds.length > 0 ? channel.planIds.length : 'All Plans'}</span>
              </div>
            </div>
          ))}

          {channels.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
              No channels created yet.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-[#0a0f1c] border border-white/10 rounded-[2rem] shadow-2xl relative my-8"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black tracking-tight">{editingChannel ? 'Edit Channel' : 'Add Channel'}</h2>
                  <button onClick={() => setShowModal(false)} className="p-2 bg-white/5 rounded-xl hover:bg-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateOrUpdate} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Channel Name</label>
                      <input
                        type="text"
                        required
                        value={newChannel.name}
                        onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="e.g. VIP Trading Setup"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Platform Type</label>
                      <select
                        value={newChannel.type}
                        onChange={(e) => setNewChannel({ ...newChannel, type: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 appearance-none"
                      >
                        <option value="Telegram" className="bg-gray-900">Telegram</option>
                        <option value="WhatsApp" className="bg-gray-900">WhatsApp</option>
                        <option value="Discord" className="bg-gray-900">Discord</option>
                        <option value="Instagram" className="bg-gray-900">Instagram</option>
                        <option value="YouTube" className="bg-gray-900">YouTube</option>
                        <option value="Twitter/X" className="bg-gray-900">Twitter/X</option>
                        <option value="Other" className="bg-gray-900">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Invite Link</label>
                      <input
                        type="url"
                        required
                        value={newChannel.link}
                        onChange={(e) => setNewChannel({ ...newChannel, link: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="https://t.me/..."
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Description</label>
                      <input
                        type="text"
                        value={newChannel.description}
                        onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="Short description of what happens here"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Assigned Plans (Leave empty for all plans)</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {plans.map(plan => (
                        <div 
                          key={plan.id}
                          onClick={() => togglePlanSelection(plan.id)}
                          className={`p-3 rounded-xl border text-sm cursor-pointer transition-colors ${newChannel.planIds.includes(plan.id) ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                          <div className="font-semibold">{plan.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                    <button type="submit" disabled={submitting} className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wide hover:bg-gray-200">
                      {submitting ? 'Saving...' : 'Save Channel'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
