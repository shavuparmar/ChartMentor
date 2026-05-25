import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, Search, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const downloadInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invoice/${invoiceId}/download`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Invoice download failed:", errorText);
        throw new Error("Invoice download failed");
      }

      if (!contentType || !contentType.includes("application/pdf")) {
        const errorText = await response.text();
        console.error("Expected PDF but received:", contentType, errorText);
        throw new Error("Invalid PDF response");
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Downloaded PDF is empty");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Invoice download error:", error);
      alert("Unable to download invoice. Please try again.");
    }
  };

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

  const filteredPayments = payments.filter(p =>
    p.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    p.merchantTransactionId?.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl font-sans text-white">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <Skeleton className="h-4 w-40 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-full max-w-md rounded-xl" />
        <Skeleton className="h-96 rounded-[2rem]" />
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === 'SUCCESS') {
      return (
        <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3.5 h-3.5" /> Success
        </span>
      );
    }
    if (status === 'FAILED') {
      return (
        <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
          <XCircle className="w-3.5 h-3.5" /> Failed
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Clock className="w-3.5 h-3.5" /> Pending
      </span>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl font-sans text-white relative">

      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-blue-400" />
          Payments Management
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Track and monitor all transactions across the platform.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-xl shadow-lg">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by email or transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="text-sm font-bold text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5 whitespace-nowrap">
          Total Transactions: <span className="text-white">{filteredPayments.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Transaction ID</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">User Email</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Amount</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Status</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Date</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-6 font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                    {payment.merchantTransactionId || payment.id}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-300">
                    {payment.user?.email || 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">
                    ₹{payment.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {payment.invoice?.invoiceNumber ? (
                      <button
                        onClick={() => downloadInvoice(payment.invoice.invoiceNumber)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/20 cursor-pointer"
                      >
                        <FileText size={14} /> PDF
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs font-medium px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 inline-flex">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-16 text-center">
                    <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No transactions found</p>
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
