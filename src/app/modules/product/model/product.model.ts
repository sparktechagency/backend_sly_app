import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Assuming you want a custom ID like before

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'product_' + ar7id(),
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    maxPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    requiredSly: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
    },
    orderNumber: {
      type: String,
    },
    type: {
      type: String,
      enum: ['regular', 'offer', 'both'],
      default: 'regular',
    },
    description: {
      type: String,
    },
    images: {
      type: [String], // Could be URL or base64 string
      default: [],
    },
    onHomePage: {
      type: Boolean,
      default: false,
    },
    numberOfTotalLotteryParticipants: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model('product', productSchema);
