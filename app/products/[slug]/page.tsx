'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEffectivePrice } from '@/lib/helpers';
import { IProduct } from '@/models/Product';
import Image from 'next/image';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const slug = (await params).slug;
        const res = await fetch(`/api/products/${slug}`);

        if (!res.ok) {
          setError('Product not found');
          return;
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to products
          </button>
        </div>
      </main>
    );
  }

  const effectivePrice = getEffectivePrice(product.price, product.discount);
  const hasDiscount = effectivePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - effectivePrice) / product.price) * 100)
    : 0;


  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      const productId = product._id?.toString();
      
      if (!productId) {
        setError('Heritage identification failed. Please retry.');
        return;
      }

      // Ensure consistent structure
      if (!cart.items) cart.items = [];

      const existingItem = cart.items.find(
        (item: any) => String(item.productId) === String(productId)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId: productId,
          quantity,
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Dispatch custom event for CartBadge
      window.dispatchEvent(new Event('cart-updated'));
      
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      
      // Optional: Redirect or just show success
      // router.push('/cart');
    } catch (err) {
      console.error('Cart update failed', err);
      setError('Acquisition could not be processed. Please refresh.');
    }
  };

  return (
    <main className="min-h-screen bg-secondary">
      {/* Editorial Breadcrumb */}
      <div className="container-editorial py-8">
        <button
          onClick={() => router.push('/products')}
          className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-heritage-muted hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Collection
        </button>
      </div>

      {/* Product Boutique Section */}
      <div className="container-editorial pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Visual Gallery (Asymmetric) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] bg-heritage-bone rounded-[3.5rem] overflow-hidden shadow-2xl group">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-heritage-cream/50">
                  <span className="text-[10px] font-bold tracking-widest text-primary/20 uppercase">Missing Visual</span>
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-8 right-8 bg-primary text-heritage-bone px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Refined Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 w-24 h-24 bg-heritage-bone rounded-3xl relative overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/20 transition-all shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Dossier */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="sticky top-40 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">
                    {product.category}
                  </span>
                  <div className="h-px w-12 bg-primary/10"></div>
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-heritage-dark leading-[1.1] tracking-tight">
                  {product.name}
                </h1>

                {product.artisanName && (
                  <div className="flex items-center gap-4 py-2">
                     <div className="w-10 h-10 rounded-full bg-heritage-cream flex items-center justify-center border border-primary/5">
                        <span className="text-primary font-bold text-xs">{product.artisanName[0]}</span>
                     </div>
                     <p className="text-[13px] text-heritage-muted font-medium uppercase tracking-widest">
                       Artisan <span className="text-heritage-dark font-bold">{product.artisanName}</span>
                     </p>
                  </div>
                )}
              </div>

              {/* Pricing Dossier */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-serif font-bold text-heritage-dark tracking-tighter">
                    ₹{effectivePrice.toFixed(0)}
                  </span>
                  {hasDiscount && (
                    <span className="text-2xl text-heritage-muted line-through font-medium opacity-50">
                      ₹{product.price.toFixed(0)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                   <p className="text-[11px] font-bold text-accent uppercase tracking-widest">
                     You are saving ₹{(product.price - effectivePrice).toFixed(0)} on this heritage piece
                   </p>
                )}
              </div>

              {/* Narrative Description */}
              <div className="space-y-6 pt-4 border-t border-primary/5">
                <h3 className="text-[10px] font-bold text-heritage-dark uppercase tracking-[0.3em]">The Story</h3>
                <p className="text-lg text-heritage-muted leading-[1.8] font-medium text-balance">
                  {product.description}
                </p>
              </div>

              {/* Inventory Intelligence */}
              <div>
                {product.inStock ? (
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${product.stockQuantity > 5 ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-heritage-dark">
                      {product.stockQuantity > 5
                        ? 'Boutique Collection Available'
                        : `Limited State: Only ${product.stockQuantity} remaining`}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-red-500">Currently in the Archive</p>
                  </div>
                )}
              </div>

              {/* Acquisition Logic */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <div className="inline-flex items-center bg-heritage-bone border border-primary/10 rounded-full px-6 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-heritage-muted hover:text-primary transition-colors text-xl font-light"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center bg-transparent border-0 outline-none text-sm font-bold text-heritage-dark"
                    min="1"
                    max={product.stockQuantity}
                  />
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stockQuantity, quantity + 1))
                    }
                    className="w-10 h-10 flex items-center justify-center text-heritage-muted hover:text-primary transition-colors text-xl font-light"
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || added}
                  className={`btn-boutique flex-1 shadow-[0_20px_40px_-10px_rgba(74,14,14,0.3)] !text-[12px] transition-all duration-300 ${added ? 'bg-green-600 border-green-600 text-white' : 'btn-boutique-primary'}`}
                >
                  {added ? 'Added to Bag' : product.inStock ? 'Acquire for Collection' : 'Archive State'}
                </button>
              </div>

              {/* Pedigree Details */}
              <div className="pt-12 border-t border-primary/5 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-heritage-muted">Heritage Origin</span>
                    <span className="text-heritage-dark">{product.origin || 'Mithila, Bihar'}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-heritage-muted">Production Method</span>
                    <span className="text-heritage-dark">Handcrafted / Sun-Dried</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-heritage-muted">Authenticity</span>
                    <span className="text-primary italic">Certified Heritage</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
