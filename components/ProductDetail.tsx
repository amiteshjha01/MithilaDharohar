'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/models/Product';
import { getEffectivePrice } from '@/lib/helpers';
import StockBadge from './StockBadge';
import QualityBadge from './QualityBadge';
import ArtisanHighlight from './ArtisanHighlight';
import DeliveryBadge from './DeliveryBadge';

interface ProductDetailProps {
  product: any;
  onAddToCart: (product: any, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const effectivePrice = getEffectivePrice(product.price, product.discount);
  const hasDiscount = product.discount && product.discount.value > 0;

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') {
      if (quantity < (product.stockQuantity || 10)) {
        setQuantity(prev => prev + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
        {/* Image Gallery */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-primary/5 border border-[#e8dfd4]">
            <Image
              src={product.images[activeImage] || 'https://images.unsplash.com/photo-1544654803-b69140b285a1?auto=format&fit=crop&q=80&w=800'}
              alt={product.name}
              fill
              className="object-cover transition-all duration-[1s] hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {hasDiscount && (
              <div className="absolute top-8 left-8 bg-[#922724] text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl">
                {product.discount.type === 'percentage' 
                  ? `${product.discount.value}% Savory Offer` 
                  : `₹${product.discount.value} Off`}
              </div>
            )}
            <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30">
               <span className="text-white text-[10px] font-black uppercase tracking-widest">Premium Collection</span>
            </div>
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                    activeImage === idx ? 'border-[#922724] scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#922724] bg-secondary px-4 py-1.5 rounded-full">
                  {product.category}
               </span>
               <div className="w-1 h-1 rounded-full bg-[#d4c3b5]"></div>
               <StockBadge quantity={product.stockQuantity} inStock={product.inStock} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-[#2c2420] text-serif leading-[1.1] tracking-tighter">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-[#922724]">₹{effectivePrice}</span>
                {hasDiscount && (
                  <span className="text-xl text-[#d4c3b5] line-through font-bold">₹{product.price}</span>
                )}
              </div>
              <div className="h-8 w-px bg-[#e8dfd4]"></div>
              <DeliveryBadge free={effectivePrice >= 499} />
            </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center gap-4 text-[#922724]">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#922724]/20"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">
                   "Handcrafted by the heart of Mithila"
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#922724]/20"></div>
             </div>
             <p className="text-[#6b5d56] text-xl leading-relaxed font-medium">
               {product.description}
             </p>
          </div>

          <div className="space-y-8 pt-10 border-t border-[#e8dfd4]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a18a7c]">Quality Standards</span>
                  <QualityBadge />
               </div>
               <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a18a7c]">The Maker</span>
                  <ArtisanHighlight name={product.artisanName} />
               </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <div className="flex items-center bg-secondary rounded-full h-16 px-4 border border-[#e8dfd4]">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="w-12 h-12 flex items-center justify-center text-[#2c2420] hover:text-[#922724] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-16 text-center font-black text-2xl text-[#2c2420]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="w-12 h-12 flex items-center justify-center text-[#2c2420] hover:text-[#922724] transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <button
                onClick={() => onAddToCart(product, quantity)}
                disabled={!product.inStock || product.stockQuantity <= 0}
                className="btn-primary flex-1 h-16 !text-xs !tracking-[0.2em] flex items-center justify-center gap-4 hover-glow group disabled:grayscale"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {product.inStock ? 'Adopting This Heritage' : 'Out of Stock'}
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-[#e8dfd4]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 text-[#922724]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                 <p className="text-sm font-black text-[#2c2420] uppercase tracking-wider mb-1">Sustainable</p>
                 <p className="text-xs text-[#6b5d56] font-medium leading-relaxed">Direct support to local farmers and artisans.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 text-[#c5a059]">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622" />
                </svg>
              </div>
              <div>
                 <p className="text-sm font-black text-[#2c2420] uppercase tracking-wider mb-1">Authentic</p>
                 <p className="text-xs text-[#6b5d56] font-medium leading-relaxed">Verified by MithilaDharohar trust standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

