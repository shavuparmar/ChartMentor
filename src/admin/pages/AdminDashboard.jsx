import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, DollarSign, CreditCard, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function AdminDashboard() {
  const [data, setData] = useState({ totalUsers: 0, totalRevenue: 0, recentPayments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl font-sans text-white">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-40 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
        <Skeleton className="h-96 rounded-2xl mt-8" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl font-sans text-white relative">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-indigo-400" />
          Platform Overview
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Real-time analytics and recent transaction history.
        </p>
      </div>
      
      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Students */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-all hover:border-indigo-500/20 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Total Students</h2>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-white">{data.totalUsers}</p>
        </div>
        
        {/* Total Revenue */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-all hover:border-emerald-500/20 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Total Revenue</h2>
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            <span className="text-2xl text-emerald-400 mr-1">₹</span>
            {data.totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Recent Payments Count */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-all hover:border-blue-500/20 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">New Payments</h2>
            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-4xl sm:text-5xl font-black tracking-tight text-white">{data.recentPayments.length}</p>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="mt-8 bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">User</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Amount</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Status</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentPayments.map(payment => (
                <tr key={payment.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-6 font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">
                    {payment.user?.firstName} {payment.user?.lastName}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    {payment.status === 'SUCCESS' ? (
                      <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
              {data.recentPayments.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No recent transactions</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
