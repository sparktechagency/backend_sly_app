import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Assuming the ar7id function is correctly imported

const lotterySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'lottery_' + ar7id(), // Custom ID generated using ar7id
    },
    productId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'running',
        'complete_but_not_declared_winner',
        'complete_and_declared_winner',
        'cancelled',
      ],
      default: 'running',
    },
    winnerId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const lotteryModel = mongoose.model('lottery', lotterySchema);
