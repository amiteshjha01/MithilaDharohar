'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface OrderDetails {
  orderId: string;
  total: number;
  items: any[];
  shippingAddress: any;
}

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resolvedParams = await params;
        setOrderId(resolvedParams.orderId);

        // In a real app, we'd fetch details from DB
        setOrderDetails({
          orderId: resolvedParams.orderId,
          total: 0,
          items: [],
          shippingAddress: {},
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-heritage-muted">Securing Your Heritage Passage...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary pb-40">
      {/* Header Space */}
      <div className="h-24 md:h-32"></div>

      <div className="container-editorial pt-12">
        <div className="bg-heritage-bone rounded-[4rem] shadow-3xl p-12 md:p-32 border border-primary/5 relative overflow-hidden text-center animate-fade-up">
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-primary rounded-[3rem] mb-12 shadow-3xl animate-fade-up">
              <svg
                className="w-14 h-14 text-heritage-bone"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-10 block animate-fade-up" style={{ animationDelay: '0.2s' }}>Sacred Selection Confirmed</span>
            <h1 className="text-6xl md:text-9xl font-serif font-bold text-heritage-dark mb-12 leading-[0.85] tracking-tighter animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Blessed <br /> <span className="italic font-normal pr-4">Origins.</span>
            </h1>
            <p className="text-xl md:text-2xl text-heritage-muted max-w-2xl mx-auto mb-20 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '0.6s' }}>
              Your piece of heritage is being sanctified by our artisans. We are honored to bring the soul of Mithila to your home.
            </p>

            <div className="w-full max-w-xl bg-heritage-dark/5 rounded-[3rem] p-12 mb-24 border border-primary/5 relative group animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-heritage-bone px-8">
                 <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Manifest Reference</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-heritage-dark tracking-[0.3em] break-all group-hover:scale-105 transition-all duration-700 uppercase">
                {orderId}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left w-full pt-20 border-t border-primary/5 animate-fade-up" style={{ animationDelay: '1s' }}>
              <div className="space-y-10">
                <h3 className="text-[11px] font-bold text-heritage-dark uppercase tracking-[0.4em] underline decoration-primary/20 underline-offset-8">Heritage Journey</h3>
                <ul className="space-y-10">
                  {[
                    { step: 'Order Sanctified', desc: 'Securely processed and legacy logged.' },
                    { step: 'Artisan Selection', desc: 'Hand-picked from our sacred workshop.' },
                    { step: 'Boutique Packaging', desc: 'Sustainably wrapped in Mithila lore.' },
                    { step: 'Safe Passage', desc: 'Tracking details manifesting via email.' }
                  ].map((s, i) => (
                    <li key={i} className="flex gap-8 items-start group">
                      <div className="w-8 h-8 rounded-full bg-heritage-bone border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm transition-all group-hover:bg-primary group-hover:text-heritage-bone">
                         <span className="text-[12px] font-serif italic">{i+1}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-heritage-dark uppercase tracking-[0.2em] mb-2">{s.step}</p>
                        <p className="text-[14px] text-heritage-muted font-medium leading-relaxed opacity-80">{s.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-heritage-dark text-heritage-bone rounded-[3rem] p-12 shadow-3xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-[11px] font-bold text-primary uppercase tracking-[0.4em] mb-8">Custodial Support</h3>
                    <p className="text-[14px] opacity-50 leading-relaxed mb-12 font-medium">
                      Our artisans put their soul into every work. If your journey requires guidance, our sanctuary is open.
                    </p>
                    <div className="flex flex-col gap-8">
                       <Link href="/about" className="text-[10px] font-bold text-heritage-bone uppercase tracking-[0.4em] hover:text-primary transition-all flex items-center gap-4 group/link">
                         Our Collective Story 
                         <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                       </Link>
                       <Link href="/contact" className="text-[10px] font-bold text-heritage-bone uppercase tracking-[0.4em] hover:text-primary transition-all flex items-center gap-4 group/link">
                         Message The Sanctuary 
                         <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                       </Link>
                    </div>
                 </div>
                 <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[100px] -mb-24 -mr-24 transition-opacity group-hover:opacity-100 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="mt-20 flex flex-col sm:flex-row gap-8 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '1.2s' }}>
          <Link
            href="/products"
            className="btn-boutique btn-boutique-primary flex-1 shadow-3xl group"
          >
            Discover More Heritage
            <svg className="w-5 h-5 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </Link>

          <Link
            href="/"
            className="btn-boutique btn-boutique-outline flex-1 bg-white group"
          >
            Return to Sanctuary
            <svg className="w-5 h-5 transition-all group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
