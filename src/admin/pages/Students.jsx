import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading students...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
      
      <div className="bg-gray-900 border border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 bg-black/50">
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Membership Status</th>
              <th className="py-3 px-4 font-medium">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-800/50 hover:bg-gray-800 transition-colors">
                <td className="py-3 px-4 text-white font-medium">{student.firstName} {student.lastName}</td>
                <td className="py-3 px-4 text-gray-400">{student.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-bold ${student.membership?.status === 'ACTIVE' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400'}`}>
                    {student.membership?.status || 'NONE'}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm">{new Date(student.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="py-8 text-center text-gray-500">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
