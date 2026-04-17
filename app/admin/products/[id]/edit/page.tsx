'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'food',
    price: 0,
    discount: {
      type: 'percentage',
      value: 0,
    },
    images: [] as string[],
    inStock: true,
    stockQuantity: 0,
    artisanName: '',
    description: '',
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('mithila_admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('mithila_admin_key')}`
        }
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData({
          ...data.data,
          discount: data.data.discount || { type: 'percentage', value: 0 },
        });
      } else {
        setError(data.error || 'Failed to fetch product');
      }
    } catch (err) {
      setError('An error occurred while fetching product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('discount.')) {
      const subField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        discount: {
          ...prev.discount,
          [subField]: type === 'number' ? parseFloat(value) : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : (type === 'checkbox' ? (e.target as HTMLInputElement).checked : value)
      }));
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify({ id, ...formData })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('mithila_admin_key', adminKey);
        router.push('/admin/products');
      } else {
        setError(data.error || 'Failed to update product');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-orange-600 px-8 py-6">
            <h1 className="text-3xl font-black text-white">Edit Product</h1>
            <p className="text-orange-100 mt-1">Update Mithila heritage item details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-r-xl">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value="food">Food</option>
                    <option value="clothing">Clothing</option>
                    <option value="craft">Handicrafts</option>
                    <option value="festive">Festival Packs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug (optional - auto generated if empty)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="e.g. madhubani-painting-large"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Artisan Name</label>
                  <input
                    type="text"
                    name="artisanName"
                    value={formData.artisanName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    required
                    min="0"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Pricing & Discount</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500 border-gray-300 transition-all"
                    />
                    <span className="text-sm font-bold text-gray-700">In Stock Available</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-orange-50 p-6 rounded-2xl">
                <div>
                  <label className="block text-sm font-bold text-orange-700 mb-2">Discount Type</label>
                  <select
                    name="discount.type"
                    value={formData.discount.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-orange-700 mb-2">Discount Value</label>
                  <input
                    type="number"
                    name="discount.value"
                    min="0"
                    value={formData.discount.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Product Images</h2>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Image URL (e.g. https://...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
                >
                  Add
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                    <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Admin Authorization</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Admin Key</label>
                <input
                  type="password"
                  required
                  placeholder="Enter secret admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <Link
                href="/admin/products"
                className="flex-1 px-8 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-xl text-center hover:bg-gray-50 transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-[2] bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
              >
                {isSaving ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating Product...
                  </>
                ) : (
                  'Update Product'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
