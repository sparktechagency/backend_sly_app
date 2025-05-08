import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { aboutUsModel } from '../model/aboutUs.model';

export const getAboutUsController = myControllerHandler(async (req, res) => {
  const aboutUs = await aboutUsModel.findOne({});
  const myResponse = {
    message: 'About Us Fetched Successfully',
    success: true,
    data: aboutUs,
  };
  res.status(StatusCodes.OK).json(myResponse);
});
