import express from 'express';
import { addProductController } from '../controller/addProduct.controller';
import { updateProductController } from '../controller/updateProduct.controller';

const router = express.Router();

router.post('/add-product', addProductController);
router.post('/update-product', updateProductController);

export const productRouter = router;
