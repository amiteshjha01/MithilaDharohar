'use client';

import React, { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const AccountPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch(`/api/orders?phone=${phoneNumber}`);
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Your Account</h1>
          <p className="text-gray-600">Track your orders and view purchase history</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Find Your Orders</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              placeholder="Enter your phone number (e.g. 9876543210)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-lg"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 flex items-center justify-center min-w-[160px]"
            >
              {isLoading ? <LoadingSpinner className="w-6 h-6 border-white/30 border-t-white" /> : 'View Orders'}
            </button>
          </form>
        </div>

        {hasSearched && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 px-2">
              {orders.length > 0 ? `We found ${orders.length} orders` : 'No orders found'}
            </h3>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  We couldn't find any orders associated with this phone number.
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.orderId} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Order ID</p>
                        <p className="text-xl font-bold text-gray-900">{order.orderId}</p>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
                          order.paymentStatus === 'paid' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          Payment: {order.paymentStatus}
                        </span>
                        <span className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider bg-orange-50 text-orange-700 border border-orange-100`}>
                          Status: {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                            </div>
                          </div>
                          <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-6 border-t border-gray-100 gap-6">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Delivering to</p>
                        <p className="text-sm font-bold text-gray-800">{order.shippingAddress.name}</p>
                        <p className="text-sm text-gray-500 max-w-xs">{order.shippingAddress.addressLine}, {order.shippingAddress.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Amount</p>
                        <p className="text-3xl font-black text-orange-600">₹{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
