import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { saveAndGiveRefinedUrl } from '../../../../helpers/saveAndGiveRefinedLink';
import { productModel } from '../model/product.model';
import { FOLDER_OF_PRODUCT_IMAGE } from '../../../../data/environmentVariables';
import {
  checkIfUserRequestingAdmin3,
  checkIfUserRequestingAdmin4,
} from '../../../../helpers/checkIfRequestedUserAdmin';

export const addProductController = myControllerHandler(async (req, res) => {
  await checkIfUserRequestingAdmin4(req);
  const myFormData = await getDataFromFormOfRequest(req);
  const { fields, files } = myFormData;
  const {
    title,
    sub_title,
    category,
    max_price,
    price,
    required_sly,
    order_number,
    type,
    description,
    is_visible_on_homescreen,
    number_of_total_lottery_participants,
  } = fields;

  const arrayOfImageUrls: any = [];

  for (let i = 0; i < files.images.length; i++) {
    const singleImage = files.images[i];
    const imageUrl = await saveAndGiveRefinedUrl(
      singleImage,
      FOLDER_OF_PRODUCT_IMAGE
    );
    arrayOfImageUrls.push(imageUrl);
  }

  const productData = await productModel.create({
    title: title[0],
    subTitle: sub_title[0],
    category: category[0],
    maxPrice: Number(max_price[0]),
    price: Number(price[0]),
    requiredSly: Number(required_sly[0]),
    orderNumber: order_number[0],
    type: type[0],
    description: description[0],
    onHomePage: is_visible_on_homescreen[0] === 'true' ? true : false,
    images: arrayOfImageUrls,
    numberOfTotalLotteryParticipants: number_of_total_lottery_participants[0],
  });

  const myResponse = {
    message: 'Product Uploaded Successful',
    success: true,
    data: {
      productData,
    },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
