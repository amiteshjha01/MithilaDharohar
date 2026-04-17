import React from 'react';

interface DeliveryBadgeProps {
  free?: boolean;
}

const DeliveryBadge: React.FC<DeliveryBadgeProps> = ({ free = false }) => {
  return (
    <div className={`flex items-center gap-3 border px-5 py-3 rounded-2xl transition-all ${free ? 'bg-[#2d5a27]/5 border-[#2d5a27]/20 text-[#2d5a27]' : 'bg-secondary border-[#e8dfd4] text-[#2c2420]'}`}>
      <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
      <span className="text-[10px] font-black uppercase tracking-widest">
        {free ? 'Complimentary Shipping' : 'Safe Heritage Delivery'}
      </span>
    </div>
  );
};

export default DeliveryBadge;
