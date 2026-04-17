import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/lib/analytics';

/**
 * GET /api/products
 * Fetch all products or filter by category
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const query: any = {};
    if (category && category !== 'all') {
      // Perform case-insensitive search to match 'Food' with 'food', etc.
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const products = await Product.find(query).select(
      'name slug category price discount images inStock stockQuantity artisanName description'
    );

    log.api('Fetched products', {
      count: products.length,
      category: category || 'all',
    });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    log.error('Failed to fetch products', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Create a new product (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || !authHeader || authHeader.replace('Bearer ', '') !== adminKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      name,
      slug: providedSlug,
      category,
      price,
      discount,
      images,
      inStock,
      stockQuantity,
      artisanName,
      description,
    } = body;

    // Validate required fields
    if (!name || !category || price === undefined || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const { generateSlug, ensureUniqueSlug } = await import('@/lib/helpers.server');
    let slug = providedSlug || generateSlug(name);
    slug = await ensureUniqueSlug(slug);

    const product = await Product.create({
      name,
      slug,
      category,
      price,
      discount,
      images: images || [],
      inStock: inStock !== undefined ? inStock : true,
      stockQuantity: stockQuantity || 0,
      artisanName,
      description,
      origin: 'Mithila',
    });

    log.api('Created product', {
      productId: product._id,
      name: product.name,
      slug: product.slug,
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    log.error('Failed to create product', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
