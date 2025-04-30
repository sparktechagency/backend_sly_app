import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { userModel } from '../model/user.model';
import { GenerateRandom6DigitNumber } from '../../../../helpers/GenerateRandom5DigitNumber';
import { giveAuthenticationToken2 } from '../../../../helpers/jwtAR7';
import { verificationOtpModel } from '../model/verificationOtp.model';
import { sendOtpForSignIn } from '../../../../helpers_v2/email/sendOtpForSignIn.helper';

export const signInWithOtpController = myControllerHandler(async (req, res) => {
  const { email } = req.body;

  const userData = await userModel.findOne({ email });
  if (!userData) {
    throw new Error('user does not exist');
  }

  const otp: any = GenerateRandom6DigitNumber();
  const authToken = await giveAuthenticationToken2(userData.id);
  await verificationOtpModel.create({
    otp: otp,
    token: authToken,
  });

  await sendOtpForSignIn(userData.name, email, otp);

  const myResponse = {
    message: 'Otp sent successful. Please check your email.',
    success: true,
    data: {
      otp,
    },
  };
  res.status(StatusCodes.OK).json(myResponse);
});
