import { StatusCodes } from 'http-status-codes';
import { myControllerHandler } from '../../../../utils/controller/myControllerHandler.utils';
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} from '../../../../data/environmentVariables';
import twilio from 'twilio'; // Import Twilio SDK

export const sendMessagesUsingTwilioController = myControllerHandler(
  async (req, res) => {
    // Initialize Twilio client with SID and Auth Token
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    // Destructure the message and phone from the request body
    const { message, phone } = req.body;

    try {
      // Send the SMS using Twilio
      const twilioResponse = await client.messages.create({
        body: message, // Message content
        from: TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: phone, // Recipient's phone number
      });

      // Prepare the response object
      const myResponse = {
        message: 'Message Sent Successfully',
        success: true,
        data: { messageSid: twilioResponse.sid }, // Send the SID of the message
      };

      // Send the response with a success status
      res.status(StatusCodes.OK).json(myResponse);
    } catch (error) {
      // Handle errors from Twilio API
      const errorResponse = {
        message: 'Failed to send message',
        success: false,
        error: error.message,
      };

      // Send the error response with an appropriate error status
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }
);
