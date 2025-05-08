import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const termsAndConditionsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'terms_and_conditions_' + ar7id(),
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // This enables the automatic creation of `createdAt` and `updatedAt`
);

export const termsAndConditionsModel = mongoose.model(
  'terms_and_conditions',
  termsAndConditionsSchema
);

const populate = async () => {
  try {
    const contents = await termsAndConditionsModel.find({});
    if (contents.length > 0) {
      return;
    }

    await termsAndConditionsModel.create({
      content: `test terms and conditions`,
    });
    console.log('terms and conditions created successfully');
  } catch (error) {
    console.log(error);
  }
};
populate();
