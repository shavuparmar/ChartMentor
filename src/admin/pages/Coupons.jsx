import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Tag, Check, X, ShieldAlert, Edit2, Power, PowerOff, Percent } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const initialCouponState = { 
    code: '', 
    type: 'PERCENTAGE', 
    discountValue: '',
    minPurchase: '',
    expiryDate: '',
    maxUsage: '',
    planIds: [],
    isActive: true
  };

  const [newCoupon, setNewCoupon] = useState(initialCouponState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [couponsRes, plansRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/coupon`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/plan`)
      ]);
      setCoupons(couponsRes.data.data);
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
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const payload = {
        ...newCoupon,
        discountValue: Number(newCoupon.discountValue),
        minPurchase: newCoupon.minPurchase ? Number(newCoupon.minPurchase) : null,
        maxUsage: newCoupon.maxUsage ? Number(newCoupon.maxUsage) : null,
        expiryDate: newCoupon.expiryDate || null,
      };

      if (editingCoupon) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/coupon/${editingCoupon.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Coupon updated successfully');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/coupon`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Coupon created successfully');
      }
      
      setShowModal(false);
      setEditingCoupon(null);
      setNewCoupon(initialCouponState);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${editingCoupon ? 'update' : 'create'} coupon`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this coupon?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/coupon/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Coupon deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete coupon');
    }
  };

  const toggleStatus = async (coupon) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/coupon/${coupon.id}`, { isActive: !coupon.isActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Coupon ${!coupon.isActive ? 'activated' : 'deactivated'}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const openEditModal = (coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon({
      code: coupon.code,
      type: coupon.type,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase || '',
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split('T')[0] : '',
      maxUsage: coupon.maxUsage || '',
      planIds: coupon.planIds || [],
      isActive: coupon.isActive
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingCoupon(null);
    setNewCoupon(initialCouponState);
    setShowModal(true);
  };

  const togglePlanSelection = (planId) => {
    setNewCoupon(prev => {
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
      <div className="space-y-8 max-w-7xl font-sans text-white">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton className="h-10 w-64 rounded-xl" />
            <Skeleton className="h-4 w-40 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-32 rounded-xl" />
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
            <Tag className="w-8 h-8 text-indigo-400" />
            Discount Coupons
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Create and manage promotional codes for checkouts.
          </p>
        </div>
        
        <button 
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl font-bold text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
          const isDepleted = coupon.maxUsage && coupon.usedCount >= coupon.maxUsage;
          const isWorking = coupon.isActive && !isExpired && !isDepleted;

          return (
            <div key={coupon.id} className={`relative flex flex-col justify-between p-6 rounded-[2rem] border ${isWorking ? 'border-white/5 bg-white/[0.02]' : 'border-red-500/10 bg-red-500/[0.02] opacity-80'} backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300 shadow-xl overflow-hidden`}>
              <div className="mb-4 flex justify-between items-start">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider ${isWorking ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isWorking ? 'Active' : isExpired ? 'Expired' : isDepleted ? 'Depleted' : 'Inactive'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleStatus(coupon)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Toggle Active Status">
                    {coupon.isActive ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button onClick={() => openEditModal(coupon)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(coupon.id)} className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-black font-mono tracking-wider text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">{coupon.code}</span>
                </div>
                <div className="text-4xl font-black text-indigo-400 mt-4">
                  {coupon.type === 'PERCENTAGE' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-400 mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between">
                  <span>Usage</span>
                  <span className="text-white font-medium">{coupon.usedCount} / {coupon.maxUsage || '∞'}</span>
                </div>
                {coupon.minPurchase && (
                  <div className="flex justify-between">
                    <span>Min Purchase</span>
                    <span className="text-white font-medium">₹{coupon.minPurchase}</span>
                  </div>
                )}
                {coupon.expiryDate && (
                  <div className="flex justify-between">
                    <span>Expires</span>
                    <span className="text-white font-medium">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Allowed Plans</span>
                  <span className="text-white font-medium text-right max-w-[120px] truncate">
                    {coupon.planIds.length > 0 ? `${coupon.planIds.length} selected` : 'All Plans'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {coupons.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500">
            No coupons found. Create one to get started.
          </div>
        )}
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
                  <h2 className="text-2xl font-black tracking-tight">{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</h2>
                  <button onClick={() => setShowModal(false)} className="p-2 bg-white/5 rounded-xl hover:bg-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateOrUpdate} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Coupon Code</label>
                      <input
                        type="text"
                        required
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase().replace(/\s/g, '') })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="e.g. DIWALI50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Discount Type</label>
                      <select
                        value={newCoupon.type}
                        onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 appearance-none"
                      >
                        <option value="PERCENTAGE" className="bg-gray-900">Percentage (%)</option>
                        <option value="FIXED" className="bg-gray-900">Fixed Amount (₹)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Discount Value</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max={newCoupon.type === 'PERCENTAGE' ? 100 : undefined}
                        value={newCoupon.discountValue}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder={newCoupon.type === 'PERCENTAGE' ? "e.g. 20" : "e.g. 500"}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Max Usage Limit</label>
                      <input
                        type="number"
                        min="1"
                        value={newCoupon.maxUsage}
                        onChange={(e) => setNewCoupon({ ...newCoupon, maxUsage: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="Optional (e.g. 100)"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Minimum Purchase Amount (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={newCoupon.minPurchase}
                        onChange={(e) => setNewCoupon({ ...newCoupon, minPurchase: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        placeholder="Optional"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Expiry Date</label>
                      <input
                        type="date"
                        value={newCoupon.expiryDate}
                        onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">Allowed Plans (Leave empty for all plans)</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {plans.map(plan => (
                        <div 
                          key={plan.id}
                          onClick={() => togglePlanSelection(plan.id)}
                          className={`p-3 rounded-xl border text-sm cursor-pointer transition-colors ${newCoupon.planIds.includes(plan.id) ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                        >
                          <div className="font-semibold">{plan.name}</div>
                          <div className="text-xs opacity-70">₹{plan.discountPrice || plan.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                    <button type="submit" disabled={submitting} className="px-6 py-3 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wide hover:bg-gray-200">
                      {submitting ? 'Saving...' : 'Save Coupon'}
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
