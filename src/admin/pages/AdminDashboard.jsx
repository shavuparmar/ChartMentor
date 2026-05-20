import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, DollarSign, CreditCard } from 'lucide-react';

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-gray-800 bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-400 font-medium">Total Students</h2>
            <Users className="text-gray-400" />
          </div>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>
        
        <div className="p-6 border border-gray-800 bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-400 font-medium">Total Revenue</h2>
            <DollarSign className="text-gray-400" />
          </div>
          <p className="text-3xl font-bold">Rs. {data.totalRevenue}</p>
        </div>

        <div className="p-6 border border-gray-800 bg-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-400 font-medium">Recent Payments</h2>
            <CreditCard className="text-gray-400" />
          </div>
          <p className="text-3xl font-bold">{data.recentPayments.length}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 px-4 font-medium">User</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentPayments.map(payment => (
                <tr key={payment.id} className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
                  <td className="py-3 px-4">{payment.user?.firstName} {payment.user?.lastName}</td>
                  <td className="py-3 px-4 font-mono">Rs. {payment.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-bold ${payment.status === 'SUCCESS' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {data.recentPayments.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">No recent transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
