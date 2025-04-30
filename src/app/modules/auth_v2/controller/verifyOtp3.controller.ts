import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { unverifiedUsers } from '../../../../data/temporaryData';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { NotificationModel } from '../../notifications_v2/model/notification.model';
import { userModel } from '../model/user.model';
import { giveAuthenticationToken2 } from '../../../../helpers/jwtAR7';
import { otpModel } from '../model/otp.model';

export const verifyOtpController3 = myControllerHandler(async (req, res) => {
  const { otp } = req.body;
  if (!otp) {
    throw new Error('otp is required');
  }

  const otpData = await otpModel.findOne({
    otp,
  });

  if (!otpData) {
    throw new Error('this otp is not valid');
  }

  const userData = JSON.parse(otpData.data);
  const { first_name, last_name, email, phone_number, passwordHash } = userData;

  const userData2 = await userModel.create({
    name: `${first_name} ${last_name}`,
    email: email,
    phone: phone_number,
    passwordHash,
    role: 'user',
  });

  await NotificationModel.create({
    type: 'for_admin',
    message: `${first_name} ${last_name} has joined your platform`,
    userId: 'all_admin',
    title: 'New User',
  });

  const authToken = await giveAuthenticationToken2(userData.id);

  await otpModel.deleteOne();

  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'OTP verification complete, account created successfully',
    data: {
      authToken,
      userData: userData2,
    },
  });
});
