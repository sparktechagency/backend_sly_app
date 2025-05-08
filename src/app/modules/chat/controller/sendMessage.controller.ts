import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { chatConversationModel } from '../model/conversation.model';
import { chatModel } from '../model/chatMessages.model';

export const sendMessagesController = myControllerHandler(async (req, res) => {
  const userData: any = await getUserDataFromRequest2(req);
  const userId = userData.id;
  const { receiverId, message } = req.body;
  let conversationData = await chatConversationModel.findOne({
    participants: { $all: [userId, receiverId] },
  });

  if (!conversationData) {
    conversationData = await chatConversationModel.create({
      participants: [userId, receiverId],
    });
  }

  const chatData = await chatModel.create({
    senderId: userId,
    receiverId: receiverId,
    message: message,
    conversationId: conversationData.id,
  });

  conversationData.updatedAt = new Date();
  await conversationData.save();
  const myResponse = {
    message: 'Review Given Successfully',
    success: true,
    data: {
      conversationData,
      chatData,
    },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
