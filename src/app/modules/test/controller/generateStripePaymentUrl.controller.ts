import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { myStripe } from '../../../../config/stripe/stripe.config';
import { FRONTEND_ADDRESS } from '../../../../data/environmentVariables';
import { productModel } from '../../product/model/product.model';

export const generateStripePaymentUrlController = myControllerHandler(
  async (req, res) => {
    const itemsData = req.body;
    const refinedPaymentData = [];
    for (let i = 0; i < itemsData.length; i++) {
      const singleData = itemsData[i];
      const productData: any = await productModel.findOne({
        id: singleData.id,
      });
      const { price, title } = productData;
      const singleRefinedData = {
        price_data: {
          currency: 'usd',
          product_data: {
            name: title,
            metadata: {
              product_id: singleData.id, // your internal ID
            },
          },
          unit_amount: price * 100,
        },
        quantity: singleData.quantity,
      };
      refinedPaymentData.push(singleRefinedData);
    }

    const session = await myStripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${FRONTEND_ADDRESS}/test/stripe/success-page`,
      cancel_url: `${FRONTEND_ADDRESS}/test/stripe/failure-page`,
      line_items: refinedPaymentData,
    });
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      session,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
