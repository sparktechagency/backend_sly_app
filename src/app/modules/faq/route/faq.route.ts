import express from 'express';
import { getFaqController } from '../controller/getFaq.controller';
import { createNewFaqController } from '../controller/createNewFaq.controller';
import { getSingleFaqController } from '../controller/getSingleFaq.controller';
import { updateFaqController } from '../controller/updateFaq.controller';
import { deleteFaqController } from '../controller/deleteFaq.controller';

const router = express.Router();

router.get('/', getFaqController);
router.get('/:id', getSingleFaqController);
router.post('/create-new-faq', createNewFaqController);
router.post('/update-faq', updateFaqController);
router.post('/delete/:id', deleteFaqController);

export const faqRouter = router;
