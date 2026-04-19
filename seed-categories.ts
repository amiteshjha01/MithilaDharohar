import mongoose from 'mongoose';
import Category from './models/Category';
import { connectDB } from './lib/db';

async function seedCategories() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const defaultCategories = [
      {
        name: 'Artisan Food',
        slug: 'food',
        description: 'Authentic flavors of Mithila, from hand-roasted Makhana to sun-dried Thekua.',
        order: 1,
        isDefault: true,
      },
      {
        name: 'Heritage Clothing',
        slug: 'clothing',
        description: 'Traditional silhouettes featuring hand-painted designs and ancient drapes.',
        order: 2,
        isDefault: true,
      },
      {
        name: 'Traditional Craft',
        slug: 'craft',
        description: 'Masterpieces of craftsmanship, including Sikki grass items and paper-mache art.',
        order: 3,
        isDefault: true,
      },
      {
        name: 'Festive Decor',
        slug: 'festive',
        description: 'Ceremonial essentials and decorative tokens for the vibrant festivals of Mithila.',
        order: 4,
        isDefault: true,
      },
    ];

    console.log('Seeding default categories...');

    for (const cat of defaultCategories) {
      const existing = await Category.findOne({ slug: cat.slug });
      
      if (existing) {
        console.log(`Category "${cat.name}" (${cat.slug}) already exists. Skipping...`);
        continue;
      }

      await Category.create(cat);
      console.log(`Created category: ${cat.name}`);
    }

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedCategories();
