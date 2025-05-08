import express from 'express';
import { getAboutUsController } from '../controller/getAboutUs.controller';
import { updateAboutUsController } from '../controller/updateAboutUs.controller';

const router = express.Router();

router.get('/get', getAboutUsController);
router.post('/update', updateAboutUsController);

export const aboutUsRouter = router;
//
