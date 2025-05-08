import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../../auth_v2/model/user.model';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const getDataOfUsersController2 = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { page, limit } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const numbersToSkip = (refinedPage - 1) * refinedLimit;
    const propertyBlogsData = await userModel
      .find({})
      .skip(numbersToSkip)
      .limit(refinedLimit);
    const totalNumberOfItems = await userModel.countDocuments({});
    const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

    const refinedData: any = [];
    for (let i = 0; i < propertyBlogsData.length; i++) {
      const singleData = propertyBlogsData[i].toObject();
      refinedData.push(singleData);
    }
    const myResponse = {
      message: 'Property Data Retrieved Successfully',
      success: true,
      data: refinedData,
      currentPage: refinedPage,
      totalItems: totalNumberOfItems,
      totalPages: totalNumberOfPages,
    };

    res.status(StatusCodes.OK).json(myResponse);
  }
);
