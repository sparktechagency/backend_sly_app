import express from 'express';
import { participatingInLotteryController } from '../controller/participatingInLottery.controller';
import { getTotalNumberOfParticipantsOfProductController } from '../controller/getTotalNumberOfBidsOfAProduct.controller';
import { getAllLotteriesController } from '../controller/getAllLotteryData.controller';

const router = express.Router();

router.post('/participate', participatingInLotteryController);
router.get(
  '/total-number-of-participants-of-a-product',
  getTotalNumberOfParticipantsOfProductController
);
router.get('/all/get', getAllLotteriesController);

export const lotteryRouter = router;
