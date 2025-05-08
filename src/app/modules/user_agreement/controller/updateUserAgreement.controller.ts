import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { userAgreementModel } from '../model/userAgreement.model';

export const updateUserAgreementController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { content } = req.body;
    const userAgreement = await userAgreementModel.findOne({});
    if (!userAgreement) {
      throw new Error('user agreement is not created yet');
    }
    userAgreement.content = content;
    await userAgreement.save();
    const myResponse = {
      message: 'user agreement updated successfully',
      success: true,
      data: {},
      userAgreement,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
