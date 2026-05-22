import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Package, Check, X, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', description: '', price: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/plan`);
      setPlans(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/plan`, {
        ...newPlan,
        price: Number(newPlan.price)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Plan created successfully');
      setShowModal(false);
      setNewPlan({ name: '', description: '', price: '' });
      fetchPlans();
    } catch (error) {
      toast.error('Failed to create plan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan? Active users might be affected.')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/plan/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Plan deleted');
      fetchPlans();
    } catch (error) {
      toast.error('Failed to delete plan');
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl font-sans text-white">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-40 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Skeleton className="h-64 rounded-[2rem]" />
          <Skeleton className="h-64 rounded-[2rem]" />
          <Skeleton className="h-64 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl font-sans text-white relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-indigo-400" />
            Membership Plans
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Create and manage subscription tiers for your students.
          </p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-bold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" />
          Add New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="relative flex flex-col justify-between p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300 shadow-xl group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors" />
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-300 mb-6">
                Active Tier
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white mb-2">{plan.name}</h2>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black text-indigo-400">₹{plan.price.toLocaleString()}</span>
                <span className="text-gray-500 font-medium mb-1">/ lifetime</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400" /> Full Platform Access
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400" /> Premium Community
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDelete(plan.id)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm uppercase tracking-wider group/btn"
            >
              <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              Delete Plan
            </button>
          </div>
        ))}
        
        {plans.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-[2rem] border border-white/5 bg-white/[0.01] p-16 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <p className="text-lg font-bold tracking-wide text-gray-300">No plans found</p>
            <p className="text-sm text-gray-500 mt-2">Create a membership plan to start accepting payments.</p>
          </div>
        )}
      </div>

      {/* Create Plan Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-[#0a0f1c] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none" />

              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black tracking-tight">Create New Plan</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Plan Name</label>
                    <input
                      type="text"
                      required
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                      placeholder="e.g. Lifetime Mentorship"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Price (INR)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                      placeholder="e.g. 4999"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Description</label>
                    <textarea
                      required
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                      rows="3"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 resize-none"
                      placeholder="What is included in this tier?"
                    ></textarea>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 mt-4">
                    <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-400/80 leading-relaxed">
                      Pricing updates won't affect existing active members. Once deleted, users on this plan will retain access unless manually revoked.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setShowModal(false)}
                      className="px-6 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wide hover:bg-gray-200 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {submitting ? 'Creating...' : 'Create Plan'}
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
