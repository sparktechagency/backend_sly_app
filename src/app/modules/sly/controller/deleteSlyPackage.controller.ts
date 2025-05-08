import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { slyPackagesModel } from '../model/slyPackages.model';

export const deleteSlyPackageController = myControllerHandler(
  async (req, res) => {
    const { id } = req.body;

    const slyPackage = await slyPackagesModel.findOne({ id });
    if (!slyPackage) {
      throw new Error('sly package does not exist with this id');
    }
    await slyPackage.deleteOne();

    const myResponse = {
      message: 'Sly package deleted successful',
      success: true,
      data: { slyPackage },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
