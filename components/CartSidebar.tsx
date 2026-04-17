'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (productId: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  onRemove,
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white z-[101] shadow-2xl transition-transform duration-[0.8s] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-[#e8dfd4] flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-[#2c2420] text-serif">Your Bag</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-1.5 h-1.5 rounded-full bg-[#922724]"></span>
               <p className="text-[10px] text-[#6b5d56] font-black uppercase tracking-widest">
                 {items.length} Heritage {items.length === 1 ? 'Piece' : 'Pieces'}
               </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center hover:bg-secondary rounded-full transition-all text-[#2c2420] border border-[#e8dfd4]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-12 h-12 text-[#922724] opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="max-w-[240px]">
                <p className="font-black text-[#2c2420] text-serif text-xl mb-2">Heritage Awaits</p>
                <p className="text-sm text-[#6b5d56] font-medium leading-relaxed">Your shopping bag is currently empty. Explore the finest crafts of Mithila.</p>
              </div>
              <button
                onClick={onClose}
                className="btn-secondary !text-[10px] uppercase font-black tracking-widest px-8"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#e8dfd4]/30">
               {items.map((item) => (
                  <div key={item.productId} className="flex gap-6 py-8 first:pt-0 group border-b border-[#e8dfd4]/30 last:border-b-0">
                    <div className="relative w-28 h-36 rounded-[2rem] overflow-hidden bg-white flex-shrink-0 border border-[#e8dfd4] shadow-xl shadow-primary/5 group-hover:shadow-primary/10 transition-shadow">
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h3 className="font-black text-[#2c2420] text-serif text-xl leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-[#922724] font-black uppercase tracking-widest">₹{item.price} each</p>
                        </div>
                        <button
                          onClick={() => onRemove(item.productId)}
                          className="text-[#d4c3b5] hover:text-[#922724] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center gap-4 text-xs font-black text-[#2c2420] bg-secondary px-5 py-2 rounded-full border border-[#e8dfd4]">
                           <span className="opacity-50 uppercase tracking-widest text-[9px]">QTY</span>
                           {item.quantity}
                        </div>
                        <span className="font-black text-[#2c2420] text-serif text-lg">₹{(item.price * item.quantity).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
               ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-[#e8dfd4] space-y-6 shadow-[0_-20px_40px_-20px_rgba(146,39,36,0.1)] bg-white">
            <div className="flex justify-between items-center px-2">
              <span className="text-[#6b5d56] font-black uppercase tracking-[0.2em] text-[10px]">Grand Subtotal</span>
              <span className="text-3xl font-black text-[#922724] text-serif tracking-tighter">₹{subtotal.toFixed(0)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary w-full !py-5 hover-glow !text-sm flex items-center justify-center gap-4 group"
            >
              Order Heritage Pieces
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <div className="flex flex-col items-center gap-2">
               <div className="flex items-center gap-2 text-[8px] font-black text-[#d4c3b5] uppercase tracking-[0.3em]">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  Encrypted & Secure Transaction
               </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;

