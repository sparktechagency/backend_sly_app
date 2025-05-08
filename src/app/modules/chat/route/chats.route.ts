import express from 'express';
import { sendMessagesController } from '../controller/sendMessage.controller';
import { getListOfOldConversationsController } from '../controller/getListOfOldConversations.controller';
import { getMessagesController } from '../controller/getMessages.controller';

const router = express.Router();

router.post('/send-message', sendMessagesController);
router.get('/old-conversations-list/get', getListOfOldConversationsController);
router.get('/old-messages/get', getMessagesController);

export const chatRouter = router;
