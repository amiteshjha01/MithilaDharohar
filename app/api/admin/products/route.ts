import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import { validateAdminKey } from '@/lib/middleware';
import { log } from '@/lib/analytics';

/**
 * GET /api/admin/products
 * Fetch all products for admin
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!validateAdminKey(authHeader)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    log.api('Admin fetched products', { count: products.length });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    log.error('Admin failed to fetch products', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
