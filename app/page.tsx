'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Utensils,
  Shirt,
  Palette,
  Sparkles,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ChevronRight,
  Award
} from 'lucide-react';

const heritageHighlights = [
  {
    _id: '1',
    name: 'Mithila Thekua (Authentic)',
    price: 499,
    images: ['/thekua_unique.png'],
    slug: 'mithila-thekua',
    category: 'Food',
    description: 'Golden snacks of ceremony, sun-baked and heart-made.',
    featured: true,
    inStock: true
  },
  {
    _id: '2',
    name: 'Roasted Makhana (Luxury)',
    price: 320,
    images: ['/makhana_unique.png'],
    slug: 'graded-makhana',
    category: 'Food',
    description: 'Luxury fox nuts hand-roasted with secret Mithila spices.',
    featured: true,
    inStock: true
  },
  {
    _id: '3',
    name: 'Madhubani Silk Dupatta',
    price: 1499,
    images: ['/dupatta_unique.png'],
    slug: 'madhubani-dupatta',
    category: 'Clothing',
    description: 'Hand-painted silk telling stories of ancient lore.',
    featured: true,
    inStock: true
  },
  {
    _id: '4',
    name: 'Ceremonial Mithila Paag',
    price: 199,
    images: ['/Mithila-Paag.jpg'],
    slug: 'mithila-paag',
    category: 'Culture',
    description: 'The ceremonial crown of honor and respect.',
    featured: true,
    inStock: true
  }
];

export default function HomePage() {
  const [products, setProducts] = useState(heritageHighlights);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

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

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDynamicCategories(data.data.slice(0, 4));
        }
      })
      .catch(err => console.error("Categories fetch failed", err))
      .finally(() => setLoadingCats(false));
  }, []);


  return (
    <main className="bg-secondary min-h-screen">

      {/* 01. Elegant Hero Sanctuary */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-heritage-bone">
        <div className="container-sanctuary relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 md:gap-20">
          <div className="lg:col-span-6 space-y-8 animate-fade-in">
            <div className="space-y-4">
              <span className="label-text text-primary">Legacy of Mithila</span>
              <h1 className="h1 text-heritage-dark">
                Ancient Heritage <br />
                <span className="italic font-normal text-primary">Modern Elegance.</span>
              </h1>
            </div>

            <p className="body-text text-lg md:text-xl max-w-xl">
              Preserving Bihar&apos;s 2,500-year-old traditions through artisanal foods, hand-painted silks, and sacred crafts. Crafted by women, delivered to your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link
                href="/products"
                className="btn-primary flex items-center justify-center gap-3 group"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-heritage-dark/60">
                <Truck className="w-5 h-5 text-primary" /> Free Shipping over ₹999
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative animate-fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-heritage-dark/5 shadow-md">
              <Image
                src="/dupatta_unique.png"
                alt="Mithila Heritage"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-primary/10 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-heritage-dark">G.I. Certified</span>
                </div>
                <p className="font-serif italic text-lg text-heritage-dark">100% Direct Origin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artistic Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      </section>

      {/* 02. Structured Category Grid */}
      <section className="py-20 bg-white">
        <div className="container-sanctuary">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="space-y-2">
              <span className="label-text">Explore the Sanctuary</span>
              <h2 className="h2 lowercase first-letter:uppercase">the departments.</h2>
            </div>
            <p className="body-text text-sm hidden md:block">Hand-picked selections of Bihar&apos;s finest</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {(dynamicCategories.length > 0 ? dynamicCategories : []).map((cat, i) => (
              <Link
                key={cat._id || i}
                href={`/products?category=${cat.slug}`}
                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden border border-heritage-dark/5 hover:border-primary/20 transition-all shadow-sm"
              >
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-heritage-bone flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-primary opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-heritage-dark/90 via-heritage-dark/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <h3 className="text-lg font-serif font-bold text-white mb-1">{cat.name}</h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Discover Archive</span>
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </Link>
            ))}
            {!loadingCats && dynamicCategories.length === 0 && (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 md:h-80 rounded-2xl bg-heritage-bone/50 animate-pulse"></div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 03. Calm Narrative - Pure Focus */}
      <section className="py-24 bg-heritage-bone/20">
        <div className="container-sanctuary">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-heritage-dark/5 shadow-sm">
              <Image
                src="/thekua_unique.png"
                alt="Artisan Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-10 lg:pl-10">
              <div className="space-y-4">
                <span className="label-text">The Artisan Story</span>
                <h2 className="h2">Sun, Soil, <br /><span className="text-primary italic font-normal">and Soul.</span></h2>
              </div>
              <p className="body-text text-lg">
                Every jar of our Achar and every stroke on our canvases is a testament to the resilient spirit of Bihar’s women. We preserve a 2,500-year-old living legacy with unapologetic authenticity and precision.
              </p>
              <nav className="pt-4">
                <Link href="/about" className="btn-outline">
                  Our Origins <ChevronRight className="w-4 h-4 ml-4" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* 04. 2-Column Responsive Boutique Grid */}
      <section className="py-24 bg-white">
        <div className="container-sanctuary">
          <div className="flex items-end justify-between gap-6 mb-16">
            <div className="space-y-2">
              <span className="label-text">The Curation</span>
              <h2 className="h2">seasonal <span className="text-primary italic font-normal">heritage.</span></h2>
            </div>
            <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1">
              Browse All
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* 06. Professional Final Call */}
      <section className="py-24 bg-heritage-bone">
        <div className="container-sanctuary">
          <div className="bg-heritage-red rounded-2xl p-10 md:p-20 text-center md:text-left relative overflow-hidden shadow-lg">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              <div className="space-y-6">
                <h2 className="h1 text-white lowercase first-letter:uppercase">Gift the <span className="italic font-normal">soul of mithila.</span></h2>
                <p className="text-white/80 body-text text-lg">Join our inner circle for exclusive seasonal drops and artisan journal stories.</p>
              </div>
              <div className="flex justify-center md:justify-end">
                <Link href="/products" className="btn-primary !bg-secondary !text-primary hover:!bg-white">
                  Join the Collective
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

