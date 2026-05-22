import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MessageSquare, Plus, X, Send, Clock, CheckCircle2, CircleDashed } from 'lucide-react';
import { Skeleton } from '../../common/Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudentSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Open
          </span>
        );
      case 'CLOSED':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/10 text-gray-400 border border-gray-500/20">
            <X className="w-3.5 h-3.5" /> Closed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans text-white relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            Support Center
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Need help? Contact our support team for assistance.
          </p>
        </div>
        
        <button 
          onClick={() => setShowNew(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl text-white font-bold text-sm uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-[#0a0f1c] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />

              <div className="p-6 sm:p-8 relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black tracking-tight">Create Ticket</h2>
                  <button 
                    onClick={() => setShowNew(false)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      required
                      placeholder="Brief description of the issue"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Message
                    </label>
                    <textarea 
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      rows="5"
                      placeholder="Provide all the details here..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setShowNew(false)}
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
                      {submitting ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tickets List */}
      <div className="space-y-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl hover:border-white/10 transition-colors shadow-2xl group">
            
            <div className="p-6 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">{ticket.subject}</h2>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {getStatusBadge(ticket.status)}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 bg-black/20">
              {ticket.replies.map((reply, index) => {
                const isAdmin = !!reply.adminId;
                return (
                  <div key={reply.id} className={`flex ${isAdmin ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-5 ${
                      isAdmin 
                        ? 'bg-blue-600/10 border border-blue-500/20 text-gray-200 rounded-tl-sm' 
                        : 'bg-white/5 border border-white/10 text-gray-300 rounded-tr-sm'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${isAdmin ? 'text-blue-400' : 'text-gray-400'}`}>
                          {isAdmin ? 'Support Team' : 'You'}
                        </span>
                        <span className="text-[10px] text-gray-500">• {new Date(reply.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{reply.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}

        {tickets.length === 0 && !showNew && (
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-16 text-center">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <p className="text-lg font-bold tracking-wide text-gray-300">No support tickets yet.</p>
            <p className="text-sm text-gray-500 mt-2">If you have an issue, feel free to open a new ticket.</p>
          </div>
        )}
      </div>
    </div>
  );
}
