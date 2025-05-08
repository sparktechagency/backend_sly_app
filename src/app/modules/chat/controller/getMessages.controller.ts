import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { chatConversationModel } from '../model/conversation.model';
import { chatModel } from '../model/chatMessages.model';

export const getMessagesController = myControllerHandler(async (req, res) => {
  const userData: any = await getUserDataFromRequest2(req);
  const userId = userData.id;
  const { conversationId, page, limit } = req.query;

  // Check if the user is a participant in the conversation
  const conversationData = await chatConversationModel.findOne({
    id: conversationId,
  });
  if (
    conversationData?.participants[0] !== userId &&
    conversationData?.participants[1] !== userId
  ) {
    throw new Error('User is not permitted to view this conversation messages');
  }

  // Pagination logic
  const refinedPage = Number(page) || 1; // Default to page 1 if no page is provided
  const refinedLimit = Number(limit); // If limit is not provided, refinedLimit will be NaN
  const numbersToSkip = (refinedPage - 1) * (refinedLimit || 1); // If no limit, treat as 1 to avoid skipping

  let chatMessages;
  let totalNumberOfItems;

  if (refinedLimit) {
    // If limit is provided, apply pagination
    chatMessages = await chatModel
      .find({ conversationId: conversationId })
      .skip(numbersToSkip)
      .limit(refinedLimit)
      .sort({ createdAt: -1 });

    totalNumberOfItems = await chatModel.countDocuments({
      conversationId: conversationId,
    });
  } else {
    // If no limit is provided, fetch all messages
    chatMessages = await chatModel
      .find({ conversationId: conversationId })
      .sort({ createdAt: -1 });

    totalNumberOfItems = chatMessages.length; // All messages are returned
  }

  const totalNumberOfPages = refinedLimit
    ? Math.ceil(totalNumberOfItems / refinedLimit)
    : 1; // If no limit, only one "page" is available

  const myResponse = {
    message: 'Messages Retrieved Successfully',
    success: true,
    data: {
      chatMessages,
    },
    currentPage: refinedPage,
    totalItems: totalNumberOfItems,
    totalPages: totalNumberOfPages,
  };

  res.status(StatusCodes.OK).json(myResponse);
});
