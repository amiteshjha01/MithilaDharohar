import { IProduct } from '@/models/Product';
import { getEffectivePrice, getDeliveryCharge, formatPrice } from './helpers';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PricingBreakdown {
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

/**
 * Calculate total price for a cart based on DB prices
 * Never trust frontend prices
 */
export async function calculateCartPrice(
  items: CartItem[],
  products: Map<string, IProduct>
): Promise<PricingBreakdown> {
  let subtotal = 0;

  for (const item of items) {
    const product = products.get(item.productId);
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    const effectivePrice = getEffectivePrice(product.price, product.discount);
    subtotal += effectivePrice * item.quantity;
  }

  subtotal = formatPrice(subtotal);
  const deliveryCharge = getDeliveryCharge(subtotal);
  const total = formatPrice(subtotal + deliveryCharge);

  return {
    subtotal,
    deliveryCharge,
    total,
  };
}

/**
 * Validate that product has sufficient stock
 */
export function validateStock(
  product: IProduct,
  requestedQuantity: number
): { valid: boolean; message?: string } {
  if (!product.inStock) {
    return {
      valid: false,
      message: `${product.name} is currently out of stock`,
    };
  }

  if (product.stockQuantity < requestedQuantity) {
    return {
      valid: false,
      message: `Insufficient stock for ${product.name}. Only ${product.stockQuantity} available.`,
    };
  }

  return { valid: true };
}
