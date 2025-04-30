import express from 'express';
import { testController } from '../controller/test.controller';
import { makeDummyUserController } from '../controller/generateDummyUser.controller';
import { sendMessagesUsingTwilioController } from '../controller/sendMessageUsingTwilio.controller';

const testRouter = express.Router();

testRouter.post('/', testController);
testRouter.get('/create-dummy-user', makeDummyUserController);
testRouter.post(
  '/send-message-using-twilio',
  sendMessagesUsingTwilioController
);
export { testRouter };
