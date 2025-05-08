import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { termsAndConditionsModel } from '../model/termsAndConditions.model';

export const getTermsAndConditionsController = myControllerHandler(
  async (req, res) => {
    const privacyTerms = await termsAndConditionsModel.findOne({});
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: privacyTerms,
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
