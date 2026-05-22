import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Loader2 } from 'lucide-react';

export default function CheckoutButton({ amount, planId, className = "" }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, 
        { amount, planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: orderRes.data.key,
        amount: orderRes.data.data.amount,
        currency: "INR",
        name: "ChartMentor",
        description: "Premium Mentorship",
        order_id: orderRes.data.data.id,
        handler: async function (response) {
          try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Payment successful! Membership activated.");
            window.location.reload();
          } catch (error) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user ? `${user.firstName} ${user.lastName}` : "Student",
          email: user?.email || "student@example.com",
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        toast.error(response.error.description);
      });
      rzp.open();

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className={`w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-xl text-white font-bold text-xs uppercase tracking-[0.15em] disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-white" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4" />
          Pay with Razorpay
        </>
      )}
    </button>
  );
}
