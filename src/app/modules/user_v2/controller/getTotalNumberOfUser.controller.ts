import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../../auth_v2/model/user.model';
import {
  checkIfUserRequestingAdmin3,
  checkIfUserRequestingAdmin4,
} from '../../../../helpers/checkIfRequestedUserAdmin';

export const getNumberOfTotalUserController2 = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const numberOfTotalUser = await userModel.countDocuments({
      role: 'user',
    });
    const myResponse = {
      message: 'Users counted successfully',
      success: true,
      totalUser: numberOfTotalUser,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
