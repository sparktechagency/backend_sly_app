import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { myGreen } from '../../../../data/colors';
import { myStripe } from '../../../../config/stripe/stripe.config';
import { STRIPE_SIGNING_SECRET } from '../../../../data/environmentVariables';

export const stripeWebhookController = myControllerHandler(async (req, res) => {
  console.log(myGreen, 'stripe webhook request received');
  const sig = req.headers['stripe-signature'];
  const testEvent: any = myStripe.webhooks.constructEvent(
    req.body,
    sig!,
    STRIPE_SIGNING_SECRET
  );
  const checkoutSessionId = testEvent.data.object.id;
  const purchasedItems = await myStripe.checkout.sessions.listLineItems(
    checkoutSessionId,
    { expand: ['data.price.product'] }
  );
  for (let i = 0; i < purchasedItems.data.length; i++) {
    const singleData: any = purchasedItems.data[i];
    console.log(singleData.price?.product?.metadata);
  }
  const myResponse = {
    message: 'Review Given Successfully',
    success: true,
    data: {},
  };
  res.status(StatusCodes.OK).json(myResponse);
});
