import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id'; // Custom ID helper

const chatSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'chat_' + ar7id(),
    },
    message: {
      type: String,
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
      index: true, // Index for faster conversation-based queries
    },
    senderId: {
      type: String,
      required: true,
      index: true, // Helpful for filtering chats by sender
    },
    receiverId: {
      type: String,
      required: true,
      index: true, // Helpful for filtering chats by receiver
    },
  },
  { timestamps: true }
);

// Optional compound index for frequent chat queries
chatSchema.index({ conversationId: 1, createdAt: -1 }); // Optimizes retrieving recent messages in a conversation

export const chatModel = mongoose.model('chats', chatSchema);
