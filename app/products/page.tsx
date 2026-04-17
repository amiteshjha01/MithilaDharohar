import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Heritage Collections | MithilaDharohar',
  description: 'Explore our authentic collection of handmade achars, Madhubani art, and traditional textiles.',
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category;

  await connectDB();

  const query: any = {};
  if (category) {
    // Perform case-insensitive search to match 'Food' with 'food', etc.
    query.category = { $regex: new RegExp(`^${category}$`, 'i') };
  }

  const productsRaw = await Product.find(query).lean();
  const products = JSON.parse(JSON.stringify(productsRaw));

  const categories = ['food', 'clothing', 'craft', 'festive'];

  return (
    <main className="min-h-screen bg-secondary">
      {/* Editorial Header Section */}
      <div className="bg-heritage-bone border-b border-primary/5 pt-24 pb-20">
        <div className="container-editorial text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary mb-6 block animate-fade-up">
             The Collections
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-heritage-dark mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Boutique <span className="italic font-normal text-primary">Heritage.</span>
          </h1>
          <p className="text-lg text-heritage-muted max-w-2xl mx-auto leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '0.4s' }}>
             Every item in our collection is sustainably sourced and handcrafted by traditional artisans, preserving the ancient soul of Mithila.
          </p>
        </div>
      </div>

      <div className="container-editorial py-20 pb-40">
        {/* Boutique Category Filter */}
        <div className="mb-24 overflow-x-auto no-scrollbar">
          <div className="flex justify-center gap-6 min-w-max pb-4">
            <Link
              href="/products"
              className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 border ${
                !category
                  ? 'bg-primary text-heritage-bone border-primary shadow-2xl'
                  : 'bg-white text-heritage-dark border-primary/10 hover:border-primary hover:text-primary'
              }`}
            >
              All Pieces
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${cat}`}
                className={`px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 border capitalize ${
                  category === cat
                    ? 'bg-primary text-heritage-bone border-primary shadow-2xl'
                    : 'bg-white text-heritage-dark border-primary/10 hover:border-primary hover:text-primary'
                }`}
              >
                {cat === 'food' ? 'Heritage Food' : cat === 'clothing' ? 'Handlooms' : cat === 'culture' ? 'Mithila Art' : 'Festive'}
              </Link>
            ))}
          </div>
        </div>

        {/* Staggered Products Grid (Filtered) */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
            {products.map((product: any, idx: number) => (
              <div key={product._id.toString()} className={`animate-fade-up ${idx % 2 === 1 ? 'md:translate-y-12' : ''}`}>
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-heritage-bone rounded-[4rem] border border-primary/5">
             <div className="max-w-md mx-auto px-6">
                <div className="text-6xl font-serif text-primary opacity-20 mb-8 italic">Coming Soon</div>
                <h3 className="text-2xl font-serif font-bold text-heritage-dark mb-6 tracking-widest uppercase">Archive in Progress</h3>
                <p className="text-heritage-muted text-lg font-medium mb-12 leading-relaxed">
                   Our artisans are currently hand-pouring their soul into new pieces for this category. Check back soon for authentic Mithila treasures.
                </p>
                <Link
                  href="/products"
                  className="btn-boutique btn-boutique-primary !px-14"
                >
                  Browse All Collections
                </Link>
             </div>
          </div>
        )}
      </div>
    </main>
  );
}

