import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { slyPackagesModel } from '../model/slyPackages.model';

export const getSlyPackagesController = myControllerHandler(
  async (req, res) => {
    const slyPackages = await slyPackagesModel.find({});
    const myResponse = {
      message: 'SLY Package data fetched successful',
      success: true,
      data: {
        slyPackages,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
