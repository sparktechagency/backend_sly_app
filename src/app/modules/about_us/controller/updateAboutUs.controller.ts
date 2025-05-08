import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { aboutUsModel } from '../model/aboutUs.model';

export const updateAboutUsController = myControllerHandler(async (req, res) => {
  await checkIfUserRequestingAdmin4(req);
  const { content } = req.body;
  const aboutUs = await aboutUsModel.findOne({});
  if (!aboutUs) {
    throw new Error('about us is not created yet');
  }
  aboutUs.content = content;
  await aboutUs.save();
  const myResponse = {
    message: 'terms and conditions updated successfully',
    success: true,
    data: {},
    aboutUs,
  };
  res.status(StatusCodes.OK).json(myResponse);
});
