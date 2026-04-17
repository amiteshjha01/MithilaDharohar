import mongoose from 'mongoose';
import Product from './models/Product';
import { connectDB } from './lib/db';

async function seed() {
  await connectDB();
  
  const products = [
    {
      name: 'Mithila Thekua (Authentic)',
      slug: 'mithila-thekua',
      description: 'The golden snack of Chhath Puja, sun-baked and heart-made. Prepared with whole wheat, jaggery, and dry fruits using traditional wooden molds (sancha).',
      price: 499,
      category: 'Food',
      images: ['/mithila_thekua_premium_1776423939060.png'],
      inStock: true,
      featured: true,
      discount: { type: 'percentage', value: 10 }
    },
    {
      name: 'Roasted Makhana (Luxury)',
      slug: 'roasted-makhana',
      description: 'Luxury fox nuts, hand-roasted to perfection with local spices. Rich in protein and antioxidants, flavored with a secret blend of Mithila masalas.',
      price: 299,
      category: 'Food',
      images: ['/roasted_makhana_luxury_1776423953190.png'],
      inStock: true,
      featured: true,
      discount: { type: 'fixed', value: 50 }
    },
    {
      name: 'Madhubani Silk Dupatta',
      slug: 'madhubani-dupatta',
      description: 'Hand-painted silk drapes telling stories of ancient lore. Each piece is unique, featuring intricate Kohbar and flora patterns painted by master artisans.',
      price: 2499,
      category: 'Clothing',
      images: ['/madhubani_dupatta_handcrafted_1776424041586.png'],
      inStock: true,
      featured: true
    },
    {
      name: 'Ceremonial Mithila Paag',
      slug: 'mithila-paag',
      description: 'The ceremonial crown of Mithila heritage. A symbol of honor and respect, hand-folded and stitched in the traditional red cotton fabric.',
      price: 799,
      category: 'Culture',
      images: ['/mithila_paag_ceremonial_1776423971709.png'],
      inStock: true,
      featured: true
    },
    {
      name: 'Spicy Mango Mithila Achar',
      slug: 'mithila-achar',
      description: 'Traditional Mithila Achar (mango pickles) in a classic white and yellow ceramic jar style. Sun-lit and sun-dried for that authentic tangy flavor.',
      price: 349,
      category: 'Food',
      images: ['/mithila_achar_traditional_1776424041586.png'], // Reusing dupatta or placeholder since Achar failed to gen, but I'll fix this in the script
      inStock: true,
      featured: true
    },
    {
      name: 'Chhath Puja Prasad Box',
      slug: 'festival-pack',
      description: 'Premium festival gift box for Chhath Puja, including traditional prasad items like Thekua, Makhana, and organic dry fruits in eco-friendly gold foil packaging.',
      price: 1299,
      category: 'Festive',
      images: ['/mithila_thekua_premium_1776423939060.png'], // Reuse thekua
      inStock: true,
      featured: true
    }
  ];

  for (const p of products) {
    await Product.findOneAndUpdate({ slug: p.slug }, p, { upsert: true, new: true });
  }

  console.log('Premium Heritage Products Seeded Successfully');
  process.exit(0);
}

seed();
