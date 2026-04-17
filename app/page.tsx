'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';

// Heritage Selection Data (Initial/Hardcoded for instant load)
const heritageHighlights = [
  {
    _id: '1',
    name: 'Mithila Thekua (Authentic)',
    price: 499,
    images: ['/mithila_thekua_premium_1776423939060.png'],
    slug: 'mithila-thekua',
    category: 'Food',
    description: 'Golden snacks of ceremony, sun-baked and heart-made.',
    featured: true
  },
  {
    _id: '2',
    name: 'Roasted Makhana (Luxury)',
    price: 299,
    images: ['/roasted_makhana_luxury_1776423953190.png'],
    slug: 'roasted-makhana',
    category: 'Food',
    description: 'Luxury fox nuts hand-roasted with secret Mithila spices.',
    featured: true
  },
  {
    _id: '3',
    name: 'Madhubani Silk Dupatta',
    price: 2499,
    images: ['/madhubani_dupatta_handcrafted_1776424041586.png'],
    slug: 'madhubani-dupatta',
    category: 'Clothing',
    description: 'Hand-painted silk telling stories of ancient lore.',
    featured: true
  },
  {
    _id: '4',
    name: 'Ceremonial Mithila Paag',
    price: 799,
    images: ['/mithila_paag_ceremonial_1776423971709.png'],
    slug: 'mithila-paag',
    category: 'Culture',
    description: 'The ceremonial crown of honor and respect.',
    featured: true
  }
];

export default function HomePage() {
  const [products, setProducts] = useState(heritageHighlights);

  useEffect(() => {
    fetch('/api/products?category=all')
      .then(res => res.json())
      .then(data => {
        if (data.data?.length > 0) {
          const featured = data.data.filter((p: any) => p.featured);
          if (featured.length > 0) setProducts(featured.slice(0, 8));
        }
      })
      .catch(err => console.error("Heritage data fetch failed", err));
  }, []);

  return (
    <main className="bg-secondary min-h-screen overflow-x-hidden">
      {/* 01. Emotional Editorial Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="container-editorial relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-16">
          <div className="lg:col-span-7 space-y-10">
            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-[10px] md:text-[12px] font-bold tracking-[0.6em] text-primary uppercase mb-6 block">Legacy OF Bihar</span>
            </div>
            <h1 className="text-[13vw] lg:text-[10vw] font-serif font-bold text-heritage-dark leading-[0.85] tracking-tighter animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Handmade <br />
              <span className="italic font-normal pl-[10%]">History.</span>
            </h1>
            <div className="max-w-xl animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-lg md:text-xl text-heritage-muted leading-relaxed font-medium mb-12 text-balance">
                Preserving ancient traditions through artisanal food, textile, and art. Crafted in the homes of Mithila, delivered to the world.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-12">
                <Link href="/products" className="btn-boutique btn-boutique-primary !px-16 shadow-2xl">Explore Boutique</Link>
                <Link href="/about" className="text-[10px] font-bold uppercase tracking-[0.4em] text-heritage-dark border-b border-primary/20 pb-2 hover:border-primary transition-all">Our Soul Story</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative mt-20 lg:mt-0">
             <div className="relative aspect-[3/4] w-full max-w-[500px] ml-auto overflow-hidden rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(74,14,14,0.15)] animate-fade-up" style={{ animationDelay: '0.8s' }}>
                <Image 
                  src="/madhubani_dupatta_handcrafted_1776424041586.png" 
                  alt="Mithila Heritage" 
                  fill 
                  className="object-cover scale-110 hover:scale-100 transition-transform duration-1000"
                  priority
                />
             </div>
             {/* Offset Floating Detail */}
             <div className="absolute -bottom-12 -left-12 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-primary/5 hidden md:block animate-fade-up" style={{ animationDelay: '1s' }}>
                <span className="block text-[8px] font-bold text-primary uppercase tracking-[0.3em] mb-2">Artisan Direct</span>
                <span className="block text-2xl font-serif font-bold text-heritage-dark italic">Certified G.I. Tag</span>
             </div>
          </div>
        </div>

        {/* Dynamic Background Element */}
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-heritage-cream/40 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      </section>

      {/* 02. The Heritage Marquee */}
      <div className="bg-heritage-dark py-8 overflow-hidden relative border-y border-white/5">
        <div className="marquee-content group">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center gap-24 mx-12">
                <span className="text-[10px] font-bold tracking-[0.5em] text-primary uppercase">Sun-Dried Traditions</span>
                <div className="w-1.5 h-1.5 rounded-full bg-heritage-bone/20"></div>
                <span className="text-[10px] font-bold tracking-[0.5em] text-heritage-bone uppercase">100% Women Artisans</span>
                <div className="w-1.5 h-1.5 rounded-full bg-heritage-bone/20"></div>
                <span className="text-[10px] font-bold tracking-[0.5em] text-heritage-bone/40 uppercase">Authentic Mithila Origin</span>
                <div className="w-1.5 h-1.5 rounded-full bg-heritage-bone/20"></div>
             </div>
           ))}
        </div>
      </div>

      {/* 03. Philosophical Narrative (Controlled Asymmetry) */}
      <section className="section-bleed bg-heritage-cream/30">
        <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
           <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="space-y-12">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.6em] block">Our Foundation</span>
                <h2 className="text-5xl md:text-8xl font-bold font-serif text-heritage-dark leading-[0.95] tracking-tight">
                  Sun, Soil, <br />
                  <span className="text-primary italic">and Soul.</span>
                </h2>
                <p className="text-xl text-heritage-muted leading-relaxed font-medium max-w-xl">
                  Every jar of our Achar and every stroke on our canvases is a testament to the resilient spirit of Bihar’s women. We preserve a 2,500-year-old living legacy, delivered direct from our homes to yours.
                </p>
                <div className="pt-8">
                  <Link href="/about" className="btn-boutique btn-boutique-outline">Discover Our Roots</Link>
                </div>
              </div>
           </div>
           
           <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-3xl translate-x-4 md:translate-x-12">
                   <Image 
                     src="/mithila_paag_ceremonial_1776423971709.png" 
                     alt="Artisan Craft" 
                     fill 
                     className="object-cover"
                   />
                </div>
                {/* Asymmetric Floating Card */}
                <div className="absolute -top-12 -left-4 md:-left-20 bg-heritage-dark text-heritage-bone p-10 md:p-14 rounded-[3.5rem] max-w-xs shadow-2xl asymmetric-reverse">
                   <div className="text-4xl font-serif italic mb-4 text-primary">"</div>
                   <p className="text-[15px] font-medium leading-relaxed opacity-80 mb-6 italic">
                     "We don't just sell products; we package the very essence of Bihar's motherhood."
                   </p>
                   <span className="text-[9px] font-bold tracking-widest uppercase text-primary">Artisans of Mithila</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 04. Curated Gallery (Staggered Grid) */}
      <section className="section-bleed bg-white">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.6em] mb-6 block">Seasonal Curations</span>
              <h2 className="text-6xl md:text-9xl font-bold font-serif text-heritage-dark tracking-tighter leading-[0.85]">
                Boutique <br />
                <span className="italic font-normal">Heritage.</span>
              </h2>
            </div>
            <Link href="/products" className="btn-boutique btn-boutique-outline !rounded-none border-b-2 border-x-0 border-t-0 !px-4 hover:bg-transparent">Shop All Collections</Link>
          </div>

          {/* Staggered Layout for Premium Feel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-16 md:gap-y-32">
            {products.map((product, idx) => (
              <div 
                key={product._id} 
                className={`${idx % 3 === 1 ? 'lg:translate-y-24' : idx % 3 === 2 ? 'lg:-translate-y-12' : ''}`}
              >
                <div className="animate-fade-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. Community Voices (High Impact Narrative) */}
      <section className="section-bleed bg-heritage-dark relative overflow-hidden">
        {/* Abstract Background Detail */}
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
           <span className="text-[50vw] font-serif font-bold text-heritage-bone absolute top-[20%] right-[-10%] leading-none italic pointer-events-none">"</span>
        </div>

        <div className="container-editorial relative z-10">
           <div className="max-w-5xl mx-auto text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-16 block">The Collective Voice</span>
              <div className="text-3xl md:text-6xl font-serif text-heritage-bone leading-[1.3] italic mb-20 text-balance px-4">
                "Finding the soul of Bihar in every jar. The Achar tastes like it was made yesterday in my grandmother's sunny courtyard."
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-16 h-px bg-primary/30 mb-8"></div>
                 <span className="text-[14px] font-bold uppercase tracking-[0.4em] mb-2 text-heritage-bone">PREETY JHA</span>
                 <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] opacity-60">CONNOISSEUR, NEW YORK</span>
              </div>
           </div>
        </div>
      </section>

      {/* 06. Tactile Brand Promises */}
      <section className="section-bleed container-editorial">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {[
              { title: 'Artisan Owned', body: 'Profits return directly to the 500+ women cooperatives in rural Mithila.', icon: '01' },
              { title: 'Zero Synthetic', body: 'Ancient sun-drying and mustard oil preservation. No industrial chemicals.', icon: '02' },
              { title: 'Heritage Certified', body: 'G.I. Tags and authentic origin marking on every boutique piece.', icon: '03' }
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-start gap-8">
                 <span className="text-6xl md:text-8xl font-serif font-bold text-primary opacity-[0.08] group-hover:opacity-20 transition-all duration-500 italic leading-none">{item.icon}</span>
                 <h3 className="text-2xl font-serif font-bold text-heritage-dark uppercase tracking-widest leading-none">{item.title}</h3>
                 <p className="text-heritage-muted leading-relaxed font-medium text-lg">{item.body}</p>
                 <div className="w-0 h-px bg-primary group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
         </div>
      </section>

      {/* 07. Visual Narrative Final CTA */}
      <section className="pb-40 container-editorial px-4 md:px-12">
        <div className="relative bg-primary rounded-[4rem] md:rounded-[6rem] p-12 md:p-32 overflow-hidden shadow-3xl">
           {/* CTA Background Pattern (Simplified SVG Pattern) */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#p)" />
                 <defs>
                    <pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse">
                       <path d="M0 10 L10 0 M-1 1 L1 -1 M9 11 L11 9" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                 </defs>
              </svg>
           </div>

           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-4xl text-heritage-bone text-center lg:text-left">
                 <h2 className="text-5xl md:text-8xl font-serif font-bold mb-10 tracking-tight leading-[0.9] italic">Gift the Soul <br /> of Mithila.</h2>
                 <p className="text-lg md:text-xl font-medium opacity-70 leading-relaxed max-w-xl mx-auto lg:mx-0">Join our sanctuary for exclusive seasonal drops and limited collaborations with ancient masters.</p>
              </div>
              <div className="flex flex-col items-center gap-8 lg:min-w-[300px]">
                 <Link href="/products" className="btn-boutique !bg-heritage-bone !text-primary !px-20 hover:!bg-white shadow-2xl whitespace-nowrap text-[14px]">Explore The Shop</Link>
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-heritage-bone opacity-40 italic">Complimentary Shipping Over ₹999</span>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}

