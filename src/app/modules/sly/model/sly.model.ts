import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Assuming you want a custom ID like before

const slyOfPeoplesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'sly_' + ar7id(),
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const slyOfPeoplesModel = mongoose.model(
  'sly_of_peoples',
  slyOfPeoplesSchema
);
