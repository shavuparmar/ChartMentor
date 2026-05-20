import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/payments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPayments(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Payments Management</h1>
      
      <div className="bg-gray-900 border border-gray-800 overflow-hidden rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 bg-black/50">
              <th className="py-3 px-4 font-medium">Transaction ID</th>
              <th className="py-3 px-4 font-medium">User</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Date</th>
              <th className="py-3 px-4 font-medium text-right">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-800/50 hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-gray-300">{payment.razorpayPaymentId || payment.id}</td>
                <td className="py-3 px-4 text-white font-medium">{payment.user?.email}</td>
                <td className="py-3 px-4 text-white">Rs. {payment.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-bold ${
                    payment.status === 'SUCCESS' ? 'bg-white text-black' : 
                    payment.status === 'FAILED' ? 'bg-red-900 text-white' : 
                    'bg-gray-700 text-white'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm">{new Date(payment.createdAt).toLocaleString()}</td>
                <td className="py-3 px-4 text-right">
                  {payment.invoice?.pdfUrl ? (
                    <a 
                      href={`${import.meta.env.VITE_API_URL}${payment.invoice.pdfUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent-cyan hover:underline text-sm font-medium"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-gray-600 text-sm">N/A</span>
                  )}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
