import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { PaymentModel } from '../../payment_v2/model/payment.model';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { orderModel } from '../../order/model/order.model';

export const buyProductController = myControllerHandler(async (req, res) => {
  const userData: any = await getUserDataFromRequest2(req);
  const userId = userData.id;
  const { payment_data, cart_data, deliveryAddress } = req.body;
  const {
    amount,
    currency,
    id,
    payment_method,
    payment_method_options,
    status,
  } = payment_data;
  const paymentData = await PaymentModel.create({
    userId,
    amount,
    currency,
    transactionId: id,
    paymentMethod: payment_method,
    cardBrand: payment_method_options.card.brand,
    last4: payment_method_options.card.last4,
    status,
  });
  const orderData = await orderModel.create({
    productsData: JSON.stringify(cart_data),
    deliveryAddress: deliveryAddress,
    userId: userId,
    paymentId: paymentData.id,
  });

  paymentData.orderId = orderData.id;
  await paymentData.save();

  const myResponse = {
    message: 'Review Given Successfully',
    success: true,
    data: {},
  };
  res.status(StatusCodes.OK).json(myResponse);
});
