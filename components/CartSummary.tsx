import React from 'react';
import { getDeliveryCharge } from '@/lib/helpers';

interface CartSummaryProps {
  subtotal: number;
  onCheckout?: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  onCheckout,
  isLoading = false,
}) => {
  const deliveryCharge = getDeliveryCharge(subtotal);
  const total = subtotal + deliveryCharge;
  const FREE_DELIVERY_THRESHOLD = 499;

  return (
    <div className="bg-white rounded-[3rem] p-10 lg:p-12 sticky top-24 border border-[#e8dfd4] shadow-2xl shadow-primary/5">
      <h3 className="text-3xl font-black text-[#2c2420] mb-10 text-serif tracking-tight">Order Sanctuary</h3>
      
      <div className="space-y-6 mb-10">
        <div className="flex justify-between text-[#6b5d56] text-sm">
          <span className="font-bold tracking-tight uppercase text-[10px]">Heritage Subtotal</span>
          <span className="font-black text-[#2c2420]">₹{subtotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-[#6b5d56] text-sm">
          <span className="font-bold tracking-tight uppercase text-[10px]">Global Shipping</span>
          <span className={deliveryCharge === 0 ? 'text-[#2d5a27] font-black' : 'font-black text-[#2c2420]'}>
            {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(0)}`}
          </span>
        </div>
        
        {deliveryCharge > 0 && (
          <div className="bg-secondary/50 border border-[#e8dfd4] p-5 rounded-[1.5rem] flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-[#922724]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
             </div>
             <p className="text-[10px] text-[#922724] font-black uppercase tracking-widest leading-relaxed">
               Grace your cart with ₹{(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(0)} more for <span className="underline decoration-2 underline-offset-4">Free Shipping</span>
             </p>
          </div>
        )}
      </div>

      <div className="border-t border-[#e8dfd4]/50 pt-10 mb-12">
        <div className="flex justify-between items-center">
          <span className="text-xl font-black text-[#2c2420] text-serif">Total Deposit</span>
          <div className="text-right">
            <span className="text-4xl font-black text-[#922724] tracking-tighter">₹{total.toFixed(0)}</span>
            <p className="text-[9px] text-[#bab1a9] mt-2 font-black uppercase tracking-[0.2em]">Guaranteed Authentication</p>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="btn-primary w-full !py-6 hover-glow !text-xs !tracking-[0.2em] group flex items-center justify-center gap-4 transition-all duration-500 hover:gap-6"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Authenticating Genesis...
          </>
        ) : (
          <>
            Initiate Genesis
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </>
        )}
      </button>
      
      <div className="mt-12 pt-10 border-t border-[#e8dfd4]/30 flex flex-col items-center">
        <div className="flex items-center gap-4 text-[9px] font-black text-[#6b5d56] uppercase tracking-[0.3em] mb-8">
          <div className="w-5 h-5 rounded-full bg-[#2d5a27] flex items-center justify-center text-white">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </div>
          Secured Heritage Gateway
        </div>
        
        <div className="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <span className="text-[9px] font-black tracking-tighter">RAZORPAY</span>
           <span className="text-[9px] font-black tracking-tighter">VISA</span>
           <span className="text-[9px] font-black tracking-tighter">MASTERCARD</span>
           <span className="text-[9px] font-black tracking-tighter">UPI</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

