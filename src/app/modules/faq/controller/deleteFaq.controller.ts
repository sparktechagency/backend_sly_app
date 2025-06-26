import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';
import { faqModel } from '../model/faq.model';

export const deleteFaqController = myControllerHandler(async (req, res) => {
  await checkIfUserRequestingAdmin4(req);
  const { id } = req.params;
  const data = await faqModel.findOne({ id });
  if (!data) {
    throw new Error('faq does not exist with this id');
  }
  await data.deleteOne();
  const myResponse = {
    message: 'FAQ Deleted Successfully',
    success: true,
    data: { faqData: data },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
