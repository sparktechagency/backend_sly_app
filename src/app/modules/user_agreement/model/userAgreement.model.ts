import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const userAgreementSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'user_agreement_' + ar7id(),
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // This enables the automatic creation of `createdAt` and `updatedAt`
);

export const userAgreementModel = mongoose.model(
  'user_agreement',
  userAgreementSchema
);

const populate = async () => {
  try {
    const contents = await userAgreementModel.find({});
    if (contents.length > 0) {
      return;
    }

    await userAgreementModel.create({
      content: `test user agreement`,
    });
    console.log('userAgreement');
  } catch (error) {
    console.log(error);
  }
};
populate();
