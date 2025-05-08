import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { productModel } from '../model/product.model';

export const getSingleProductController = myControllerHandler(
  async (req, res) => {
    const { id } = req.params;
    const productData = await productModel.findOne({ id });
    if (!productData) {
      throw new Error('product does not exists with this id');
    }
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {
        productData,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
