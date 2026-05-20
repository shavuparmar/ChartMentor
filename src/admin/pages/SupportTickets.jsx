import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/support-tickets`, {
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

  const handleReply = async (e, ticketId) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/support-tickets/${ticketId}/reply`, 
        { message: replyMessage }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Reply sent');
      setReplyMessage('');
      setActiveTicket(null);
      fetchTickets();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const handleClose = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/support-tickets/${ticketId}/close`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Ticket closed');
      fetchTickets();
    } catch (error) {
      toast.error('Failed to close ticket');
    }
  };

  if (loading) return <div>Loading support tickets...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-gray-900 border border-gray-800 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">{ticket.subject}</h2>
                <p className="text-sm text-gray-400 mt-1">From: {ticket.user?.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs font-bold ${
                  ticket.status === 'OPEN' ? 'bg-white text-black' : 
                  ticket.status === 'CLOSED' ? 'bg-gray-800 text-gray-500' : 
                  'bg-gray-700 text-white'
                }`}>
                  {ticket.status}
                </span>
                {ticket.status !== 'CLOSED' && (
                  <button 
                    onClick={() => handleClose(ticket.id)}
                    className="text-xs text-gray-400 hover:text-white underline"
                  >
                    Close Ticket
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-4">
              {ticket.replies.map(reply => (
                <div key={reply.id} className={`p-4 rounded-sm ${reply.adminId ? 'bg-gray-800 border-l-2 border-white' : 'bg-black'}`}>
                  <p className="text-xs font-bold text-gray-400 mb-1">{reply.adminId ? 'Admin Reply' : 'User Message'}</p>
                  <p className="text-gray-200 whitespace-pre-wrap">{reply.message}</p>
                </div>
              ))}
            </div>

            {ticket.status !== 'CLOSED' && activeTicket !== ticket.id && (
              <button 
                onClick={() => setActiveTicket(ticket.id)}
                className="px-4 py-2 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Reply
              </button>
            )}

            {activeTicket === ticket.id && (
              <form onSubmit={(e) => handleReply(e, ticket.id)} className="mt-4 border-t border-gray-800 pt-4">
                <textarea 
                  value={replyMessage}
                  onChange={e => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  required
                  rows="3"
                  className="w-full bg-black border border-gray-800 focus:border-white outline-none px-4 py-2 text-white transition-colors mb-2"
                ></textarea>
                <div className="flex space-x-2">
                  <button type="submit" className="px-4 py-2 bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors">
                    Send Reply
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setActiveTicket(null)}
                    className="px-4 py-2 border border-gray-800 text-white text-sm hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
        {tickets.length === 0 && (
          <div className="text-center py-8 text-gray-500 border border-gray-800 bg-gray-900 rounded-sm">
            No support tickets.
          </div>
        )}
      </div>
    </div>
  );
}
