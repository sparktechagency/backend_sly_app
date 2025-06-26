import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { productModel } from '../../product/model/product.model';
import { getUserDataFromRequest2 } from '../../../../helpers/getUserDataFromRequest.helper';
import { slyOfPeoplesModel } from '../../sly/model/sly.model';
import { lotteryModel } from '../model/lottery.model';
import { lotteryParticipantsModel } from '../model/participantsOfLottery.model';

export const participatingInLotteryController = myControllerHandler(
  async (req, res) => {
    const { productId } = req.body;
    const userData = await getUserDataFromRequest2(req);
    const productData = await productModel.findOne({ id: productId });
    if (!productData) {
      throw new Error('product does not exist with this id');
    }
    const userId = userData.id;
    const { requiredSly } = productData;
    const slyOfUser = await slyOfPeoplesModel.findOne({ userId: userId });
    const doesNotHaveEnoughSly = !slyOfUser || slyOfUser.amount < requiredSly;
    if (doesNotHaveEnoughSly) {
      throw new Error(
        'user does not have enough sly to partitcipate in this lottery'
      );
    }

    let lotteryData = await lotteryModel.findOne({
      productId: productData.id,
      status: 'running',
    });
    if (!lotteryData) {
      lotteryData = await lotteryModel.create({
        productId: productData.id,
        status: 'running',
      });
    }
    const totalNumberOfParticipants =
      await lotteryParticipantsModel.countDocuments({
        lotteryId: lotteryData.id,
      });

    const isMaxNumberOfParticipantsReached =
      totalNumberOfParticipants >= productData.numberOfTotalLotteryParticipants;
    console.log(totalNumberOfParticipants);
    if (isMaxNumberOfParticipantsReached) {
      throw new Error('max number of participants reached');
    }
    const requestedUserParticipationData =
      await lotteryParticipantsModel.findOne({
        lotteryId: lotteryData.id,
        userId: userId,
      });
    if (requestedUserParticipationData) {
      throw new Error('this user already participated in this lottery');
    }
    await lotteryParticipantsModel.create({
      lotteryId: lotteryData.id,
      userId: userId,
    });
    const totalNumberOfParticipants2 =
      await lotteryParticipantsModel.countDocuments({
        lotteryId: lotteryData.id,
      });
    const isMaxNumberOfParticipantsReached2 =
      totalNumberOfParticipants2 >=
      productData.numberOfTotalLotteryParticipants;
    if (isMaxNumberOfParticipantsReached2) {
      lotteryData.status = 'complete_but_not_declared_winner';
      await lotteryData.save();
    }

    const myResponse = {
      message: 'participation successful',
      success: true,
      data: {
        lotteryData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
