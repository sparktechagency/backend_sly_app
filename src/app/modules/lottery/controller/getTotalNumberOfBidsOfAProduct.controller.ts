import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { productModel } from '../../product/model/product.model';
import { lotteryModel } from '../model/lottery.model';
import { lotteryParticipantsModel } from '../model/participantsOfLottery.model';
import sendResponse from '../../../../shared/sendResponse';

export const getTotalNumberOfParticipantsOfProductController =
  myControllerHandler(async (req, res) => {
    const { id } = req.query;
    const productData = await productModel.findOne({ id });
    if (!productData) {
      throw new Error('product does not exist');
    }
    let participantsNumber = 0;
    const lotteryData = await lotteryModel.findOne({
      productId: id,
      status: 'running',
    });
    if (lotteryData) {
      participantsNumber = await lotteryParticipantsModel.countDocuments({
        lotteryId: lotteryData.id,
      });
    }

    sendResponse(res, {
      code: StatusCodes.OK,
      message: 'Fetched Successful',
      data: { participantsNumber },
    });
  });
