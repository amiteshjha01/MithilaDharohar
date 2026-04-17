'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getEffectivePrice } from '@/lib/helpers';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');

        if (cart.items.length === 0) {
          setCartItems([]);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/products?category=all`);
        const data = await res.json();
        
        const products = cart.items.map((item: any) => {
           const product = data.data?.find((p: any) => p._id.toString() === item.productId.toString());
           return product ? { ...product, cartQuantity: item.quantity } : null;
        }).filter(Boolean);

        setCartItems(products);
      } catch (err) {
        setError('Failed to load your heritage selection');
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    const item = cart.items.find((i: any) => String(i.productId) === String(productId));

    if (item) {
      if (newQuantity <= 0) {
        cart.items = cart.items.filter((i: any) => i.productId !== productId);
      } else {
        item.quantity = newQuantity;
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event for CartBadge
    window.dispatchEvent(new Event('cart-updated'));
    
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(p => String(p._id) !== String(productId)));
      // window.location.reload(); // Removing reload for smoother UX
    } else {
      setCartItems(prev => prev.map(p => String(p._id) === String(productId) ? { ...p, cartQuantity: newQuantity } : p));
    }
  };

  const subtotal = cartItems.reduce((sum, p) => sum + getEffectivePrice(p.price, p.discount) * p.cartQuantity, 0);
  const deliveryCharge = subtotal >= 999 ? 0 : 99;

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-heritage-muted">Curating Your Selection...</p>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-12 block animate-fade-up">Bag is Empty</span>
        <h1 className="text-5xl md:text-8xl font-serif font-bold text-heritage-dark mb-16 animate-fade-up">Start Your <br/> <span className="italic font-normal">Journey.</span></h1>
        <Link href="/products" className="btn-boutique btn-boutique-primary !px-16 animate-fade-up">
           Explore The Boutique
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary pb-40">
      {/* Editorial Header */}
      <div className="bg-heritage-bone border-b border-primary/5 py-24 md:py-32">
        <div className="container-editorial">
           <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-6 block animate-fade-up">Review Selection</span>
           <h1 className="text-5xl md:text-9xl font-serif font-bold text-heritage-dark tracking-tighter animate-fade-up">Shopping Bag</h1>
        </div>
      </div>

      <div className="container-editorial mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-16">
            {cartItems.map((product, idx) => {
              const effectivePrice = getEffectivePrice(product.price, product.discount);
              return (
                <div key={product._id} className="group flex flex-col md:flex-row gap-10 md:gap-14 pb-16 border-b border-primary/10 last:border-0 relative animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Image Product */}
                  <div className="w-full md:w-64 aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl">
                    <Image
                      src={product.images?.[0] || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                  </div>

                  {/* Details Dossier */}
                  <div className="flex-1 flex flex-col pt-4">
                    <div className="flex justify-between items-start gap-4 mb-4">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">{product.category}</span>
                       <button 
                          onClick={() => updateQuantity(product._id, 0)}
                          className="text-[9px] font-bold uppercase tracking-widest text-heritage-muted hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
                       >
                         Remove
                       </button>
                    </div>
                    
                    <Link href={`/products/${product.slug}`} className="text-3xl md:text-4xl font-serif font-bold text-heritage-dark mb-8 hover:text-primary transition-colors">
                       {product.name}
                    </Link>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-8 pt-8 border-t border-primary/5">
                       {/* High-end Quantity Selector */}
                       <div className="flex items-center gap-10 border border-primary/10 px-8 py-3 rounded-full bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:border-primary/30">
                          <button 
                             onClick={() => updateQuantity(product._id, product.cartQuantity - 1)}
                             className="text-xl font-light text-heritage-muted hover:text-primary transition-all p-1"
                          >
                            −
                          </button>
                          <span className="text-[14px] font-bold w-6 text-center text-heritage-dark">{product.cartQuantity}</span>
                          <button 
                             onClick={() => updateQuantity(product._id, product.cartQuantity + 1)}
                             className="text-xl font-light text-heritage-muted hover:text-primary transition-all p-1"
                          >
                            +
                          </button>
                       </div>

                       <div className="text-right">
                          <div className="flex items-baseline gap-4 justify-end">
                             <span className="text-3xl font-serif font-bold text-heritage-dark tracking-tighter">₹{(effectivePrice * product.cartQuantity).toFixed(0)}</span>
                          </div>
                          <span className="text-[10px] font-bold text-heritage-muted uppercase tracking-widest opacity-60">₹{effectivePrice} boutique price</span>
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Boutique Receipt Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <div className="bg-heritage-bone border border-primary/5 rounded-[4rem] p-12 shadow-3xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-12 pb-8 border-b border-primary/10">The Summary</h2>

              <div className="space-y-8 mb-12 pb-12 border-b border-primary/10">
                <div className="flex justify-between items-center text-[12px] font-bold text-heritage-muted">
                  <span className="uppercase tracking-[0.2em]">Heritage Subtotal</span>
                  <span className="text-heritage-dark">₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold text-heritage-muted">
                  <span className="uppercase tracking-[0.2em]">Boutique Delivery</span>
                  <span>{deliveryCharge === 0 ? <span className="text-heritage-dark italic font-serif opacity-80">Complimentary</span> : `₹${deliveryCharge}`}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-16">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-heritage-dark opacity-60">Estimated Total</span>
                <span className="text-4xl font-serif font-bold text-heritage-dark tracking-tighter italic">₹{(subtotal + deliveryCharge).toFixed(0)}</span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="btn-boutique btn-boutique-primary w-full shadow-3xl !py-6 !text-[12px]"
              >
                Proceed to Sanctuary
              </button>

              <div className="mt-12 flex flex-col items-center gap-6">
                 <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-heritage-muted opacity-50">
                    <svg className="w-5 h-5 text-heritage-dark/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    Secure Heritage Acquisition
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

