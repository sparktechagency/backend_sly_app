import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
// import { JWE, JWK } from 'jose';

export const getEncryptedTokenController = myControllerHandler(
  async (req, res) => {
    // // Data you want to encrypt
    // const dataToEncrypt = {
    //   name: 'apurbo roy',
    // };
    // // Create a secret key for encryption (replace with your own secret key)
    // const encryptionKey = JWK.asKey('your-secret-encryption-key'); // Replace with your actual encryption key
    // // Encrypt the payload using JWE
    // const encryptedToken = JWE.encrypt(
    //   JSON.stringify(dataToEncrypt),
    //   encryptionKey
    // );
    // Prepare the response
    // const myResponse = {
    //   message: 'Review Given Successfully',
    //   success: true,
    //   data: {
    //     encryptedToken, // Encrypted token
    //   },
    // };
    // Send response with encrypted token
    res.status(StatusCodes.OK).json({});
  }
);
