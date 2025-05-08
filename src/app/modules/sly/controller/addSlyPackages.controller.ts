import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { slyPackagesModel } from '../model/slyPackages.model';

export const addSlyPackagesController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { name, amount, price } = req.body;

    const packageData = await slyPackagesModel.create({
      name,
      amount,
      price,
    });
    const myResponse = {
      message: 'Sly Package added successfully',
      success: true,
      data: {
        packageData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
