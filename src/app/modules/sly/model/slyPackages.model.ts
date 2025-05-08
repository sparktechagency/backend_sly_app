import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Assuming you want a custom ID like before

const slyPackagesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'sly_package_' + ar7id(),
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: 'euro',
    },
  },
  { timestamps: true }
);

export const slyPackagesModel = mongoose.model(
  'sly_packages',
  slyPackagesSchema
);
