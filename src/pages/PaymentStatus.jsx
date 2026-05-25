import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const orderId = searchParams.get('cmOrderId') || searchParams.get('orderId') || searchParams.get('client_txn_id');

  useEffect(() => {
    if (!orderId) {
      toast.error('Invalid payment parameters');
      navigate('/');
      return;
    }

    verifyStatus();
  }, [orderId]);

  const verifyStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
        { merchantOrderId: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const paymentStatus = res.data.status;

      if (paymentStatus === 'SUCCESS') {
        setStatus('success');
        toast.success('Payment verified successfully!');
        setTimeout(() => navigate('/student/dashboard'), 3000);
      } else if (paymentStatus === 'FAILED' || paymentStatus === 'failure') {
        setStatus('failed');
        toast.error('Payment failed.');
        setTimeout(() => navigate('/student/dashboard'), 3000);
      } else {
        // Still pending, retry after 3 seconds
        setTimeout(verifyStatus, 3000);
      }
    } catch (error) {
      console.error(error);
      setStatus('failed');
      toast.error(error.response?.data?.message || 'Error verifying payment status');
      setTimeout(() => navigate('/student/dashboard'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-2xl space-y-6 text-center relative z-10 backdrop-blur-xl">
        {status === 'verifying' && (
          <div className="space-y-4">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
              <CreditCard className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Verifying Payment</h2>
            <p className="text-gray-400 text-sm">Please do not close or refresh this page. We are securely checking your transaction status with the bank.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Payment Successful!</h2>
            <p className="text-gray-400 text-sm">Your membership is now active. Redirecting to your dashboard...</p>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Payment Failed</h2>
            <p className="text-gray-400 text-sm">Your transaction could not be completed. Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}
