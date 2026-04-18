import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: 'food' | 'clothing' | 'craft' | 'festive';
  price: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    startDate?: Date;
    endDate?: Date;
  };
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  origin: string;
  artisanName?: string;
  description: string;
  variants?: {
    name: string;
    price: number;
    stockQuantity: number;
    image?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['food', 'clothing', 'craft', 'festive'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
      },
      value: Number,
      startDate: Date,
      endDate: Date,
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    origin: {
      type: String,
      default: 'Mithila',
    },
    artisanName: String,
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        stockQuantity: { type: Number, default: 0 },
        image: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Timestamps: true handled by schema options

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);
