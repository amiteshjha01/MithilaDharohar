'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IOrder } from '@/models/Order';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const key = localStorage.getItem('adminKey');

        if (!key) {
          router.push('/admin/dashboard');
          return;
        }

        setAdminKey(key);

        const res = await fetch('/api/admin/orders', {
          headers: { Authorization: `Bearer ${key}` },
        });

        if (!res.ok) {
          setError('Failed to fetch orders');
          setLoading(false);
          return;
        }

        const data = await res.json();
        setOrders(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);

      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminKey}`,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        setOrders(
          orders.map((o) =>
            o.orderId === orderId
              ? { ...o, status: newStatus as any }
              : o
          )
        );
      } else {
        setError('Failed to update order status');
      }
    } catch (err) {
      setError('Failed to update order');
    } finally {
      setUpdatingOrderId('');
    }
  };

  const getStatusStyle = (
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  ) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
      processing: 'bg-blue-50 text-blue-700 border-blue-100',
      shipped: 'bg-purple-50 text-purple-700 border-purple-100',
      delivered: 'bg-green-50 text-green-700 border-green-100',
      cancelled: 'bg-red-50 text-red-700 border-red-100',
    };
    return styles[status] || 'bg-gray-50 text-gray-700 border-gray-100';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted">Accessing Order Logs...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-[#f0e6da] py-20">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link href="/admin/dashboard" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block hover:translate-x-[-4px] transition-transform">
              ← Dashboard
            </Link>
            <h1 className="text-5xl font-bold text-text-main text-serif tracking-tight">Order fulfillment</h1>
          </div>
          <div className="text-right">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Total Volume</span>
             <p className="text-3xl font-bold text-serif">{orders.length} Sacred Orders</p>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {error && (
          <div className="bg-primary/5 border border-primary/10 text-primary px-8 py-4 rounded-2xl mb-10 text-xs font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-[#f0e6da] shadow-xl">
            <p className="text-3xl font-bold text-serif text-text-muted">Awaiting Genesis Orders</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10">
            {orders.map((order) => (
              <div
                key={order._id?.toString()}
                className="bg-white rounded-[3rem] p-12 border border-[#f0e6da] shadow-2xl shadow-primary/5 group hover:shadow-primary/10 transition-all duration-700"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                  {/* Column 1: Identity */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-2 block">Reference</span>
                      <p className="text-2xl font-bold text-text-main font-mono tracking-tighter">
                        {order.orderId}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-2 block">Authorized By</span>
                      <p className="font-bold text-text-main">
                        {order.shippingAddress.name}
                      </p>
                      <p className="text-sm text-text-muted">{order.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Column 2: Financials & Status */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-end border-b border-secondary pb-6">
                      <div>
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-2 block">Valuation</span>
                         <p className="text-4xl font-bold text-text-main text-serif italic">₹{order.total.toFixed(0)}</p>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-2 block">Deposit</span>
                         <span className={`text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full ${order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                           {order.paymentStatus}
                         </span>
                      </div>
                    </div>

                    <div className="p-6 bg-secondary/50 rounded-2xl flex items-center justify-between gap-6 border border-[#f0e6da]">
                       <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest">
                          <span className={`w-3 h-3 rounded-full animate-pulse ${order.status !== 'delivered' ? 'bg-primary' : 'bg-green-500'}`}></span>
                          {order.status}
                       </div>
                       
                       {order.paymentStatus === 'paid' && order.status !== 'delivered' && (
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            disabled={updatingOrderId === order.orderId}
                            className="bg-white border border-[#f0e6da] rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
                          >
                            <option value="pending">Authorize</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Manifest</option>
                            <option value="delivered">Complete</option>
                            <option value="cancelled">Abort</option>
                          </select>
                       )}
                    </div>
                  </div>

                  {/* Column 3: Logistics */}
                  <div className="p-8 bg-text-main text-white rounded-[2.5rem] relative overflow-hidden">
                    <div className="relative z-10">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 block border-b border-white/10 pb-4">Sanctuary Address</span>
                       <div className="text-xs space-y-2 opacity-80 leading-relaxed font-medium uppercase tracking-widest">
                         <p>{order.shippingAddress.addressLine}</p>
                         <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                         <p className="pt-2 text-primary font-black">{order.shippingAddress.mobile}</p>
                       </div>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  </div>
                </div>

                {/* Bundle Overview */}
                <div className="mt-12 pt-10 border-t border-secondary">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-6 block">Sacred Bundle Overview</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-secondary/30 p-4 rounded-xl">
                           <span className="text-[11px] font-bold text-text-main uppercase tracking-widest truncate flex-1 pr-4">{item.name}</span>
                           <span className="text-[10px] font-black text-primary">QTY {item.quantity}</span>
                        </div>
                     ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[9px] font-black uppercase tracking-[0.3em] text-text-muted border-t border-secondary pt-6">
                   <div className="flex gap-8">
                      <span>RXP: {order.razorpayOrderId}</span>
                      {order.razorpayPaymentId && <span>TXN: {order.razorpayPaymentId}</span>}
                   </div>
                   <span>Genesis: {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
