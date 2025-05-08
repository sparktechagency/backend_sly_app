import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { slyPackagesModel } from '../model/slyPackages.model';
import { PaymentModel } from '../../payment_v2/model/payment.model';
import { slyOfPeoplesModel } from '../model/sly.model';

export const buySlyController = myControllerHandler(async (req, res) => {
  const userdata: any = await getUserDataFromRequest2(req);
  const userId = userdata.id;
  const { packageId, payment_data } = req.body;
  const packageData = await slyPackagesModel.findOne({ id: packageId });
  if (!packageData) {
    throw new Error('this package does not exist');
  }
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
    packageId: packageId,
    paymentMethod: payment_method,
    cardBrand: payment_method_options.card.brand,
    last4: payment_method_options.card.last4,
    status,
  });

  let slyData = await slyOfPeoplesModel.findOne({
    userId,
  });
  if (slyData) {
    slyData.amount = slyData.amount + packageData.amount;
    await slyData.save();
  } else if (!slyData) {
    slyData = await slyOfPeoplesModel.create({
      userId,
      amount: packageData.amount,
    });
  }

  const myResponse = {
    message: 'Review Given Successfully',
    success: true,
    data: {
      paymentData,
      slyData,
    },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
