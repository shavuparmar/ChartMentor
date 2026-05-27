import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Package, Check, X, ShieldAlert, Edit2, Power, PowerOff, Eye, EyeOff, Search, Filter } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const initialPlanState = {
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    durationDays: '',
    startDate: '',
    endDate: '',
    membershipType: '',
    isActive: true,
    isVisible: true,
    discountType: '',
    discountValue: '',
    offerLabel: '',
    isFeatured: false,
    features: []
  };

  const [newPlan, setNewPlan] = useState(initialPlanState);
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

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...newPlan,
        price: Number(newPlan.price),
        discountPrice: newPlan.discountPrice ? Number(newPlan.discountPrice) : null,
        discountValue: newPlan.discountValue ? Number(newPlan.discountValue) : null,
        discountType: newPlan.discountType || null,
        offerLabel: newPlan.offerLabel || null,
        isFeatured: newPlan.isFeatured || false,
        durationDays: newPlan.durationDays ? Number(newPlan.durationDays) : null,
        startDate: newPlan.startDate || null,
        endDate: newPlan.endDate || null,
        features: newPlan.features.filter(f => f.trim() !== '')
      };

      if (newPlan.startDate) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const newStart = new Date(newPlan.startDate);
        const existingStart = editingPlan && editingPlan.startDate ? new Date(editingPlan.startDate.split('T')[0]) : null;
        
        if (!existingStart || newStart.getTime() !== existingStart.getTime()) {
          if (newStart < today) {
            toast.error("Course start date cannot be in the past");
            setSubmitting(false);
            return;
          }
        }
      }

      if (newPlan.startDate && newPlan.endDate) {
        if (new Date(newPlan.endDate) < new Date(newPlan.startDate)) {
          toast.error("End date cannot be before start date");
          setSubmitting(false);
          return;
        }
      }

      if (editingPlan) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/plan/${editingPlan.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Plan updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/plan`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Plan created successfully');
      }

      setShowModal(false);
      setEditingPlan(null);
      setNewPlan(initialPlanState);
      fetchPlans();
    } catch (error) {
      toast.error(`Failed to ${editingPlan ? 'update' : 'create'} plan`);
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

  const toggleStatus = async (plan, field) => {
    try {
      const token = localStorage.getItem('token');
      const payload = {};
      payload[field] = !plan[field];

      await axios.put(`${import.meta.env.VITE_API_URL}/api/plan/${plan.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Plan ${field === 'isActive' ? (payload.isActive ? 'activated' : 'deactivated') : (payload.isVisible ? 'is now visible' : 'is now hidden')}`);
      fetchPlans();
    } catch (error) {
      toast.error('Failed to update plan status');
    }
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name || '',
      description: plan.description || '',
      price: plan.price || '',
      discountPrice: plan.discountPrice || '',
      durationDays: plan.durationDays || '',
      startDate: plan.startDate ? plan.startDate.split('T')[0] : '',
      endDate: plan.endDate ? plan.endDate.split('T')[0] : '',
      membershipType: plan.membershipType || '',
      discountType: plan.discountType || '',
      discountValue: plan.discountValue || '',
      offerLabel: plan.offerLabel || '',
      isFeatured: plan.isFeatured || false,
      isActive: plan.isActive ?? true,
      isVisible: plan.isVisible ?? true,
      features: plan.features || []
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingPlan(null);
    setNewPlan(initialPlanState);
    setShowModal(true);
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    switch (filterStatus) {
      case 'active': return plan.isActive;
      case 'inactive': return !plan.isActive;
      case 'visible': return plan.isVisible;
      case 'hidden': return !plan.isVisible;
      default: return true;
    }
  });

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
    <div className="space-y-8 max-w-7xl font-sans text-white relative pb-20">

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
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-bold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" />
          Add New Plan
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search plans by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
          >
            <option value="all" className="bg-gray-900">All Plans</option>
            <option value="active" className="bg-gray-900">Active Only</option>
            <option value="inactive" className="bg-gray-900">Inactive Only</option>
            <option value="visible" className="bg-gray-900">Visible Only</option>
            <option value="hidden" className="bg-gray-900">Hidden Only</option>
          </select>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className={`relative flex flex-col justify-between p-8 rounded-[2rem] border ${plan.isActive ? 'border-white/5 bg-white/[0.02]' : 'border-red-500/10 bg-red-500/[0.02] opacity-80'} backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300 shadow-xl group overflow-hidden`}>
            {plan.isActive && <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors" />}

            <div className="mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-2 flex-wrap">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider ${plan.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider ${plan.isVisible ? 'text-blue-400' : 'text-gray-400'}`}>
                    {plan.isVisible ? 'Visible' : 'Hidden'}
                  </div>
                  {plan.isFeatured && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-xs font-bold uppercase tracking-wider text-yellow-400">
                      Featured
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleStatus(plan, 'isVisible')} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Toggle Visibility">
                    {plan.isVisible ? <Eye className="w-4 h-4 text-blue-400" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleStatus(plan, 'isActive')} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Toggle Active Status">
                    {plan.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button onClick={() => openEditModal(plan)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Edit Plan">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white mb-2">{plan.name}</h2>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black text-indigo-400">₹{(plan.discountPrice || plan.price).toLocaleString()}</span>
                {plan.discountPrice && (
                  <span className="text-xl font-medium text-gray-500 line-through mb-1">₹{plan.price.toLocaleString()}</span>
                )}
              </div>
              <p className="text-gray-500 font-medium mb-4 text-sm">
                / {plan.durationDays ? `${plan.durationDays} days` : 'lifetime'}
                {plan.membershipType && ` • ${plan.membershipType}`}
              </p>

              <p className="text-gray-400 text-sm leading-relaxed mb-4">{plan.description}</p>

              {(plan.startDate || plan.endDate) && (
                <div className="bg-white/5 rounded-lg p-3 text-xs text-gray-400 mb-4 border border-white/5">
                  {plan.startDate && <div><span className="font-semibold">Start:</span> {new Date(plan.startDate).toLocaleDateString()}</div>}
                  {plan.endDate && <div><span className="font-semibold">End:</span> {new Date(plan.endDate).toLocaleDateString()}</div>}
                </div>
              )}
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

        {filteredPlans.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-[2rem] border border-white/5 bg-white/[0.01] p-16 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <p className="text-lg font-bold tracking-wide text-gray-300">No plans found</p>
            <p className="text-sm text-gray-500 mt-2">Adjust your filters or create a new plan.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Plan Modal */}
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
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-600/10 to-transparent pointer-events-none rounded-t-[2rem]" />

              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black tracking-tight">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateOrUpdate} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Membership Type</label>
                      <input
                        type="text"
                        value={newPlan.membershipType}
                        onChange={(e) => setNewPlan({ ...newPlan, membershipType: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        placeholder="e.g. Premium, Basic"
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
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Discount Type</label>
                      <select
                        value={newPlan.discountType}
                        onChange={(e) => setNewPlan({ ...newPlan, discountType: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
                      >
                        <option value="" className="bg-gray-900">None</option>
                        <option value="PERCENTAGE" className="bg-gray-900">Percentage (%)</option>
                        <option value="FIXED" className="bg-gray-900">Fixed Amount (INR)</option>
                      </select>
                    </div>

                    {newPlan.discountType && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                          {newPlan.discountType === 'PERCENTAGE' ? 'Discount Percentage (%)' : 'Discount Amount (INR)'}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={newPlan.discountValue}
                          onChange={(e) => setNewPlan({ ...newPlan, discountValue: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                          placeholder="e.g. 20"
                        />
                      </div>
                    )}

                    {!newPlan.discountType && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Final Discount Price (INR)</label>
                        <input
                          type="number"
                          min="1"
                          value={newPlan.discountPrice}
                          onChange={(e) => setNewPlan({ ...newPlan, discountPrice: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                          placeholder="Optional (if no discount logic)"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Offer Label</label>
                      <input
                        type="text"
                        value={newPlan.offerLabel}
                        onChange={(e) => setNewPlan({ ...newPlan, offerLabel: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        placeholder="e.g. Summer Sale, Limited Offer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Duration (Days)</label>
                      <input
                        type="number"
                        min="1"
                        value={newPlan.durationDays}
                        onChange={(e) => setNewPlan({ ...newPlan, durationDays: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        placeholder="Leave empty for lifetime"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-4 mt-6">
                      <label className="flex items-center cursor-pointer gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={newPlan.isActive}
                            onChange={(e) => setNewPlan({ ...newPlan, isActive: e.target.checked })}
                          />
                          <div className={`block w-12 h-6 rounded-full transition-colors ${newPlan.isActive ? 'bg-indigo-500' : 'bg-white/10 border border-white/20'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${newPlan.isActive ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-300">Active Status</span>
                      </label>

                      <label className="flex items-center cursor-pointer gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={newPlan.isVisible}
                            onChange={(e) => setNewPlan({ ...newPlan, isVisible: e.target.checked })}
                          />
                          <div className={`block w-12 h-6 rounded-full transition-colors ${newPlan.isVisible ? 'bg-blue-500' : 'bg-white/10 border border-white/20'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${newPlan.isVisible ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-300">Visible to Public</span>
                      </label>

                      <label className="flex items-center cursor-pointer gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={newPlan.isFeatured}
                            onChange={(e) => setNewPlan({ ...newPlan, isFeatured: e.target.checked })}
                          />
                          <div className={`block w-12 h-6 rounded-full transition-colors ${newPlan.isFeatured ? 'bg-yellow-500' : 'bg-white/10 border border-white/20'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${newPlan.isFeatured ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-300">Featured (Most Popular)</span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Available From</label>
                      <input
                        type="date"
                        min={editingPlan?.startDate && editingPlan.startDate.split('T')[0] < new Date().toISOString().split('T')[0] ? editingPlan.startDate.split('T')[0] : new Date().toISOString().split('T')[0]}
                        value={newPlan.startDate}
                        onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Available Until</label>
                      <input
                        type="date"
                        min={newPlan.startDate || new Date().toISOString().split('T')[0]}
                        value={newPlan.endDate}
                        onChange={(e) => setNewPlan({ ...newPlan, endDate: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
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
                      Visibility controls if users can see it. Active controls if they can purchase it.
                    </p>
                  </div>

                  {/* Features Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Features Included</label>
                      <button
                        type="button"
                        onClick={() => setNewPlan({ ...newPlan, features: [...newPlan.features, ''] })}
                        className="text-xs font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Feature
                      </button>
                    </div>
                    {newPlan.features.length === 0 ? (
                      <div className="text-xs text-gray-500 p-4 border border-white/5 rounded-xl bg-white/[0.02] text-center">
                        No features added yet. Click "Add Feature" to start.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {newPlan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const updatedFeatures = [...newPlan.features];
                                updatedFeatures[index] = e.target.value;
                                setNewPlan({ ...newPlan, features: updatedFeatures });
                              }}
                              className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                              placeholder={`Feature ${index + 1} (e.g. Daily Market Analysis)`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
                                setNewPlan({ ...newPlan, features: updatedFeatures });
                              }}
                              className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      {submitting ? 'Saving...' : editingPlan ? 'Update Plan' : 'Create Plan'}
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
