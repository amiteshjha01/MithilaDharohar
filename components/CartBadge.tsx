'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartBadge() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      const totalItems = (cart.items || []).reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
      setCount(totalItems);
    } catch (e) {
      setCount(0);
    }
  };

  useEffect(() => {
    updateCount();
    
    // Listen for custom events or storage changes
    window.addEventListener('storage', updateCount);
    window.addEventListener('cart-updated', updateCount);
    
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('cart-updated', updateCount);
    };
  }, []);

  return (
    <Link href="/cart" className="text-text-main hover:text-primary transition-all relative group" aria-label="Cart">
      <svg className="w-5 h-5 md:w-6 md:h-6 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-heritage-bone text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg border border-heritage-bone animate-reveal">
          {count}
        </span>
      )}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">The Bag</span>
    </Link>
  );
}
