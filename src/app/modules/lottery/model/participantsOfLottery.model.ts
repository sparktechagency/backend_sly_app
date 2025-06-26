import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const lotteryParticipantsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'lottery_participant_' + ar7id(),
    },
    lotteryId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const lotteryParticipantsModel = mongoose.model(
  'lottery_participant',
  lotteryParticipantsSchema
);
