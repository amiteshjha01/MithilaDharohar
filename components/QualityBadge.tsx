import React from 'react';

const QualityBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-3 bg-white border border-[#e8dfd4] px-5 py-3 rounded-2xl shadow-sm">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-[#c5a059]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <div>
        <span className="block text-[10px] font-black uppercase tracking-widest text-[#2c2420]">100% Authentic</span>
        <span className="block text-[10px] font-bold text-[#6b5d56] uppercase tracking-tighter">Mithila Tradition</span>
      </div>
    </div>
  );
};

export default QualityBadge;
