'use client';

import { getEffectivePrice } from '@/lib/helpers';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const effectivePrice = getEffectivePrice(product.price, product.discount);
  const hasDiscount = product.discount && product.discount.value > 0;
  
  const discountLabel = hasDiscount 
    ? (product.discount.type === 'percentage' ? `${product.discount.value}% OFF` : `₹${product.discount.value} OFF`)
    : null;

  return (
    <div className="group relative">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-[2rem] bg-heritage-bone transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(74,14,14,0.12)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Main Visual */}
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-heritage-cream/50">
               <span className="text-[10px] font-bold tracking-widest text-primary/20 uppercase">No Visual Found</span>
            </div>
          )}

          {/* Luxury Tags */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
             <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] text-primary border border-primary/10 shadow-sm">
               Artisan Origin
             </span>
             {discountLabel && (
               <span className="bg-primary text-heritage-bone px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.15em] shadow-lg">
                 {discountLabel}
               </span>
             )}
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-heritage-dark/60 backdrop-blur-[2px] flex items-center justify-center p-8 z-10">
              <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase border border-white/30 px-8 py-3 rounded-full">Archive State</span>
            </div>
          )}

          {/* Tactile Overlay Interaction */}
          <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
             <div className="w-full bg-white py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/5 hover:bg-primary hover:text-white transition-colors duration-300">
                Purchase Detail
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 pb-10">
          <div className="flex items-center gap-3 mb-6">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted">{product.category}</span>
             <div className="h-px flex-grow bg-primary/5"></div>
          </div>
          
          <h3 className="text-[22px] font-serif font-bold text-heritage-dark mb-6 leading-[1.3] group-hover:text-primary transition-colors line-clamp-2 min-h-[58px]">
            {product.name}
          </h3>

          <div className="flex items-end justify-between">
             <div className="flex flex-col">
                {hasDiscount && (
                   <span className="text-[11px] text-heritage-muted line-through font-medium mb-1">₹{product.price}</span>
                )}
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-serif font-bold text-heritage-dark tracking-tight">₹{effectivePrice}</span>
                   {hasDiscount && (
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Save ₹{product.price - effectivePrice}</span>
                   )}
                </div>
             </div>
             
             {/* Quick Add Visual Trigger */}
             <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_10px_20px_-5px_rgba(74,14,14,0.3)]">
                <svg className="w-5 h-5 text-heritage-muted group-hover:text-heritage-bone transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 4v16m8-8H4" />
                </svg>
             </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


