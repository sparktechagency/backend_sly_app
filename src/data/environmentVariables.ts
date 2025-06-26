import dotenv from 'dotenv';
dotenv.config();

export const APPLICATION_NAME = process.env.APPLICATION_NAME;
export const CURRENT_MODE = process.env.CURRENT_MODE;
export const MONGODB_URL = process.env.MONGODB_URL as string;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const JWT_SECRET_KEY_VAULT = process.env.JWT_SECRET_KEY_VAULT as string;
export const ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY = process.env
  .ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY as string;
export const SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN = process.env
  .SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN as string;
export const FRONTEND_ADDRESS = process.env.FRONTEND_ADDRESS as string;
export const PORT = process.env.PORT as string;
export const STRIPE_PUBLISHABLE_KEY = process.env
  .STRIPE_PUBLISHABLE_KEY as string;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
export const RAW_ENCRYPTION_KEY = process.env.RAW_ENCRYPTION_KEY as string;
export const CHAT_GPT_API_KEY = process.env.CHAT_GPT_API_KEY as string;
export const NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE as string;
export const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
export const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;
export const jwtSecretKey = JWT_SECRET_KEY;
export const jwtSecretKeyOfVault = JWT_SECRET_KEY_VAULT;
export const adminChangingPasswordJwtSecretKey =
  ADMIN_CHANGE_PASSWORD_JWT_SECRET_KEY;
export const encryptionSecretKey = Buffer.from(RAW_ENCRYPTION_KEY, 'hex');
export const frontendAddress = FRONTEND_ADDRESS;
export const secretKeyOfChangingPasswordToken =
  SECRET_KEY_OF_CHANGING_PASSWORD_TOKEN;
export const ZOOPLA_API_KEY = process.env.ZOOPLA_API_KEY;
export const PATH_OF_USER_PROFILE_PICTURE_FOLDER = process.env
  .PATH_OF_USER_PROFILE_PICTURE_FOLDER as string;
export const ZOOPLA_RAPID_API_BASE_URL = process.env.ZOOPLA_RAPID_API_BASE_URL;
export const ZOOPLA_RAPID_API_KEY = process.env.ZOOPLA_RAPID_API_KEY;
export const ZOOPLA_RAPID_API_HOST = process.env.ZOOPLA_RAPID_API_HOST;
export const MAXIMUM_DISTANCE_BETWEEN_USER_AND_DRIVER_IN_KM = Number(
  process.env.MAXIMUM_DISTANCE_BETWEEN_USER_AND_DRIVER_IN_KM
);
export const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY as string;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID as string;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN as string;
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER as string;
export const FOLDER_OF_PRODUCT_IMAGE = process.env
  .FOLDER_OF_PRODUCT_IMAGE as string;
export const STRIPE_SIGNING_SECRET = process.env
  .STRIPE_SIGNING_SECRET as string;
