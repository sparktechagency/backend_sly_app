import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { otpModel } from '../model/otp.model';
import { verificationOtpModel } from '../model/verificationOtp.model';
import { parseBearerJwtToken } from '../../../../helpers/jwtAR7';
import { jwt } from '../../../../utils/others/ForUnsupportedImportSuggestion';
import { JWT_SECRET_KEY } from '../../../../data/environmentVariables';
import { userModel } from '../model/user.model';
import { hashMyPassword } from '../../../../helpers/passwordHashing';

export const resetPasswordWithOtpController = myControllerHandler(
  async (req, res) => {
    const { otp, newPassword } = req.body;

    const otpData = await verificationOtpModel.findOne({ otp });
    if (!otpData) {
      throw new Error('otp not valid');
    }

    const { token } = otpData;
    const parsedTokenData: any = jwt.verify(token, JWT_SECRET_KEY);
    const { userId } = parsedTokenData;
    const userData = await userModel.findOne({ id: userId });
    if (!userData) {
      throw new Error('user does not exist');
    }
    const newPassworHash: any = await hashMyPassword(newPassword);
    userData.passwordHash = newPassworHash;
    await userData.save();
    await otpData.deleteOne();
    const myResponse = {
      message: 'Review Given Successfully',
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
