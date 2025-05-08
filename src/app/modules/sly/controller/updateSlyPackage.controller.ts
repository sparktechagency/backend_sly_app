import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { slyPackagesModel } from '../model/slyPackages.model';

export const updateSlyPackageController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { id, name, amount, price } = req.body;
    const packageData = await slyPackagesModel.findOne({ id });
    if (!packageData) {
      throw new Error('package does not exist with this id');
    }
    if (name) {
      packageData.name = name;
    }
    if (amount) {
      packageData.amount = amount;
    }
    if (price) {
      packageData.price = price;
    }

    const myResponse = {
      message: 'Package Updated Successfully',
      success: true,
      data: {
        packageData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
