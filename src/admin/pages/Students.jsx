import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Search, Mail, Calendar, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../../common/Loader';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.firstName.toLowerCase().includes(search.toLowerCase()) || 
    s.lastName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
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

  return (
    <div className="space-y-8 max-w-7xl font-sans text-white">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-400" />
          Student Management
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          View and manage all registered students and their membership statuses.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-xl shadow-lg">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search students by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all placeholder:text-gray-600"
          />
        </div>
        <div className="text-sm font-bold text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5 whitespace-nowrap">
          Total Students: <span className="text-white">{filteredStudents.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Student Name</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Contact Email</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Membership</th>
                <th className="py-4 px-6 font-bold text-xs uppercase tracking-wider text-gray-400">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <span className="font-semibold text-sm text-gray-200 group-hover:text-white transition-colors">
                        {student.firstName} {student.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4 text-gray-500" />
                      {student.email}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {student.membership?.status === 'ACTIVE' ? (
                      <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-500/10 text-gray-400 border border-gray-500/20">
                        <ShieldAlert className="w-3.5 h-3.5" /> None
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      {new Date(student.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-16 text-center">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 font-medium">No students found matching your criteria</p>
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
