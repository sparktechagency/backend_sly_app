import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { getDataFromFormOfRequest } from '../../../../helpers/getDataFromFormAR7';
import { productModel } from '../model/product.model';
import { saveAndGiveRefinedUrl } from '../../../../helpers/saveAndGiveRefinedLink';

export const updateProductController = myControllerHandler(async (req, res) => {
  const updatedProductData = await getDataFromFormOfRequest(req);
  const { fields, files } = updatedProductData;
  let {
    id,
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
  } = fields;

  id = id ? id[0] : null;
  title = title ? title[0] : null;
  sub_title = sub_title ? sub_title[0] : null;
  category = category ? category[0] : null;
  max_price = max_price ? max_price[0] : null;
  price = price ? price[0] : null;
  required_sly = required_sly ? required_sly[0] : null;
  order_number = order_number ? order_number[0] : null;
  type = type ? type[0] : null;
  description = description ? description[0] : null;
  is_visible_on_homescreen = is_visible_on_homescreen
    ? is_visible_on_homescreen[0]
    : null;

  if (!id) {
    throw new Error('please provide id');
  }
  const productData = await productModel.findOne({ id });
  if (!productData) {
    throw new Error('product does not exist with this id');
  }

  if (title) {
    productData.title = title;
  }

  if (sub_title) {
    productData.subTitle = sub_title;
  }

  if (category) {
    productData.category = category;
  }

  if (max_price) {
    productData.maxPrice = max_price;
  }

  if (price) {
    productData.price = price;
  }

  if (required_sly) {
    productData.requiredSly = required_sly;
  }

  if (order_number) {
    productData.orderNumber = order_number;
  }

  if (type) {
    productData.type = type;
  }

  if (description) {
    productData.description = description;
  }

  if (is_visible_on_homescreen === 'true') {
    productData.onHomePage = true;
  }

  if (is_visible_on_homescreen === 'false') {
    productData.onHomePage = false;
  }

  // update images

  const keyNameOfUpdatedImages = Object.keys(files);
  for (let i = 0; i < keyNameOfUpdatedImages.length; i++) {
    const singleKeyName = keyNameOfUpdatedImages[i];
    let imageIndex: any = singleKeyName.replace('updated_image_', '');
    imageIndex = Number(imageIndex) - 1;
    if (imageIndex > productData.images.length) {
      throw new Error('invalid index');
    }
    const myImageFile = files[singleKeyName];
    const imageLink = await saveAndGiveRefinedUrl(
      myImageFile[0],
      './public/images/property-blog'
    );
    productData.images[imageIndex] = imageLink;
  }

  await productData.save();

  const myResponse = {
    message: 'product updated successfully',
    success: true,
    data: {
      productData,
    },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
