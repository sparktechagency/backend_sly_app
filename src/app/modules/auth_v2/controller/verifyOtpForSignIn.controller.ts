import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { otpModel } from '../model/otp.model';
import { verificationOtpModel } from '../model/verificationOtp.model';

export const verifyOtpForSignInController = myControllerHandler(
  async (req, res) => {
    const { otp } = req.body;
    const otpData = await verificationOtpModel.findOne({ otp });

    if (!otpData) {
      throw new Error('invalid otp');
    }

    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {
        token: otpData.token,
      },
    };
    res.status(StatusCodes.OK).json(myResponse);
    await otpData.deleteOne();
  }
);
