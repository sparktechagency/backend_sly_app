import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { orderModel } from '../model/order.model';

export const confirmDeliveryCompleteController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { orderId } = req.body;
    const orderData = await orderModel.findOne({ id: orderId });
    if (!orderData) {
      throw new Error('order does not exist with this id');
    }
    orderData.isDelivered = true;
    await orderData.save();

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {
        orderData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
