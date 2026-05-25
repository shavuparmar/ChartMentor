import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Receipt, ExternalLink } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function StudentInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInvoices(res.data.data.invoices || []);
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
      <div className="space-y-6 max-w-6xl">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl font-sans text-white">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <Receipt className="w-8 h-8 text-blue-400" />
          Invoices
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Download and view your membership payment receipts.
        </p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Invoice Number</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Date</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Amount</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400 text-right">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-6 font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-400">
                    {new Date(invoice.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-white">
                    ₹{invoice.amount}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {invoice.invoiceNumber ? (
                      <button 
                        onClick={() => downloadInvoice(invoice.invoiceNumber)}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-4 py-2 rounded-xl transition-colors border border-blue-500/20 cursor-pointer"
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs font-medium px-4 py-2 bg-white/5 rounded-xl border border-white/5 inline-flex">Not available</span>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No invoices found</p>
                    <p className="text-sm text-gray-500 mt-1">You haven't made any payments yet.</p>
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
