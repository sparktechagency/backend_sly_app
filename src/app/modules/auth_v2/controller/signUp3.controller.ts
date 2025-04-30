import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import sendResponse from '../../../../shared/sendResponse';
import { userModelOfMantled } from '../model/userModelOfMantled.model';
import { hashMyPassword } from '../../../../helpers/passwordHashing';
import { GenerateRandom6DigitNumber } from '../../../../helpers/GenerateRandom5DigitNumber';
import { unverifiedUsers } from '../../../../data/temporaryData';
import { sendOtpViaEmail } from '../../../../helpers/sendOtp';
import { userModel } from '../model/user.model';
import { otpModel } from '../model/otp.model';

export const signUpController3 = myControllerHandler(async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;

  console.log({ first_name, last_name, email, phone_number });

  // Check if the user already exists
  const userData = await userModel.findOne({ email });
  if (userData) {
    throw new Error('Account with this email already exists');
  }

  // Hash password and generate OTP
  const passwordHash = await hashMyPassword(password);
  const otp = GenerateRandom6DigitNumber().toString();

  // Store user in temporary data
  let temporaryUserData: any = {
    first_name,
    last_name,
    email,
    phone_number,
    passwordHash,
  };
  temporaryUserData = JSON.stringify(temporaryUserData);

  await otpModel.create({
    otp,
    data: temporaryUserData,
  });

  // Send OTP via email
  await sendOtpViaEmail(first_name, email, otp);

  // Success response
  return sendResponse(res, {
    code: StatusCodes.OK,
    message: 'OTP sent successfully. Please verify your email.',
    data: { otp },
  });
});
