import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userAgreementModel } from '../model/userAgreement.model';

export const getUserAgreementController = myControllerHandler(
  async (req, res) => {
    const userAgreement = await userAgreementModel.findOne({});
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: userAgreement,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
