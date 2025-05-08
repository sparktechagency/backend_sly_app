import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { productModel } from '../model/product.model';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const deleteProductController = myControllerHandler(async (req, res) => {
  await checkIfUserRequestingAdmin4(req);
  const { id } = req.body;
  const productData = await productModel.findOne({ id });
  if (!productData) {
    throw new Error('product does not exist');
  }
  await productData.deleteOne();
  const myResponse = {
    message: 'product deleted successfully',
    success: true,
    data: {},
  };
  res.status(StatusCodes.OK).json(myResponse);
});
