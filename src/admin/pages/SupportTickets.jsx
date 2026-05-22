import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MessageSquare, Clock, CheckCircle2, CircleDashed, X, Send, User, ShieldCheck } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminSupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState('');
  const [activeTicket, setActiveTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl font-sans text-white">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-[2rem]" />
          <Skeleton className="h-40 w-full rounded-[2rem]" />
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5" /> Open
          </span>
        );
      case 'CLOSED':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/10 text-gray-400 border border-gray-500/20 whitespace-nowrap">
            <X className="w-3.5 h-3.5" /> Closed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap">
            <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-400" />
          Support Tickets
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage and reply to student inquiries and issues.
        </p>
      </div>

      {/* Tickets List */}
      <div className="space-y-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl hover:border-white/10 transition-colors shadow-2xl group relative">
            
            {/* Header section */}
            <div className="p-6 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">{ticket.subject}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {ticket.user?.email}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                {getStatusBadge(ticket.status)}
                {ticket.status !== 'CLOSED' && (
                  <button 
                    onClick={() => handleClose(ticket.id)}
                    className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Mark Closed
                  </button>
                )}
              </div>
            </div>

            {/* Chat History */}
            <div className="p-6 sm:p-8 space-y-6 bg-black/20">
              {ticket.replies.map((reply) => {
                const isAdmin = !!reply.adminId;
                return (
                  <div key={reply.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-5 ${
                      isAdmin 
                        ? 'bg-blue-600/10 border border-blue-500/20 text-gray-200 rounded-tr-sm' 
                        : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-sm'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${isAdmin ? 'text-blue-400' : 'text-gray-400'}`}>
                          {isAdmin ? <><ShieldCheck className="w-3 h-3"/> You</> : <><User className="w-3 h-3"/> Student</>}
                        </span>
                        <span className="text-[10px] text-gray-500">• {new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{reply.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions / Reply Form */}
            <div className="p-6 sm:p-8 border-t border-white/5 bg-white/[0.01]">
              {ticket.status !== 'CLOSED' && activeTicket !== ticket.id && (
                <button 
                  onClick={() => setActiveTicket(ticket.id)}
                  className="w-full sm:w-auto px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wide rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Reply to Ticket
                </button>
              )}

              <AnimatePresence>
                {activeTicket === ticket.id && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={(e) => handleReply(e, ticket.id)} 
                    className="space-y-4 overflow-hidden"
                  >
                    <textarea 
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      placeholder="Type your official response here..."
                      required
                      rows="4"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 resize-none"
                    ></textarea>
                    <div className="flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => setActiveTicket(null)}
                        className="px-6 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                        {submitting ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-16 text-center">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <p className="text-lg font-bold tracking-wide text-gray-300">Inbox Zero!</p>
            <p className="text-sm text-gray-500 mt-2">No active support tickets to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
