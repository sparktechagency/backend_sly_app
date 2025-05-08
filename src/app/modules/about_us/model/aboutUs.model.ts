import mongoose from 'mongoose';
import { ar7id } from '../../../../helpers/ar7Id';

const aboutUsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => 'about_us_' + ar7id(),
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // This enables the automatic creation of `createdAt` and `updatedAt`
);

export const aboutUsModel = mongoose.model('about_us', aboutUsSchema);

const populate = async () => {
  try {
    const contents = await aboutUsModel.find({});
    if (contents.length > 0) {
      return;
    }

    await aboutUsModel.create({
      content: `test about us`,
    });
    console.log('about us created successfully');
  } catch (error) {
    console.log(error);
  }
};
populate();
