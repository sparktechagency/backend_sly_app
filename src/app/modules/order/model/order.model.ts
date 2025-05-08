import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'order_' + ar7id(),
    },
    productsData: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    isDelivered: { type: Boolean, required: false, default: false },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const orderModel = mongoose.model('orders', orderSchema);
