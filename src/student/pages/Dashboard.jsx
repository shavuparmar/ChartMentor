import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';
import CheckoutButton from '../../components/CheckoutButton';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [dashboardRes, settingsRes, plansRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/student/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/student/settings`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/plan`)
        ]);
        
        setData(dashboardRes.data.data);
        setSettings(settingsRes.data.data);
        setPlans(plansRes.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const isActive = data?.membership?.status === 'ACTIVE';

  const handleJoin = (platform) => {
    if (!isActive) return;
    const link = platform === 'discord' ? settings?.discordLink : settings?.telegramLink;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      alert(`${platform} link is not configured by the admin yet.`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 border ${isActive ? 'border-black bg-black text-white' : 'border-gray-300 bg-white flex flex-col'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Membership Status</h2>
            {isActive ? <CheckCircle className="text-white" /> : <Clock className="text-black" />}
          </div>
          <p className="text-3xl font-bold mb-2">{isActive ? 'Active' : 'Inactive'}</p>
          <p className="text-sm opacity-80 mb-6">
            {isActive
              ? `Valid until ${new Date(data.membership.endDate).toLocaleDateString()}`
              : 'You do not have an active membership.'}
          </p>
          {!isActive && (
            <div className="mt-auto space-y-4 border-t pt-4">
              <h3 className="font-bold text-lg">Available Plans</h3>
              {plans.length > 0 ? plans.map(plan => (
                <div key={plan.id} className="p-4 border border-black bg-gray-50 flex flex-col space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{plan.name}</h4>
                      <p className="text-xs text-gray-600">{plan.description}</p>
                    </div>
                    <span className="font-bold text-lg">Rs. {plan.price}</span>
                  </div>
                  <CheckoutButton amount={plan.price} planId={plan.id} onSuccess={() => window.location.reload()} />
                </div>
              )) : (
                <p className="text-sm text-gray-500">No plans available right now. Please check back later.</p>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border border-black bg-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Community Access</h2>
            <p className="text-gray-600 mb-6">Join our exclusive Discord and Telegram groups.</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleJoin('discord')}
              disabled={!isActive}
              className={`w-full py-2 font-bold border transition-colors ${isActive ? 'border-black bg-white text-black hover:bg-black hover:text-white' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Join Discord
            </button>
            <button
              onClick={() => handleJoin('telegram')}
              disabled={!isActive}
              className={`w-full py-2 font-bold border transition-colors ${isActive ? 'border-black bg-white text-black hover:bg-black hover:text-white' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Join Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
