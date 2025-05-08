import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { orderModel } from '../model/order.model';
import { refineOrderData } from '../../../../helpers_v2/array/refineOrderData.helper';

export const getOrderHistoryForASpecificUserController = myControllerHandler(
  async (req, res) => {
    const userData = await getUserDataFromRequest2(req);
    const { id } = userData;

    const orderData = await orderModel.find({
      userId: id,
    });
    const refinedData = refineOrderData(orderData);

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {
        ordersData: refinedData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
