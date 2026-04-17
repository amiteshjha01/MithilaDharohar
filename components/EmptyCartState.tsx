import React from 'react';
import Link from 'next/link';

const EmptyCartState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="w-40 h-40 bg-secondary rounded-full flex items-center justify-center mb-10 shadow-inner">
        <svg
          className="w-20 h-20 text-[#922724] opacity-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <h3 className="text-3xl font-black text-[#2c2420] mb-4 text-serif">Your Bag is Empty</h3>
      <p className="text-[#6b5d56] max-w-sm mb-12 font-medium leading-relaxed">
        Discover the artisanal soul of Bihar. Explore our collections of authentic achars, paintings, and handlooms.
      </p>
      <Link
        href="/products"
        className="btn-primary !px-12 !py-4 hover-glow group flex items-center gap-3"
      >
        Explore Collections
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
      </Link>
    </div>
  );
};

export default EmptyCartState;
