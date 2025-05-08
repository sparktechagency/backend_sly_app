import express from 'express';
import { getUserAgreementController } from '../controller/getUserAgreement.controller';
import { updateUserAgreementController } from '../controller/updateUserAgreement.controller';

const router = express.Router();

router.get('/get', getUserAgreementController);
router.post('/update', updateUserAgreementController);

export const userAgreementRouter = router;
