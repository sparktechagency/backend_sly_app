import express from 'express';
import { addProductController } from '../controller/addProduct.controller';
import { updateProductController } from '../controller/updateProduct.controller';
import { deleteProductController } from '../controller/deleteProduct.controller';
import { getProductDataController } from '../controller/getProductData.controller';
import { getSingleProductController } from '../controller/getSingleProduct.controller';
import { buyProductController } from '../controller/buyProduct.controller';

const router = express.Router();

router.post('/add-product', addProductController);
router.post('/update-product', updateProductController);
router.post('/delete-product', deleteProductController);
router.get('/get-products', getProductDataController);
router.get('/get-single-product/:id', getSingleProductController);
router.post('/buy-product', buyProductController);

export const productRouter = router;
