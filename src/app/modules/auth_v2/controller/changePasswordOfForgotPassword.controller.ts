import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import { dataOfResetPasswordRequests } from '../../../../data/temporaryData';
import { userModel } from '../model/user.model';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { verificationOtpModel } from '../model/verificationOtp.model';
import { jwt } from '../../../../utils/others/ForUnsupportedImportSuggestion';
import { JWT_SECRET_KEY } from '../../../../data/environmentVariables';

export const changePasswordOfForgotPasswordController = myControllerHandler(
  async (req, res) => {
    const { otp, newPassword } = req.body;
    let userData = null as any;
    let index = null as any;
    for (let i = 0; i < dataOfResetPasswordRequests.length; i++) {
      const singleData = dataOfResetPasswordRequests[i];
      if (singleData.otp === otp) {
        userData = singleData;
        index = i;
      }
    }
    if (!userData) {
      throw new Error('Otp not valid');
    }

    const { email } = userData;
    const userData2 = await userModel.findOne({ email });
    if (!userData2) {
      throw new Error('user does not exist');
    }
    const newPasswordHash = (await hashMyPassword(newPassword)) as string;
    userData2.passwordHash = newPasswordHash;
    await userData2.save();
    dataOfResetPasswordRequests.splice(index, 1);
    const myResponse = {
      message: 'Password Changed Successfully',
      success: true,
      data: {},
    };
    res.status(StatusCodes.OK).json(myResponse);
  }
);
export const changePasswordOfForgotPasswordController2 = myControllerHandler(
  async (req, res) => {
    const { otp, newPassword } = req.body;

    if (!otp) {
      throw new Error('please enter otp');
    }
    if (!newPassword) {
      throw new Error('please enter new password');
    }
    const otpData = await verificationOtpModel.findOne({ otp });
    if (!otpData) {
      throw new Error('this otp is not valid');
    }

    const authData: any = jwt.verify(otpData.token, JWT_SECRET_KEY);
    const { userId } = authData;
    const userData = await userModel.findOne({ id: userId });
    if (!userData) {
      throw new Error('user does not exist with this token');
    }

    const newPasswordHash: any = await hashMyPassword(newPassword);
    userData.passwordHash = newPasswordHash;
    await userData.save();
    await otpData.deleteOne();
    res.status(StatusCodes.OK).json({
      message: 'password updated successful',
    });
  }
);
