import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { log } from '@/lib/analytics';

/**
 * GET /api/products/[slug]
 * Fetch a single product by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    log.api('Fetched product', {
      productId: product._id,
      slug: product.slug,
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    log.error('Failed to fetch product', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/products/[slug]
 * Update a product by slug (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || !authHeader || authHeader.replace('Bearer ', '') !== adminKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, price, discount, images, inStock, stockQuantity, artisanName, description } = body;

    // Update fields
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (images !== undefined) product.images = images;
    if (inStock !== undefined) product.inStock = inStock;
    if (stockQuantity !== undefined) product.stockQuantity = stockQuantity;
    if (artisanName !== undefined) product.artisanName = artisanName;
    if (description !== undefined) product.description = description;

    await product.save();

    log.api('Updated product', {
      productId: product._id,
      slug: product.slug,
    });

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    log.error('Failed to update product', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[slug]
 * Delete a product by slug (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_KEY;

    if (!adminKey || !authHeader || authHeader.replace('Bearer ', '') !== adminKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const product = await Product.findOneAndDelete({ slug });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    log.api('Deleted product', {
      productId: product._id,
      slug: product.slug,
    });

    return NextResponse.json({
      success: true,
      data: { message: 'Product deleted' },
    });
  } catch (error) {
    log.error('Failed to delete product', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
