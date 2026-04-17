'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Get order data from localStorage
      const currentOrder = localStorage.getItem('currentOrder');

      if (!currentOrder) {
        setError('No order found. Please return to the sanctuary and try again.');
        setLoading(false);
        return;
      }

      const order = JSON.parse(currentOrder);
      setOrderData(order);
      setLoading(false);

      // Heritage Test Mode: Immediate handshake for mock orders
      if (order.razorpayOrderId?.startsWith('mock_order_')) {
        console.warn('[RAZORPAY] Simulating successful heritage handshake...');
        setTimeout(() => {
          handlePaymentSuccess({
            razorpay_order_id: order.razorpayOrderId,
            razorpay_payment_id: `mock_pay_${Math.random().toString(16).slice(2, 10)}`,
            razorpay_signature: 'mock_signature'
          }, order);
        }, 1500);
        return;
      }

      // Auto-initiate real payment after a slight delay
      setTimeout(() => {
        initiatePayment(order);
      }, 1200);
    };

    script.onerror = () => {
      setError('Failed to load heritage payment gateway. Please refresh.');
      setLoading(false);
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initiatePayment = (order: any) => {
    if (!window.Razorpay) {
      setError('Sanctuary payment gateway not loaded. Please refresh.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(order.amount * 100), // Amount in paise
      currency: 'INR',
      order_id: order.razorpayOrderId,
      name: 'MithilaDharohar',
      description: `Authentic Heritage | Order ${order.orderId}`,
      theme: { color: '#4A0E0E' }, // Updated to heritage red
      prefill: {
        contact: '',
        email: '',
      },
      handler: async (response: any) => {
        // Payment successful
        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            // Clear cart and order data
            localStorage.removeItem('cart');
            localStorage.removeItem('currentOrder');

            // Redirect to success page
            router.push(`/order-confirmation/${verifyData.data.orderId}`);
          } else {
            setError('Heritage validation failed. Please contact our support.');
          }
        } catch (err) {
          setError('Failed to verify sacred transaction. Please contact support.');
        }
      },
      modal: {
        ondismiss: () => {
          setError('Transaction paused. Returning to sanctuary...');
          setTimeout(() => {
            router.push('/cart');
          }, 2000);
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      setError(
        `Sacred transaction failed: ${response.error.description}. Please try another method.`
      );
    });

    rzp.open();
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center p-6 pb-24">
      <div className="bg-heritage-bone rounded-[4rem] shadow-3xl p-16 md:p-24 max-w-lg w-full border border-primary/5 relative overflow-hidden text-center animate-fade-up">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary/10"></div>
        
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-10">
            <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-heritage-muted">Activating Secure Vault...</p>
          </div>
        ) : error ? (
          <div className="animate-fade-up">
            <div className="w-20 h-20 bg-primary/5 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-primary/10 shadow-sm">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.745-3L12 3a1.5 1.5 0 00-2.693 0L2.341 15c-.757 1.333.204 3 1.745 3z"/></svg>
            </div>
            <h2 className="text-4xl font-serif font-bold text-heritage-dark mb-6 italic underline decoration-primary/10 underline-offset-8">Transaction Paused</h2>
            <p className="text-[13px] text-heritage-muted mb-12 leading-relaxed font-medium uppercase tracking-widest opacity-60 px-4">{error}</p>
            <button
              onClick={() => router.push('/cart')}
              className="btn-boutique btn-boutique-outline w-full !py-6"
            >
              Return to Sanctuary
            </button>
          </div>
        ) : orderData ? (
          <div className="animate-fade-up">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-10 block opacity-80">Sacred Passage Check</span>
            <div className="space-y-6 mb-16">
              <p className="text-[9px] text-heritage-muted font-bold uppercase tracking-[0.4em] opacity-40">Amount to Authorize</p>
              <p className="text-7xl font-serif font-bold text-heritage-dark tracking-tighter italic">
                ₹{orderData.amount.toFixed(0)}
              </p>
            </div>
            
            <div className="bg-heritage-dark/5 rounded-[2rem] p-8 mb-16 text-[10px] font-bold text-heritage-muted uppercase tracking-[0.3em] border border-primary/5">
               REF: {orderData.orderId}
            </div>

            <p className="text-[9px] text-heritage-muted/50 font-bold mb-12 uppercase tracking-[0.5em] italic animate-pulse">
              Awaiting Secure Interaction...
            </p>
            
            <button
              onClick={() => initiatePayment(orderData)}
              className="btn-boutique btn-boutique-primary w-full shadow-3xl flex items-center justify-center gap-6 group"
            >
              Authorize Securely
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
            
            <div className="mt-16 flex items-center justify-center gap-4 text-[8px] font-bold text-heritage-muted/30 uppercase tracking-[0.4em] border-t border-primary/5 pt-10">
               <svg className="w-4 h-4 opacity-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
               Razorpay Secured Gateway
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
