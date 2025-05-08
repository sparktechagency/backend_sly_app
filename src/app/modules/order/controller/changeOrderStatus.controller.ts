import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { orderModel } from '../model/order.model';

export const changeDeliveryStatusController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { orderId, status } = req.body;
    const orderData = await orderModel.findOne({ id: orderId });
    if (!orderData) {
      throw new Error('order does not exist with this id');
    }
    if (status === 'true') {
      orderData.isDelivered = true;
      await orderData.save();
    } else if (status === 'false') {
      orderData.isDelivered = false;
      await orderData.save();
    }

    const myResponse = {
      message: 'deliverydata updated successful',
      success: true,
      data: {
        orderData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
