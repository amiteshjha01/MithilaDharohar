'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutPayload, ShippingInfo } from '@/lib/types';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<ShippingInfo>({
    name: '',
    mobile: '',
    pincode: '',
    city: '',
    state: '',
    addressLine: '',
  });

  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');

        if (cart.items.length === 0) {
          router.push('/products');
          return;
        }

        const res = await fetch('/api/products?category=all');
        const data = await res.json();
        
        const products = cart.items.map((item: any) => {
           const product = data.data?.find((p: any) => p._id.toString() === item.productId.toString());
           return product ? { ...product, quantity: item.quantity } : null;
        }).filter(Boolean);

        setCartItems(products);
      } catch (err) {
        setError('Failed to load heritage checkout data');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutDetails();
  }, [router]);

  const subtotal = cartItems.reduce((sum, item) => {
    const { getEffectivePrice } = require('@/lib/helpers');
    return sum + (getEffectivePrice(item.price, item.discount) * item.quantity);
  }, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Unified validation (Removed duplicate mobile check)
      if (!formData.name || !formData.pincode || !formData.city || !formData.state || !formData.addressLine || !phoneNumber) {
        setError('Please complete all heritage details for your sacred order');
        setSubmitting(false);
        return;
      }

      const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      const payload: CheckoutPayload = {
        items: cart.items,
        shippingInfo: {
          ...formData,
          mobile: phoneNumber // Map for backend compatibility
        },
        phoneNumber,
      };

      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to authenticate the sacred order');
        setSubmitting(false);
        return;
      }

      localStorage.setItem('currentOrder', JSON.stringify({
        orderId: data.data.orderId,
        razorpayOrderId: data.data.razorpayOrderId,
        amount: data.data.amount,
      }));

      router.push('/payment');
    } catch (err) {
      setError('A connection error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-heritage-muted">Preparing Your Heritage Passage...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary pb-40">
      {/* Editorial Header */}
      <div className="bg-heritage-bone border-b border-primary/5 py-24 md:py-32">
        <div className="container-editorial">
           <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-6 block animate-fade-up">Final Validation</span>
           <h1 className="text-5xl md:text-9xl font-serif font-bold text-heritage-dark tracking-tighter animate-fade-up">Checkout</h1>
        </div>
      </div>

      <div className="container-editorial mt-16 md:mt-24">
        {error && (
          <div className="bg-primary/5 border border-primary/10 text-primary px-8 py-6 rounded-3xl mb-12 flex items-center gap-6 animate-fade-up text-[10px] font-bold uppercase tracking-widest shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
          <div className="lg:col-span-8 space-y-20">
            <form onSubmit={handleSubmit} className="space-y-20">
              {/* identity Section */}
              <section className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-6 mb-12">
                   <span className="text-4xl font-serif italic text-primary/20">01.</span>
                   <h2 className="text-3xl font-serif font-bold text-heritage-dark underline decoration-primary/10 underline-offset-8">Personal Heritage</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">Full Identity</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="NAME ON ARTISAN LIST"
                      className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30"
                      required
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">Contact Number</label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Section */}
              <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-6 mb-12">
                   <span className="text-4xl font-serif italic text-primary/20">02.</span>
                   <h2 className="text-3xl font-serif font-bold text-heritage-dark underline decoration-primary/10 underline-offset-8">The Destination</h2>
                </div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">Sanctuary Address</label>
                    <textarea
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      placeholder="HOUSE, STREET, LOCALITY..."
                      rows={3}
                      className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30 resize-none leading-relaxed"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="CITY"
                        className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="STATE"
                        className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted ml-2">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="000000"
                        className="w-full px-8 py-5 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-[11px] font-bold tracking-[0.2em] uppercase placeholder:text-heritage-muted/30"
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <div className="bg-heritage-dark text-heritage-bone rounded-[4rem] p-12 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
              
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-heritage-gold mb-12 pb-8 border-b border-white/5">Order Dossier</h2>

              <div className="space-y-8 mb-12 pb-12 border-b border-white/5 max-h-72 overflow-y-auto pr-4 no-scrollbar">
                 {cartItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-8 group">
                       <span className="text-[10px] font-bold text-heritage-bone/90 uppercase tracking-[0.2em] line-clamp-1 flex-1 group-hover:text-heritage-gold transition-colors italic leading-relaxed">{item.name}</span>
                       <span className="text-heritage-gold text-[10px] font-bold tracking-widest whitespace-nowrap">Q: {item.quantity}</span>
                    </div>
                 ))}
              </div>

              <div className="space-y-8 mb-16">
                 <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.3em]">
                    <span className="text-heritage-bone/40">Boutique Delivery</span>
                    <span className="text-heritage-gold italic font-serif text-[12px]">Complimentary</span>
                 </div>
                 <div className="flex justify-between items-end border-t border-white/5 pt-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">Total Acquisition</span>
                    <span className="text-5xl font-serif font-bold tracking-tighter text-heritage-bone italic">₹{subtotal.toFixed(0)}</span>
                 </div>
              </div>

              <button
                onClick={() => handleSubmit(null as any)}
                disabled={submitting}
                className="btn-boutique !bg-heritage-bone !text-heritage-dark w-full shadow-3xl !py-6 !text-[12px] hover:!bg-primary hover:!text-heritage-bone"
              >
                {submitting ? 'Authenticating...' : 'Authorize Acquisition'}
              </button>

              <div className="mt-12 flex flex-col items-center gap-6 border-t border-white/5 pt-8">
                 <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-bone/20">
                   <svg className="w-5 h-5 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                   Secure Heritage Gateway
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
