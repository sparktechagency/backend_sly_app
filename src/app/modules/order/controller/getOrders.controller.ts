import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { orderModel } from '../model/order.model';
import { checkIsBanned2 } from '../../../../helpers_v2/auth/checkIsBanned.helper';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const getOrdersDataController = myControllerHandler(async (req, res) => {
  await checkIfUserRequestingAdmin4(req);

  const { page, limit, delivery_status } = req.query;
  let deliveryStatus: Boolean | undefined;

  if (delivery_status === 'true') {
    deliveryStatus = true;
  } else if (delivery_status === 'false') {
    deliveryStatus = false;
  }

  const refinedPage = Number(page);
  const refinedLimit = Number(limit);
  const numbersToSkip = (refinedPage - 1) * refinedLimit;

  let filter: any = {};

  if (deliveryStatus !== undefined) {
    filter.isDelivered = deliveryStatus;
  }

  const myData = await orderModel
    .find(filter)
    .skip(numbersToSkip)
    .limit(refinedLimit);

  const totalNumberOfItems = await orderModel.countDocuments(filter);
  const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

  const refinedData: any = [];

  for (let i = 0; i < myData.length; i++) {
    const singleData = myData[i].toObject();
    singleData.productsData = JSON.parse(singleData.productsData);
    refinedData.push(singleData);
  }

  const myResponse = {
    message: 'Property Data Retrieved Successfully',
    success: true,
    currentPage: refinedPage,
    totalNumberOfItems: totalNumberOfItems,
    totalNumberOfPages: totalNumberOfPages,
    data: refinedData,
  };

  res.status(StatusCodes.OK).json(myResponse);
});
