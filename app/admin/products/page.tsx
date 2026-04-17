'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/models/Product';
import Image from 'next/image';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminKey, setAdminKey] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const key = localStorage.getItem('adminKey');

        if (!key) {
          router.push('/admin/dashboard');
          return;
        }

        setAdminKey(key);

        const res = await fetch('/api/admin/products', {
          headers: { Authorization: `Bearer ${key}` },
        });

        if (!res.ok) {
          setError('Failed to fetch products');
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProducts(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you certain you wish to purge this heritage product?')) return;

    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminKey}` },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.slug !== slug));
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
           <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
           <p className="text-[11px] font-black uppercase tracking-[0.4em] text-text-muted">Loading Inventory...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-[#f0e6da] py-20">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <Link href="/admin/dashboard" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block hover:translate-x-[-4px] transition-transform">
              ← Dashboard
            </Link>
            <h1 className="text-5xl font-bold text-text-main text-serif tracking-tight">Heritage Inventory</h1>
          </div>
          <Link
            href="/admin/products/create"
            className="btn-premium-primary !px-10 !py-4 shadow-xl text-[12px]"
          >
            Add New Product
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {error && (
          <div className="bg-primary/5 border border-primary/10 text-primary px-8 py-4 rounded-2xl mb-10 text-xs font-bold uppercase tracking-widest">
            {error}
          </div>
        )}

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-primary/5 border border-[#f0e6da] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-secondary/30 border-b border-[#f0e6da]">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Product Identity</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Category</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Valuation</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-center">Stock</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e6da]/50">
                {products.map((product) => (
                  <tr key={product._id?.toString()} className="hover:bg-secondary/20 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 relative rounded-2xl overflow-hidden shadow-sm card-premium-v2">
                           <Image
                             src={product.images?.[0] || '/placeholder.png'}
                             alt={product.name}
                             fill
                             className="object-cover"
                           />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-text-main text-serif mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[11px] font-black text-primary uppercase tracking-widest border border-primary/10 px-3 py-1 rounded-full">{product.category}</span>
                    </td>
                    <td className="px-10 py-8 text-right font-black text-text-main text-lg tracking-tighter">
                      ₹{product.price.toFixed(0)}
                    </td>
                    <td className="px-10 py-8 text-center text-sm font-bold text-text-muted">
                      {product.stockQuantity} Units
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${
                          product.inStock
                            ? 'bg-green-50 text-green-700 border border-green-100'
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                      >
                        {product.inStock ? 'Available' : 'Sold Out'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <div className="flex items-center justify-center gap-6">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.slug)}
                          className="text-[10px] font-black uppercase tracking-widest text-[#b33936] hover:text-red-700 transition-colors"
                        >
                          Purge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
