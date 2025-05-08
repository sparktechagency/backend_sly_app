import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../../auth_v2/model/user.model';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const getDataOfSingleUserController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { id } = req.params;
    const userData = await userModel.findOne({ id });
    if (!userData) {
      throw new Error('user does not exist');
    }
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: { userData },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
