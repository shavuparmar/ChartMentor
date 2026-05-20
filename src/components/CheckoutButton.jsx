import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CheckoutButton({ amount, planId }) {
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
          name: "Student",
          email: "student@example.com",
        },
        theme: {
          color: "#000000"
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
      className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Pay with Razorpay'}
    </button>
  );
}
