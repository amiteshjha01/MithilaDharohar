'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const key = localStorage.getItem('adminKey');

        if (!key) {
          setShowKeyInput(true);
          setLoading(false);
          return;
        }

        setAdminKey(key);

        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/admin/products', {
            headers: { Authorization: `Bearer ${key}` },
          }),
          fetch('/api/admin/orders', {
            headers: { Authorization: `Bearer ${key}` },
          }),
        ]);

        if (!productsRes.ok || !ordersRes.ok) {
          setError('Unauthorized Access Detected');
          setShowKeyInput(true);
          setLoading(false);
          return;
        }

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        const totalRevenue = ordersData.data.reduce(
          (sum: number, order: any) => {
            if (order.paymentStatus === 'paid') {
              return sum + order.total;
            }
            return sum;
          },
          0
        );

        const pendingOrders = ordersData.data.filter(
          (order: any) => order.status === 'pending'
        ).length;

        setStats({
          totalProducts: productsData.data.length,
          totalOrders: ordersData.data.length,
          totalRevenue,
          pendingOrders,
        });

        setLoading(false);
      } catch (err) {
        setError('Heritage Synchronization Interrupted');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSetKey = (key: string) => {
    localStorage.setItem('adminKey', key);
    setAdminKey(key);
    setShowKeyInput(false);
    window.location.reload();
  };

  if (showKeyInput) {
    return (
      <main className="min-h-screen bg-secondary/50 flex items-center justify-center p-6">
        <div className="bg-white rounded-[4rem] shadow-2xl shadow-primary/10 p-16 max-w-md w-full border border-[#f0e6da] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-primary/20"></div>
          
          <div className="text-center mb-12">
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary mb-6 block">Secure Gateway</span>
             <h1 className="text-4xl font-black text-text-main text-serif leading-tight">
               Artisan <br/> Sanctuary
             </h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted ml-1">Access Credential</label>
               <input
                 type="password"
                 placeholder="••••••••••••"
                 onKeyPress={(e) => {
                   if (e.key === 'Enter') {
                     handleSetKey((e.target as HTMLInputElement).value);
                   }
                 }}
                 className="w-full px-8 py-5 bg-secondary border border-[#f0e6da] rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-black tracking-[1em] text-center"
               />
            </div>

            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[type="password"]'
                ) as HTMLInputElement;
                if (input) {
                  handleSetKey(input.value);
                }
              }}
              className="btn-premium-primary w-full !py-6 hover-glow !text-[12px]"
            >
              Authorize Entry
            </button>
            <p className="text-[9px] text-center text-text-muted font-bold uppercase tracking-[0.4em] opacity-40 italic">Reserved for Custodians of Heritage</p>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted">Awakening Metrics...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary pb-32">
      {/* Header */}
      <div className="bg-white border-b border-[#f0e6da] py-24">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="text-center md:text-left">
             <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary mb-6 block">Management Portal</span>
             <h1 className="text-6xl md:text-8xl font-bold text-text-main text-serif tracking-tighter leading-none italic">Operational <br/> Overview</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminKey');
              window.location.reload();
            }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all"
          >
            Terminal Access [EXIT]
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 mt-20">
        {error && (
          <div className="bg-primary/5 border border-primary/10 text-primary px-10 py-6 rounded-[2.5rem] mb-12 flex items-center gap-6 animate-reveal text-xs font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {[
            { label: 'SACRED INVENTORY', value: stats.totalProducts, desc: 'Units in Sanctuary' },
            { label: 'GLOBAL ORDERS', value: stats.totalOrders, desc: 'Total Heritage Passage' },
            { label: 'ESTD. REVENUE', value: `₹${stats.totalRevenue.toLocaleString()}`, desc: 'Heritage Valuation' },
            { label: 'PENDING ACTION', value: stats.pendingOrders, desc: 'Awaiting Validation', alert: stats.pendingOrders > 0 },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-[3.5rem] p-12 border border-[#f0e6da] transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 ${stat.alert ? 'ring-2 ring-primary/20 bg-primary/5' : ''}`}>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-6 block">{stat.label}</span>
               <p className={`text-5xl font-bold text-serif mb-4 ${stat.alert ? 'text-primary' : 'text-text-main'}`}>{stat.value}</p>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Gateways */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Link
            href="/admin/products"
            className="group bg-white rounded-[4rem] p-16 border border-[#f0e6da] hover:border-primary/30 transition-all duration-700 shadow-xl shadow-primary/5 hover:shadow-2xl flex flex-col items-start relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-[2.5rem] bg-secondary flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <h2 className="text-4xl font-bold text-text-main text-serif mb-6 italic leading-tight">Master Catalog</h2>
            <p className="text-text-muted text-lg font-medium mb-12 leading-relaxed max-w-sm">
              Manage the 2,500-year legacy. Update pricing, curate collections, and monitor artisan stock in real-time.
            </p>
            <span className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary group-hover:translate-x-4 transition-all">
               OPEN INVENTORY <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </span>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <Link
            href="/admin/orders"
            className="group bg-text-main text-white rounded-[4rem] p-16 border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl flex flex-col items-start relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <h2 className="text-4xl font-bold text-serif mb-6 italic leading-tight">Fulfillment Gateway</h2>
            <p className="opacity-60 text-lg font-medium mb-12 leading-relaxed max-w-sm">
              Track the sacred passage of goods. Validate transactions, authorize shipments, and monitor customer outreach.
            </p>
            <span className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-primary group-hover:translate-x-4 transition-all">
               OPEN COMMAND <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </span>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </main>
  );
}
