import express from 'express';
import { getTermsAndConditionsController } from '../controller/getTermsAndConditions.controller';
import { updateTermsAndConditionsController } from '../controller/updateTermsAndConditions.controller';

const router = express.Router();

router.get('/get', getTermsAndConditionsController);
router.post('/update', updateTermsAndConditionsController);

export const termsAndConditionsRouter = router;
//
