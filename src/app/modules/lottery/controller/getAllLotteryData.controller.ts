import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { lotteryModel } from '../model/lottery.model';
import { lotteryParticipantsModel } from '../model/participantsOfLottery.model';
import sendResponse from '../../../../shared/sendResponse';
import { productModel } from '../../product/model/product.model';

export const getAllLotteriesController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);

    const { page = '1', limit = '10' } = req.query;
    const refinedPage = Number(page);
    const refinedLimit = Number(limit);
    const numbersToSkip = (refinedPage - 1) * refinedLimit;

    const lotteryData = await lotteryModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(numbersToSkip)
      .limit(refinedLimit);

    const totalNumberOfItems = await lotteryModel.countDocuments({});
    const totalNumberOfPages = Math.ceil(totalNumberOfItems / refinedLimit);

    const refinedData = [];
    for (let i = 0; i < lotteryData.length; i++) {
      const singleData: any = lotteryData[i].toObject();
      const numberOfParticipants =
        await lotteryParticipantsModel.countDocuments({
          lotteryId: singleData.id,
        });
      singleData.numberOfParticipants = numberOfParticipants;
      const productData = await productModel.findOne({
        id: singleData.productId,
      });
      singleData.productData = productData;
      refinedData.push(singleData);
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Lotteries Retrieved Successfully',
      data: {
        currentPage: refinedPage,
        totalItems: totalNumberOfItems,
        totalPages: totalNumberOfPages,
        refinedData,
      },
    });
  }
);
