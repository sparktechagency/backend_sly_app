import express from 'express';
import { editPrivacyTermsController } from '../controller/editPrivacyTerm.controller';
import { getPrivacyTermsController } from '../controller/getPrivacyTerms.controller';

const router = express.Router();

router.get('/get-privacy-policy', getPrivacyTermsController);
router.post('/edit-privacy-policy', editPrivacyTermsController);
router.post('/update-privacy-policy', editPrivacyTermsController);

export const privacyTermsRouter = router;
//
