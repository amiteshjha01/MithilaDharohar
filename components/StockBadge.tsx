import React from 'react';

interface StockBadgeProps {
  quantity: number;
  inStock: boolean;
}

const StockBadge: React.FC<StockBadgeProps> = ({ quantity, inStock }) => {
  if (!inStock || quantity <= 0) {
    return (
      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-700 border border-red-100">
         Archive / Out of Stock
      </span>
    );
  }

  if (quantity < 5) {
    return (
      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#922724] text-white shadow-lg animate-pulse">
        Rarity: Only {quantity} Handcrafted Pieces Left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#2d5a27]/10 text-[#2d5a27] border border-[#2d5a27]/20">
      Available in Heritage
    </span>
  );
};

export default StockBadge;
