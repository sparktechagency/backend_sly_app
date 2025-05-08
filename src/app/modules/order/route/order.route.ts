import express from 'express';
import { getOrdersDataController } from '../controller/getOrders.controller';
import { confirmDeliveryCompleteController } from '../controller/confirmDeliveryComplete.controller';
import { changeDeliveryStatusController } from '../controller/changeOrderStatus.controller';
import { getOrderHistoryForASpecificUserController } from '../controller/getOrderHistoryForASpecificUser.controller';

const router = express.Router();

router.get('/get', getOrdersDataController);
router.post('/confirm-delivery-complete', confirmDeliveryCompleteController);
router.post('/change-delivery-status', changeDeliveryStatusController);
router.get('/user/history', getOrderHistoryForASpecificUserController);

export const orderRouter = router;
