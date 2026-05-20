import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function StudentSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/support-tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/student/support-tickets`, { subject, message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Ticket created successfully');
      setShowNew(false);
      setSubject('');
      setMessage('');
      fetchTickets();
    } catch (error) {
      toast.error('Failed to create ticket');
    }
  };

  if (loading) return <div>Loading support tickets...</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center border-b border-black pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <button 
          onClick={() => setShowNew(!showNew)}
          className="px-4 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
        >
          {showNew ? 'Cancel' : 'New Ticket'}
        </button>
      </div>

      {showNew && (
        <form onSubmit={handleCreate} className="bg-white border border-black p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Subject</label>
            <input 
              type="text" 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
              className="w-full border border-black px-4 py-2 outline-none focus:ring-1 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Message</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full border border-black px-4 py-2 outline-none focus:ring-1 focus:ring-black"
            ></textarea>
          </div>
          <button type="submit" className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-800 transition-colors">
            Submit Ticket
          </button>
        </form>
      )}

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white border border-gray-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{ticket.subject}</h2>
              <span className={`px-2 py-1 text-xs font-bold ${
                ticket.status === 'OPEN' ? 'bg-black text-white' : 
                ticket.status === 'CLOSED' ? 'bg-gray-200 text-gray-500' : 
                'bg-gray-800 text-white'
              }`}>
                {ticket.status}
              </span>
            </div>
            <div className="space-y-4 border-t border-gray-100 pt-4">
              {ticket.replies.map(reply => (
                <div key={reply.id} className={`p-4 ${reply.adminId ? 'bg-gray-50 border-l-4 border-black' : 'bg-white'}`}>
                  <p className="text-sm font-bold mb-1">{reply.adminId ? 'Support Team' : 'You'}</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{reply.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(reply.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
            {/* We can add a reply form here if ticket is not closed */}
          </div>
        ))}
        {tickets.length === 0 && !showNew && (
          <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300">
            No support tickets found.
          </div>
        )}
      </div>
    </div>
  );
}
