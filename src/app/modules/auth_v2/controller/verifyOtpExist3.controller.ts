import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { otpModel } from '../model/otp.model';
import { verificationOtpModel } from '../model/verificationOtp.model';

export const verifyIfOtpExistController = myControllerHandler(
  async (req, res) => {
    const { otp } = req.body;
    const otpData = await verificationOtpModel.findOne({ otp: otp });
    if (!otpData) {
      throw new Error('this otp is invalid');
    }

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
