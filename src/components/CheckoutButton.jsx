import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Loader2, Tag, CheckCircle2, XCircle } from 'lucide-react';

export default function CheckoutButton({ amount, planId, className = "" }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error("Please enter a coupon code");
    setCouponLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/coupon/validate`, {
        code: couponCode,
        planId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAppliedCoupon(res.data.data);
      toast.success(res.data.data.message);
    } catch (error) {
      setAppliedCoupon(null);
      toast.error(error.response?.data?.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCoupon(null);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = { planId, couponCode: appliedCoupon?.couponCode || null };
      
      const orderRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, 
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Merchant UPI Payment URL or Show QR
      if (orderRes.data.success) {
         if (orderRes.data.data.paymentUrl) {
            window.location.href = orderRes.data.data.paymentUrl;
         } else if (orderRes.data.data.qrUrl) {
            setQrCode(orderRes.data.data.qrUrl);
            setOrderId(orderRes.data.data.id);
            // Optionally, we could start polling for status here
         } else {
            toast.error("Failed to get payment details.");
         }
      } else {
         toast.error("Failed to get payment details.");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  const finalAmount = appliedCoupon ? appliedCoupon.finalAmount : amount;

  if (qrCode) {
    return (
      <div className={`space-y-4 text-center ${className}`}>
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl inline-block mx-auto">
          <p className="text-sm font-bold text-gray-300 mb-4">Scan QR to Pay ₹{finalAmount}</p>
          <img src={qrCode} alt="UPI QR Code" className="w-48 h-48 mx-auto bg-white p-2 rounded-lg" />
          <p className="text-xs text-gray-500 mt-4">Order ID: {orderId}</p>
          <button 
            onClick={() => window.location.href = `/payment/status?cmOrderId=${orderId}`}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wide rounded-lg transition-colors w-full"
          >
            I have paid
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Coupon Section */}
      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Have a coupon code?"
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white outline-none focus:border-indigo-500/50 uppercase"
              />
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={couponLoading || !couponCode}
              className="px-4 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 hover:text-indigo-300 font-bold text-xs uppercase tracking-wide rounded-lg transition-colors disabled:opacity-50"
            >
              {couponLoading ? '...' : 'Apply'}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{appliedCoupon.couponCode} Applied</span>
                <span className="text-[10px] text-emerald-400/80">₹{appliedCoupon.discountApplied} discount</span>
              </div>
            </div>
            <button onClick={removeCoupon} className="text-gray-400 hover:text-red-400 transition-colors p-1">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={handlePayment} 
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300 rounded-xl text-white font-bold text-xs uppercase tracking-[0.15em] disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Pay ₹{finalAmount} with UPI
          </>
        )}
      </button>
    </div>
  );
}
