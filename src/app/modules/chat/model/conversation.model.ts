import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Custom ID helper

const conversationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'conv_' + ar7id(),
    },
    participants: {
      type: [String], // Array of user IDs (e.g., [senderId, receiverId])
      required: true,
      index: true, // Single-field index (optional, compound index is more useful below)
    },
  },
  { timestamps: true }
);

export const chatConversationModel = mongoose.model(
  'chat_conversations',
  conversationSchema
);
