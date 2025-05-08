import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { chatConversationModel } from '../model/conversation.model';
import { chatModel } from '../model/chatMessages.model';
import { userModel } from '../../auth_v2/model/user.model';
import { getOppositeId } from '../../../../utils/others/getOppositeId';
import { refineMyConversationData } from '../../../../utils/messages/refineMessages';

export const getListOfOldConversationsController = myControllerHandler(
  async (req, res) => {
    const userData: any = await getUserDataFromRequest2(req);
    const userId = userData.id;

    // Get pagination parameters from the request query
    const { page, limit } = req.query;
    const refinedPage = Number(page) || 1; // Default to page 1 if no page is provided
    const refinedLimit = Number(limit); // If limit is not provided, refinedLimit will be NaN

    const numbersToSkip = (refinedPage - 1) * (refinedLimit || 1); // If limit is not provided, treat as 1 to avoid skipping

    let conversationData;
    let totalNumberOfItems;

    if (refinedLimit) {
      // If limit is provided, apply pagination
      conversationData = await chatConversationModel
        .find({ participants: { $in: [userId] } })
        .skip(numbersToSkip)
        .limit(refinedLimit)
        .sort({ updatedAt: -1 });

      totalNumberOfItems = await chatConversationModel.countDocuments({
        participants: { $in: [userId] },
      });
    } else {
      // If limit is not provided, fetch all conversations (no limit)
      conversationData = await chatConversationModel
        .find({ participants: { $in: [userId] } })
        .sort({ updatedAt: -1 });

      totalNumberOfItems = conversationData.length; // All data is returned
    }

    const totalNumberOfPages = refinedLimit
      ? Math.ceil(totalNumberOfItems / refinedLimit)
      : 1; // If no limit, only one "page" is available since there is no pagination

    const refinedData = [];
    for (let i = 0; i < conversationData.length; i++) {
      const singleData: any = conversationData[i].toObject();
      const newestChat = await chatModel
        .findOne({ conversationId: singleData.id })
        .sort({ createdAt: -1 });
      singleData.newestChat = newestChat;

      const oppositeUserId = getOppositeId(singleData.participants, userId);
      let otherUser: any = await userModel.findOne({ id: oppositeUserId });
      if (otherUser) {
        otherUser = otherUser.toObject();
        delete otherUser.passwordHash; // Remove sensitive data
      }
      singleData.otherUser = otherUser;
      refinedData.push(singleData);
    }

    const refinedData2 = refineMyConversationData(refinedData);

    const myResponse = {
      message: 'Conversations Retrieved Successfully',
      currentPage: refinedPage,
      totalItems: totalNumberOfItems,
      totalPages: totalNumberOfPages,
      success: true,
      data: {
        refinedData2,
      },
    };

    res.status(StatusCodes.OK).json(myResponse);
  }
);
