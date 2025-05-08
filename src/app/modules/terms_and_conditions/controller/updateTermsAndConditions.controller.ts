import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { termsAndConditionsModel } from '../model/termsAndConditions.model';
import { checkIfUserRequestingAdmin4 } from '../../../../helpers/checkIfRequestedUserAdmin';

export const updateTermsAndConditionsController = myControllerHandler(
  async (req, res) => {
    await checkIfUserRequestingAdmin4(req);
    const { content } = req.body;
    const termsAndConditions = await termsAndConditionsModel.findOne({});
    if (!termsAndConditions) {
      throw new Error('privacy term is not created yet');
    }
    termsAndConditions.content = content;
    await termsAndConditions.save();
    const myResponse = {
      message: 'terms and conditions updated successfully',
      success: true,
      data: {},
      termsAndConditions,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
