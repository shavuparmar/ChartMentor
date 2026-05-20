import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/plan`);
      setPlans(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/plan`, {
        ...newPlan,
        price: Number(newPlan.price)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Plan created successfully');
      setShowModal(false);
      setNewPlan({ name: '', description: '', price: '' });
      fetchPlans();
    } catch (error) {
      toast.error('Failed to create plan');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/plan/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Plan deleted');
      fetchPlans();
    } catch (error) {
      toast.error('Failed to delete plan');
    }
  };

  if (loading) return <div>Loading plans...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Membership Plans</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-4 py-2 font-bold flex items-center space-x-2 hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          <span>Add Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-900 border border-gray-800 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
              <p className="text-3xl font-black text-white mb-4">Rs. {plan.price}</p>
              <p className="text-gray-400 mb-6">{plan.description}</p>
            </div>
            <button
              onClick={() => handleDelete(plan.id)}
              className="flex items-center justify-center space-x-2 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white py-2 w-full transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        ))}
        {plans.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500 border border-gray-800">
            No plans found. Create one to show on the landing page!
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Plan</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full bg-black border border-gray-700 text-white p-2 focus:border-white outline-none"
                  placeholder="e.g. Premium Access"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Price (INR)</label>
                <input
                  type="number"
                  required
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                  className="w-full bg-black border border-gray-700 text-white p-2 focus:border-white outline-none"
                  placeholder="e.g. 4999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  required
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  className="w-full bg-black border border-gray-700 text-white p-2 focus:border-white outline-none h-24"
                  placeholder="What is included?"
                ></textarea>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black font-bold py-2 hover:bg-gray-200 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-transparent border border-gray-600 text-gray-300 font-bold py-2 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
