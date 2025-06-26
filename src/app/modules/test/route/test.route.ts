import express from 'express';
import { testController } from '../controller/test.controller';
import { makeDummyUserController } from '../controller/generateDummyUser.controller';
import { sendMessagesUsingTwilioController } from '../controller/sendMessageUsingTwilio.controller';
import { getEncryptedTokenController } from '../controller/getEncryptedToken.controller';
import { generateStripePaymentUrlController } from '../controller/generateStripePaymentUrl.controller';
import { stripeWebhookController } from '../controller/stripeWebhookTest.controller';

const testRouter = express.Router();

testRouter.post('/', testController);
testRouter.get('/create-dummy-user', makeDummyUserController);
testRouter.post(
  '/send-message-using-twilio',
  sendMessagesUsingTwilioController
);
testRouter.get('/get-encrypted-token', getEncryptedTokenController);
testRouter.post('/stripe/payment/make', generateStripePaymentUrlController);
testRouter.post(
  '/stripe/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhookController
);
export { testRouter };
