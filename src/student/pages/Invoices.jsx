import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';

export default function StudentInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        // Actually, we can just get invoices from dashboard endpoint since we include them there, 
        // but for now, let's assume we fetch user data from dashboard endpoint which contains invoices.
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/dashboard`, {
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

  if (loading) return <div>Loading invoices...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
      <div className="bg-white border border-black overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black bg-gray-50">
              <th className="py-3 px-4 font-bold">Invoice Number</th>
              <th className="py-3 px-4 font-bold">Date</th>
              <th className="py-3 px-4 font-bold">Amount</th>
              <th className="py-3 px-4 font-bold text-right">Download</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-mono">{invoice.invoiceNumber}</td>
                <td className="py-3 px-4">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">Rs. {invoice.amount}</td>
                <td className="py-3 px-4 text-right">
                  {invoice.pdfUrl ? (
                    <a 
                      href={`${import.meta.env.VITE_API_URL}${invoice.pdfUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-black hover:underline font-medium"
                    >
                      <Download size={16} />
                      <span>PDF</span>
                    </a>
                  ) : (
                    <span className="text-gray-400">Not available</span>
                  )}
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">No invoices found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
